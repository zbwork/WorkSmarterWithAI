import { contentConfig as c } from '../../../content.config.ts'
export const platformList = [...c.platforms].sort((a,b)=>a.order-b.order)
export const levelNames = c.levels.map(l=>l.name)
export const normalize = value => JSON.parse(JSON.stringify(value),(_,v)=>typeof v==='string'&&/^\d{4}-\d{2}-\d{2}T00:00:00/.test(v)?v.slice(0,10):v)
export function platformStale(p,now=new Date()) {return Boolean(p?.verified&&(now.getTime()-Date.parse(p.verified+'T00:00:00+08:00'))/86400000>90)}
export function platformStatus(p,now=new Date()){return p?.status==='active'&&platformStale(p,now)?'outdated':(p?.status||'planned')}
export function deriveArticle(input){
 const a=normalize(input), entries=Object.values(a.platforms||{}).filter(p=>p&&typeof p==='object'), levels=entries.map(p=>levelNames.indexOf(p.level)).filter(i=>i>=0)
 if(entries.length){
  a.difficulty=levels.length?levelNames[Math.min(...levels)]:null
  a.status=a.status==='deprecated'?'deprecated':entries.some(p=>p.status==='active')?'active':entries.some(p=>p.status==='outdated')?'outdated':'unverified'
  a.verified=entries.map(p=>p.verified).filter(Boolean).sort().at(-1)||null
 } else {a.difficulty=a.level||a.difficulty||levelNames[0];a.status=a.status||'unverified';a.verified=a.verified||null}
 a.draft=Boolean(a.type==='skill'&&a.format==='skill'&&entries.filter(p=>p.status==='active').length<2)
 return a
}
export function isListed(a){return !a.draft&&a.status!=='deprecated'}
export function allPlatformsStale(a,now=new Date()){
 const tested=Object.values(a.platforms||{}).filter(p=>['active','outdated'].includes(p.status))
 return tested.length>0&&tested.every(p=>platformStatus(p,now)==='outdated')
}
export function choosePlatform(slugs,urlValue,preference){return [urlValue,preference,...platformList.map(p=>p.slug)].find(s=>slugs.includes(s))||slugs[0]||''}
