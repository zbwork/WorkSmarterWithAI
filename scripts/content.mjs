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
  return ['prompts','skills','workflows','apps'].flatMap(dir => walk(path.join(root,'docs',dir)))
    .filter(f => f.endsWith('/index.md'))
    .map(file => { const raw=fs.readFileSync(file,'utf8'); const parsed=matter(raw); return deriveArticle({ ...normalize(parsed.data), body:parsed.content, raw, file:path.relative(root,file), url:'/'+path.relative(path.join(root,'docs'),path.dirname(file)).split(path.sep).join('/')+'/' }) })
    .filter(a => a.type)
}
export function today() { return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()) }
export function validDate(s) { return typeof s==='string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s)) && new Date(s).toISOString().slice(0,10)===s }
export function validateArticle(a) {
 const errors=[]; const fail=m=>errors.push(m)
 for (const k of ['title','description','type','kind','difficulty','cost','created','updated','status']) if (!a[k]) fail('缺少 '+k)
 for (const [k,values] of Object.entries({type:Object.keys(contentConfig.types),kind:Object.keys(contentConfig.kinds),difficulty:levelNames,cost:contentConfig.costs,status:contentConfig.statuses})) if (!values.includes(a[k])) fail(k+' 取值不合法')
 for (const [k,values] of [['industry',contentConfig.industries.map(i=>i.name)],['tools',contentConfig.tools]]) if (!Array.isArray(a[k]) || (k==='industry'&&!a[k].length) || a[k].some(v=>!values.includes(v))) fail(k+' 必须为合法的非空数组')
 if (typeof a.sponsored !== 'boolean') fail('sponsored 必须明确为布尔值')
 if (a.sponsored && !a.disclosure) fail('商业合作须填写 disclosure')
 for (const k of ['created','updated']) if (!validDate(a[k]) || a[k]>today()) fail(k+' 必须为非未来的有效日期')
 if (a.updated<a.created) fail('updated 不能早于 created')
 if(a.format&&a.type!=='skill')fail('format 只用于 Skill 分类')
 if(a.format&&!contentConfig.formats.includes(a.format))fail('format 取值不合法')
 if(a.type==='skill'&&!a.format&&!a.concept)fail('Skill 文章须指定 format；概念文章使用 concept: true')
 if(a.platforms&&(typeof a.platforms!=='object'||Array.isArray(a.platforms)))fail('platforms 必须为对象')
 const entries=Object.entries(a.platforms||{}),blocks=platformBlocks(a.body||'')
 const slugs=contentConfig.platforms.map(p=>p.slug)
 if(a.format==='skill')for(const slug of slugs){if(!a.platforms?.[slug])fail('技能包缺少平台 '+slug);if(!blocks.some(b=>b.slug===slug))fail('技能包缺少标签 '+slug)}
 for(const block of blocks){if(!a.platforms?.[block.slug])fail('标签缺少平台记录 '+block.slug)}
 const command=/```(?:bash|sh|shell|zsh|powershell|console)\b|(?:^|\n)\s*(?:\$ |npm |pnpm |npx |git |pip |sudo |curl )/m
 for(const block of blocks)if(block.slug!=='codex'&&command.test(block.content.split('::: details')[0]))fail(block.slug+' 新手区不应出现命令行')
 const common=(a.body||'').split('\n').filter((line,i)=>!blocks.some(b=>i>=b.start&&i<b.end)).join('\n').split('::: details')[0]
 if(command.test(common))fail('新手正文不应出现命令行')
 for(const [slug,p] of entries){
  if(!slugs.includes(slug))fail('未知平台 '+slug)
  if(!p||typeof p!=='object'||Array.isArray(p)){fail('平台记录须为对象 '+slug);continue}
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
   const body=own[0]?.content||(a.type==='app'&&entries.length===1?a.body:'')||''
   const shots=[...body.matchAll(/!\[([^\]]+)\]\(([^)]+)\)/g)].filter(m=>m[2].includes(slug)&&!/(示意|待补)/.test(m[1]))
   if(!shots.length)fail(slug+' active 标签必须包含该平台真实截图')
  }
 }
 if(!entries.length&&a.status!=='unverified'&&(!validDate(a.verified)||!a.version))fail('已验证内容须填写 verified 与 version')
 if(a.verified&&(!validDate(a.verified)||a.verified>today()))fail('verified 日期不合法')
 if(a.status==='unverified'&&a.verified)fail('待验证内容不能填写实测日期')
 // Draft status is derived; authors cannot bypass the two-platform publication gate.
 if(a.format==='skill'&&a.draft!==deriveArticle(a).draft)fail('技能包草稿标记与平台实测数量不一致')
 if (a.kind==='review') {
   if (a.status==='unverified') fail('未实测的评测只能保留在 templates，不能发布评分')
   if (!a.scores || Object.keys(contentConfig.ratingWeights).some(k=> typeof a.scores[k]!=='number'||a.scores[k]<0||a.scores[k]>5)) fail('缺少有效的五维评分')
   else { const score=Math.round(Object.entries(contentConfig.ratingWeights).reduce((s,[k,w])=>s+a.scores[k]*w,0)*10)/10; if(a.rating!==score) fail('rating 与加权评分不符') }
   if (!a.testCase) fail('评测须提供 testCase')
 }
 if (a.kind==='original') { for (const k of ['source','license']) if(!a[k]) fail('自研缺少 '+k); if(!a.download&&!a.repo) fail('自研须提供 download 或 repo') }
 for (const k of ['repo']) if (a[k] && !/^https:\/\//.test(a[k])) fail(k+' 须为 HTTPS 地址')
 return errors
}
