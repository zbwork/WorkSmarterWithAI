import { createContentLoader } from 'vitepress'
export default createContentLoader(['skills/*/index.md','workflows/*/index.md','apps/*/index.md'], {
 transform(raw) { return raw.filter(p=>p.frontmatter.type).map(p=>({...JSON.parse(JSON.stringify(p.frontmatter),(_,v)=>typeof v==='string'&&/^\d{4}-\d{2}-\d{2}T00:00:00/.test(v)?v.slice(0,10):v),url:p.url})).sort((a,b)=>b.updated.localeCompare(a.updated)) }
})
