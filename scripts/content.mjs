import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { contentConfig } from '../content.config.ts'
import {deriveArticle,levelNames} from '../docs/.vitepress/theme/content-model.mjs'
import {platformBlocks} from '../docs/.vitepress/platform-containers.mjs'
export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
export function walk(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.name.startsWith('.') ? [] : e.isDirectory() ? walk(path.join(dir,e.name)) : [path.join(dir,e.name)])
}
export const normalize = value => JSON.parse(JSON.stringify(value), (_, v) => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}T00:00:00/.test(v) ? v.slice(0,10) : v)
export function readArticles() {
 const rows=['tasks','start','library','reviews'].flatMap(dir=>walk(path.join(root,'docs',dir))).filter(f=>f.endsWith('/index.md')).map(file=>{
  const raw=fs.readFileSync(file,'utf8'),parsed=matter(raw),data=normalize(parsed.data),rel=path.relative(path.join(root,'docs'),path.dirname(file)).split(path.sep).join('/');
  return {...data,title:data.title||data.name,body:parsed.content,raw,file:path.relative(root,file),url:'/'+rel+'/',id:path.basename(path.dirname(file)),contentType:rel.startsWith('tasks/')?'task':rel.startsWith('start/')?'lesson':rel.startsWith('library/')?'library':'review'}
 }).filter(a=>!a.redirectTo&&(a.scenarios||a.lesson||a.libraryType||a.kind==='review'))
 const library=rows.filter(a=>a.contentType==='library');
 const articles=rows.map(a=>deriveArticle({...a,methods:(a.methods||[]).map(m=>({...m,format:library.find(l=>l.id===m.use&&l.libraryType===m.type)?.format}))}));
 for(const a of articles)if(a.contentType==='library')a.usedIn=articles.filter(t=>t.contentType==='task'&&!t.draft&&t.status!=='deprecated'&&(t.methods.some(m=>m.use===a.id&&m.type===a.libraryType)||(a.app&&t.platforms?.[a.app]&&!['planned','unsupported'].includes(t.platforms[a.app].status)))).map(t=>({url:t.url,title:t.title,difficulty:t.difficulty,scenarios:t.scenarios}));
 return articles
}
export function today() { return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()) }
export function validDate(s) { return typeof s==='string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s)) && new Date(s).toISOString().slice(0,10)===s }
export function validateArticle(a) {
 const errors=[]; const fail=m=>errors.push(m)
 for (const k of ['title','description','kind','difficulty','cost','created','updated','status']) if (!a[k]) fail('缺少 '+k)
 for (const [k,values] of Object.entries({kind:Object.keys(contentConfig.kinds),difficulty:levelNames,cost:contentConfig.costs,status:contentConfig.statuses})) if (!values.includes(a[k])) fail(k+' 取值不合法')
 if(a.contentType==='task'&&(!Array.isArray(a.scenarios)||!a.scenarios.length))fail('任务至少需要一个场景')
 for(const ref of a.scenarios||[]){const scenario=contentConfig.scenarios.find(s=>s.id===ref.scenario);if(!scenario)fail('未知场景 '+ref.scenario);else if(scenario.stages.length?!scenario.stages.some(s=>s.slug===ref.stage):Boolean(ref.stage))fail('场景环节不合法 '+ref.scenario+'/'+ref.stage)}
 if(a.contentType==='task'&&(!Array.isArray(a.methods)||!a.methods.length))fail('任务缺少推荐做法')
 const library=readArticles().filter(a=>a.contentType==='library');
 for(const [i,m]of (a.methods||[]).entries()){if(!library.some(l=>l.id===m.use&&l.libraryType===m.type))fail('methods.use 不存在或类型不匹配 '+m.use);if(i>0){for(const k of ['note','level','status'])if(!m[k])fail('其他做法缺少 '+k);if(!levelNames.includes(m.level)||!Object.keys(contentConfig.platformStatuses).includes(m.status))fail('其他做法 level/status 不合法')}}
 if(a.contentType==='task'&&!/^## 检查一下\s*$/m.test(a.body||''))fail('任务缺少「检查一下」小节')
 if(a.contentType==='lesson'&&(!Number.isInteger(a.lesson)||a.lesson<1))fail('lesson 必须为正整数')
 if(a.contentType==='library'){if(!Object.keys(contentConfig.methodTypes).includes(a.libraryType))fail('libraryType 不合法');if(a.libraryType==='skill'&&!contentConfig.formats.includes(a.format))fail('技能库 Skill 必须有 format');if(a.libraryType==='app'&&!contentConfig.apps.some(p=>p.slug===a.app))fail('app 不合法')}
 if (typeof a.sponsored !== 'boolean') fail('sponsored 必须明确为布尔值')
 if (a.sponsored && !a.disclosure) fail('商业合作须填写 disclosure')
 for (const k of ['created','updated']) if (!validDate(a[k]) || a[k]>today()) fail(k+' 必须为非未来的有效日期')
 if (a.updated<a.created) fail('updated 不能早于 created')
 if(a.format&&!contentConfig.formats.includes(a.format))fail('format 取值不合法')
 if(a.platforms&&(typeof a.platforms!=='object'||Array.isArray(a.platforms)))fail('platforms 必须为对象')
 const entries=Object.entries(a.platforms||{}),blocks=platformBlocks(a.body||'')
 const slugs=contentConfig.apps.filter(p=>p.tab).map(p=>p.slug)
 if(a.contentType==='task'&&a.methods?.[0]?.format==='skill')for(const slug of contentConfig.apps.filter(p=>p.skills===true||p.skillCandidate).map(p=>p.slug)){if(!a.platforms?.[slug])fail('技能包缺少工具 '+slug);if(!blocks.some(b=>b.slug===slug))fail('技能包缺少标签 '+slug)}
 for(const block of blocks){if(!a.platforms?.[block.slug])fail('标签缺少工具记录 '+block.slug)}
 const command=/```(?:bash|sh|shell|zsh|powershell|console)\b|(?:^|\n)\s*(?:\$ |npm |pnpm |npx |git |pip |sudo |curl )/m
 for(const block of blocks)if(block.slug!=='codex'&&command.test(block.content.split('::: details')[0]))fail(block.slug+' 新手区不应出现命令行')
 const common=(a.body||'').split('\n').filter((line,i)=>!blocks.some(b=>i>=b.start&&i<b.end)).join('\n').split('::: details')[0]
 if(command.test(common))fail('新手正文不应出现命令行')
 for(const [slug,p] of entries){
  if(!slugs.includes(slug))fail('未知工具 '+slug)
  if(contentConfig.apps.find(app=>app.slug===slug)?.skillCandidate&&p?.status!=='planned')fail(slug+' 支持情况待确认，只能标 planned')
  if(!p||typeof p!=='object'||Array.isArray(p)){fail('工具记录须为对象 '+slug);continue}
  if(!levelNames.includes(p.level))fail(slug+' level 不合法')
  if(!Object.keys(contentConfig.platformStatuses).includes(p.status))fail(slug+' status 不合法')
  if(p.verified&&(!validDate(p.verified)||p.verified>today()))fail(slug+' verified 日期不合法')
  if(['unverified','planned','unsupported'].includes(p.status)&&p.verified)fail(slug+' 未实测不能填写 verified')
  if(p.status==='unsupported'&&!p.reason?.trim())fail(slug+' unsupported 必须写原因')
  const own=blocks.filter(b=>b.slug===slug)
  if(own.length>1)fail(slug+' 标签重复')
  if(['planned','unsupported'].includes(p.status)&&own.some(b=>b.content.replace(/<!--[\s\S]*?-->/g,'').trim()))fail(slug+' planned/unsupported 不允许写操作步骤')
  if(['active','outdated'].includes(p.status)&&(!validDate(p.verified)||!p.version))fail(slug+' 已实测必须填写 verified 和 version')
  if(p.status==='active'){
   const body=own[0]?.content||((['lesson','library','review'].includes(a.contentType)||a.methods?.[0]?.type==='app')&&entries.length===1?a.body:'')||''
   const shots=[...body.matchAll(/!\[([^\]]+)\]\(([^)]+)\)/g)].filter(m=>m[2].includes(slug)&&!/(示意|待补)/.test(m[1]))
   if(!shots.length)fail(slug+' active 标签必须包含该工具真实截图')
  }
 }
 if(!entries.length&&a.status!=='unverified'&&(!validDate(a.verified)||!a.version))fail('已验证内容须填写 verified 与 version')
 if(a.verified&&(!validDate(a.verified)||a.verified>today()))fail('verified 日期不合法')
 if(a.status==='unverified'&&a.verified)fail('待验证内容不能填写实测日期')
 // Draft status is derived; authors cannot bypass the one-tool publication gate.
 if(a.contentType==='task'&&a.methods?.[0]?.format==='skill'&&a.draft!==deriveArticle(a).draft)fail('技能包草稿标记与工具实测数量不一致')
 if (a.kind==='review') {
   if (a.status==='unverified') fail('未实测的评测只能保留在 templates，不能发布评分')
   if (!a.scores || Object.keys(contentConfig.ratingWeights).some(k=> typeof a.scores[k]!=='number'||a.scores[k]<0||a.scores[k]>5)) fail('缺少有效的五维评分')
   else { const score=Math.round(Object.entries(contentConfig.ratingWeights).reduce((s,[k,w])=>s+a.scores[k]*w,0)*10)/10; if(a.rating!==score) fail('rating 与加权评分不符') }
   if (!a.testCase) fail('评测须提供 testCase')
 }
 if (a.contentType==='library'&&a.original) { for (const k of ['source','license']) if(!a[k]) fail('自研缺少 '+k); if(!a.download&&!a.repo) fail('自研须提供 download 或 repo') }
 for (const k of ['repo']) if (a[k] && !/^https:\/\//.test(a[k])) fail(k+' 须为 HTTPS 地址')
 return errors
}
