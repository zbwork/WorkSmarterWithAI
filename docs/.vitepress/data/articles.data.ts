import {createContentLoader} from 'vitepress'
import {deriveArticle} from '../theme/content-model.mjs'
export default createContentLoader(['skills/*/index.md','workflows/*/index.md','apps/*/index.md'],{transform(raw){return raw.filter(p=>p.frontmatter.type).map(p=>deriveArticle({...p.frontmatter,url:p.url})).sort((a,b)=>(a.order||99)-(b.order||99))}})
