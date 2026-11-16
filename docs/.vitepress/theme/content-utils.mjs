import {contentConfig as c} from '../../../content.config.ts'
import {deriveArticle,platformStale,platformStatus} from './content-model.mjs'
export const stale=platformStale
export function statusText(a){return a.draft?'草稿':a.status==='active'?'已实测':a.status==='outdated'?'待复测':a.status==='deprecated'?'已停止维护':'待实测'}
export function filterArticles(articles,filters={},now=new Date()){
 const q=(filters.q||'').trim().toLowerCase()
 return articles.map(deriveArticle).filter(a=>{
  if(a.draft&&!filters.draft)return false
  if(a.status==='deprecated'&&!filters.archived)return false
  if(q&&![a.title,a.description,...(a.tags||[]),...(a.tools||[])].join(' ').toLowerCase().includes(q))return false
  for(const k of ['type','kind','format','cost'])if(filters[k]&&a[k]!==filters[k])return false
  for(const k of ['industry','tools'])if(filters[k]&&!a[k]?.includes(filters[k]))return false
  const platform=filters.platform,level=filters.level||filters.difficulty
  if(platform){const p=a.platforms?.[platform];if(!p||['planned','unsupported'].includes(p.status))return false;if(level&&p.level!==level)return false;if(filters.verified&&platformStatus(p,now)!=='active')return false}
  else {if(level&&a.difficulty!==level)return false;if(filters.verified&&!Object.values(a.platforms||{}).some(p=>platformStatus(p,now)==='active'))return false}
  if(filters.original&&a.kind!=='original')return false
  if(filters.recent){const delta=(now.getTime()-Date.parse(a.updated+'T00:00:00+08:00'))/86400000;if(delta<0||delta>30)return false}
  return true
 }).sort((a,b)=>(a.order||99)-(b.order||99)||b.updated.localeCompare(a.updated))
}
export function queryFilters(search){const p=new URLSearchParams(search),f={};for(const k of ['q','platform','level','type','format','kind','industry','tools','cost'])f[k]=p.get(k)||'';for(const k of ['verified','recent','original','draft','archived'])f[k]=p.get(k)==='1';return f}
export function filterQuery(f){const p=new URLSearchParams();for(const[k,v]of Object.entries(f))if(v)p.set(k,v===true?'1':String(v));return p.toString()}
export function availableOptions(articles,filters,key,options,now){return options.map(o=>({...o,count:filterArticles(articles,{...filters,[key]:o.value},now).length})).filter(o=>o.count>0)}
export function stalePlatforms(articles,now=new Date()){return articles.flatMap(a=>Object.entries(a.platforms||{}).filter(([,p])=>['active','outdated'].includes(p.status)&&platformStatus(p,now)==='outdated').map(([slug,p])=>({article:a,slug,...p})))}
