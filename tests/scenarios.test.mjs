import test from 'node:test'
import assert from 'node:assert/strict'
import {execFileSync} from 'node:child_process'
import matter from 'gray-matter'
import {readArticles,validateArticle} from '../scripts/content.mjs'
import {resolvePrompt} from '../scripts/prompts.mjs'
import {buildSearchIndex} from '../scripts/search-index.mjs'
import {createRequire} from 'node:module'
import {searchOptions} from '../docs/.vitepress/theme/search-options.mjs'
const rows=readArticles(),task=rows.find(a=>a.url==='/tasks/meeting-actions/'),req=createRequire(import.meta.url),MiniSearch=createRequire(req.resolve('vitepress/package.json'))('minisearch')
test('场景、环节和做法引用必须存在；类型必须匹配',()=>{for(const change of [{scenarios:[]},{scenarios:[{scenario:'missing',stage:'meeting'}]},{scenarios:[{scenario:'office',stage:'missing'}]},{methods:[{type:'app',use:'meeting-to-todo'}]},{methods:[{type:'skill',use:'missing'}]}])assert.ok(validateArticle({...task,...change}).length);assert.ok(validateArticle({...task,methods:[...task.methods,{type:'skill',use:'review-feedback'}]}).some(e=>e.includes('其他做法缺少')))})
test('任务必须有检查小节；课程可以没有',()=>{assert.ok(validateArticle({...task,body:task.body.replace('## 检查一下','## 提醒')}).some(e=>e.includes('检查一下')));assert.deepEqual(validateArticle(rows.find(a=>a.lesson===1)),[])})
test('技能库反查多个场景任务，草稿不会泄露',()=>{const e=rows.find(a=>a.url==='/library/skills/meeting-to-todo/');assert.deepEqual(e.usedIn.map(t=>t.url),[task.url]);assert.equal(e.usedIn[0].scenarios.length,2);assert.equal(rows.find(a=>a.url==='/library/skills/task-brief/').usedIn.length,0);assert.ok(rows.find(a=>a.url==='/library/apps/doubao/').usedIn.some(t=>t.url===task.url))})
test('拆分工具后保留两次聊天实测，技能导入仍未实测',()=>{assert.equal(task.platforms.doubao.status,'active');assert.equal(rows.find(a=>a.lesson===1).platforms.doubao.status,'active');const skill=rows.find(a=>a.url==='/tasks/task-brief/');assert.equal(skill.platforms.doubao,undefined);assert.equal(skill.platforms['doubao-work'].status,'unverified');assert.equal(skill.platforms.zhiban.status,'planned')})
test('提取的提示词逐字等于 v0.2 原文',()=>{for(const [old,id]of [['workflows/meeting-actions','meeting-to-todo'],['workflows/interview-to-post','interview-to-post'],['apps/review-feedback','review-feedback']]){const raw=execFileSync('git',['show','04e2313:docs/'+old+'/index.md'],{encoding:'utf8'});const originals=[...matter(raw).content.matchAll(/<PromptBox>\s*([\s\S]*?)\s*<\/PromptBox>/g)].map(m=>m[1]);originals.forEach((p,i)=>assert.equal(resolvePrompt(id,'提示词 '+(i+1)),p))}})
test('搜索包含正文、中文场景环节和提取的提示词，不含跳转页',()=>{const index=MiniSearch.loadJSON(buildSearchIndex(),searchOptions);for(const q of ['会议','小林','开会'])assert.ok(index.search(q).some(r=>r.id===task.url),q);assert.ok(index.search('运营').some(r=>r.id==='/tasks/review-feedback/'));assert.equal(index.search('页面已迁移').length,0);assert.ok(index.search('先问清楚').some(r=>r.id==='/tasks/task-brief/'))})
