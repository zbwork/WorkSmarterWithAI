import test from 'node:test'
import assert from 'node:assert/strict'
import {contentConfig as c} from '../content.config.ts'
import {readArticles} from '../scripts/content.mjs'
import {visibleScenarioGroups,scenarioNavigation,scenarioTarget} from '../docs/.vitepress/theme/scenario-navigation.mjs'
const rows=readArticles()
test('场景分为三组，职场合并通用和岗位；空场景、草稿不产生入口',()=>{
 const task=(scenario,extra={})=>({contentType:'task',url:'/tasks/example/',scenarios:[{scenario}],...extra})
 const config={scenarioGroups:c.scenarioGroups,scenarios:[{id:'common',name:'通用',group:'office',order:1,stages:[]},{id:'role',name:'岗位',group:'role',order:2,stages:[]},{id:'project',name:'项目',group:'project',order:3,stages:[]},{id:'life',name:'生活',group:'life',order:4,stages:[]}]}
 const input=[task('common'),task('role'),task('project',{draft:true})]
 const groups=visibleScenarioGroups(config,input)
 assert.equal(groups.length,1)
 assert.deepEqual(groups[0].items.map(s=>s.id),['common','role'])
 const nav=scenarioNavigation(config,input)
 assert.deepEqual(nav[0].items.map(g=>g.items.map(i=>i.text)),[['通用'],['岗位'],['全部场景 →']])
 assert.equal(nav[0].items.at(-1).items[0].link,'/scenarios/#workplace')
})
test('每个新场景有完整待实测案例，导航打开正文；共享任务仍在两个场景',()=>{
 assert.equal(c.scenarios.length,17)
 const groups=visibleScenarioGroups(c,rows)
 assert.deepEqual(groups.map(g=>g.items.length),[6,5,6])
 for(const scene of c.scenarios){
  const cases=rows.filter(a=>a.contentType==='task'&&a.created==='2026-11-17'&&a.scenarios.some(r=>r.scenario===scene.id))
  assert.ok(cases.length,scene.id)
  for(const a of cases){assert.equal(a.status,'unverified');assert.equal(a.platforms.doubao.verified,null);assert.match(a.body,/<PromptBox>/);assert.match(a.body,/人工/);assert.match(a.body,/## 检查一下/)}
  assert.match(scenarioTarget(scene,rows),/^\/tasks\/[^/]+\/\?scenario=/)
 }
 const review=rows.find(a=>a.url==='/tasks/review-feedback/')
 assert.deepEqual(review.scenarios.map(s=>s.scenario),['commerce','ai-app'])
 assert.ok(!c.scenarios.some(s=>s.id==='elders'))
})
