import { readArticles } from '../../scripts/content.mjs'
import { contentConfig } from '../../content.config'
export function makeSidebar() {
 const articles=readArticles(); const result={}
 for(const [type,dir] of Object.entries({skill:'skills',workflow:'workflows',app:'apps'})) {
  result[`/${dir}/`]=[{text:contentConfig.types[type],items:[{text:'全部'+contentConfig.types[type],link:`/${dir}/`},{text:'总览筛选',link:'/catalog/'}]},
   ...Object.entries(contentConfig.kinds).map(([kind,label])=>({text:label,collapsed:false,items:contentConfig.industries.map(i=>({text:i.name,collapsed:false,items:articles.filter(a=>a.type===type&&a.kind===kind&&a.industry[0]===i.name).sort((a,b)=>(a.order||99)-(b.order||99)).map(a=>({text:a.title,link:a.url}))})).filter(g=>g.items.length)})).filter(g=>g.items.length)]
 }
 return result
}
