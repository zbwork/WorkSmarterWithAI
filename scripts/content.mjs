import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { contentConfig } from '../content.config.ts'
export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
export function walk(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.name.startsWith('.') ? [] : e.isDirectory() ? walk(path.join(dir,e.name)) : [path.join(dir,e.name)])
}
export const normalize = value => JSON.parse(JSON.stringify(value), (_, v) => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}T00:00:00/.test(v) ? v.slice(0,10) : v)
export function readArticles() {
  return ['prompts','skills','workflows','apps'].flatMap(dir => walk(path.join(root,'docs',dir)))
    .filter(f => f.endsWith('/index.md'))
    .map(file => { const raw=fs.readFileSync(file,'utf8'); const parsed=matter(raw); return { ...normalize(parsed.data), body:parsed.content, raw, file:path.relative(root,file), url:'/'+path.relative(path.join(root,'docs'),path.dirname(file)).split(path.sep).join('/')+'/' } })
    .filter(a => a.type)
}
export function today() { return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()) }
export function validDate(s) { return typeof s==='string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s)) && new Date(s).toISOString().slice(0,10)===s }
export function validateArticle(a) {
 const errors=[]; const fail=m=>errors.push(m)
 for (const k of ['title','description','type','kind','difficulty','cost','created','updated','status']) if (!a[k]) fail('缺少 '+k)
 for (const [k,values] of Object.entries({type:Object.keys(contentConfig.types),kind:Object.keys(contentConfig.kinds),difficulty:contentConfig.difficulties,cost:contentConfig.costs,status:contentConfig.statuses})) if (!values.includes(a[k])) fail(k+' 取值不合法')
 for (const [k,values] of [['industry',contentConfig.industries.map(i=>i.name)],['tools',contentConfig.tools]]) if (!Array.isArray(a[k]) || !a[k].length || a[k].some(v=>!values.includes(v))) fail(k+' 必须为合法的非空数组')
 if (typeof a.sponsored !== 'boolean') fail('sponsored 必须明确为布尔值')
 if (a.sponsored && !a.disclosure) fail('商业合作须填写 disclosure')
 for (const k of ['created','updated']) if (!validDate(a[k]) || a[k]>today()) fail(k+' 必须为非未来的有效日期')
 if (a.updated<a.created) fail('updated 不能早于 created')
 if (a.status!=='unverified' && (!validDate(a.verified)||!a.version)) fail('已验证内容须填写 verified 与 version')
 if (a.verified && (!validDate(a.verified)||a.verified>today())) fail('verified 日期不合法')
 if (a.status==='unverified' && a.verified) fail('待验证内容不能填写实测日期')
 if (['skill','prompt'].includes(a.type) && !contentConfig.formats.includes(a.format)) fail('Skill 内容须区分 skill / mcp / prompt')
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
