import {readArticles} from '../../scripts/content.mjs'
import {contentConfig as c} from '../../content.config'
import {isListed} from './theme/content-model.mjs'
export function makeSidebar(){
 const articles=readArticles().filter(isListed).sort((a,b)=>(a.order||99)-(b.order||99))
 return [{text:'从这里开始',items:[{text:'第一次用 AI',link:'/start/'},{text:'全部教程',link:'/catalog/'},{text:'术语表',link:'/glossary/'}]},...Object.entries(c.types).map(([type,text])=>{
 const rows=articles.filter(a=>a.type===type),levels=c.levels.map(l=>({text:l.name,items:rows.filter(a=>a.difficulty===l.name).map(a=>({text:a.title,link:a.url}))})).filter(g=>g.items.length)
 return {text,items:levels.length===1?levels[0].items:levels.flatMap(g=>g.items.length===1?g.items:[g])}
 }).filter(g=>g.items.length)]
}
