export function stale(article, now = new Date()) {
 return Boolean(article.verified && (now.getTime()-Date.parse(article.verified+'T00:00:00+08:00'))/86400000>90)
}
export function statusText(a, now = new Date()) {
 if(a.status==='deprecated') return '已停止维护'
 if(a.status==='unverified') return '待实测'
 if(a.status==='outdated'||stale(a,now)) return '待复测'
 return '已实测'
}
export function filterArticles(articles, filters, now = new Date()) {
 const q=(filters.q||'').trim().toLocaleLowerCase()
 return articles.filter(a => {
  if(a.status==='deprecated'&&!filters.archived) return false
  if(q && ![a.title,a.description,...(a.tags||[]),...(a.tools||[])].join(' ').toLocaleLowerCase().includes(q)) return false
  for(const k of ['type','kind','difficulty','cost']) if(filters[k]&&a[k]!==filters[k]) return false
  for(const k of ['industry','tools']) if(filters[k]&&!a[k]?.includes(filters[k])) return false
  if(filters.original&&a.kind!=='original') return false
  if(filters.recent) { const delta=(now.getTime()-Date.parse((a.updated||a.created)+'T00:00:00+08:00'))/86400000; if(delta<0||delta>30) return false }
  return true
 }).sort((a,b)=> (b.updated||b.created).localeCompare(a.updated||a.created))
}
export function queryFilters(search) {
 const params=new URLSearchParams(search); const f={}
 for(const k of ['q','type','kind','industry','tools','difficulty','cost']) f[k]=params.get(k)||''
 for(const k of ['recent','original','archived']) f[k]=params.get(k)==='1'
 return f
}
export function filterQuery(f) {
 const p=new URLSearchParams()
 for(const [k,v] of Object.entries(f)) if(v) p.set(k,v===true?'1':String(v))
 return p.toString()
}
