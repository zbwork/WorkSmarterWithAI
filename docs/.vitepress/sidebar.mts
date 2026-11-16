import { readArticles } from '../../scripts/content.mjs'
import { contentConfig } from '../../content.config'
export function makeSidebar() {
 const articles=readArticles().filter(a=>a.status!=='deprecated').sort((a,b)=>(a.order||99)-(b.order||99))
 return [{text:'从这里开始',items:[{text:'第一次用 AI',link:'/start/'},{text:'全部教程',link:'/catalog/'}]},...Object.entries(contentConfig.types).map(([type,label])=>({text:label,items:articles.filter(a=>a.type===type).map(a=>({text:a.title,link:a.url}))})).filter(g=>g.items.length)]
}
