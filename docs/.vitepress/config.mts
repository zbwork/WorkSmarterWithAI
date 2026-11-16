import {defineConfig} from 'vitepress'
import {createRequire} from 'node:module'
import fs from 'node:fs'
import {makeSidebar} from './sidebar.mts'
import {contentConfig as c} from '../../content.config'
import {platformContainers} from './platform-containers.mjs'
import {readArticles} from '../../scripts/content.mjs'
import {isListed} from './theme/content-model.mjs'
const base=process.env.SITE_BASE||'/',rows=readArticles(),tasks=rows.filter(a=>a.contentType==='task'&&isListed(a))
const scenarios=c.scenarios.filter(s=>tasks.some(t=>t.scenarios.some(r=>r.scenario===s.id)))
const redirects=JSON.parse(fs.readFileSync(new URL('../../design/v0.3-redirects.json',import.meta.url),'utf8'))
const excluded=new Set([...rows.filter(a=>a.draft).map(a=>a.url),...Object.keys(redirects)].map(s=>s.slice(1)))
const siteURL=process.env.SITE_URL?.replace(/\/$/,''),req=createRequire(import.meta.url),vpReq=createRequire(req.resolve('vitepress/package.json'))
export default defineConfig({
 title:c.title,description:'新手跟着做就会，懂行的人也有干货。按场景完成工作与生活中的小事。',lang:'zh-CN',srcExclude:['public/**'],base,cleanUrls:true,lastUpdated:true,
 head:[['link',{rel:'icon',href:base+'favicon.svg'}]],
 sitemap:siteURL?{hostname:new URL(siteURL).origin,transformItems:items=>items.filter(i=>!excluded.has(i.url)).map(i=>({...i,url:base+i.url}))}:undefined,
 markdown:{lineNumbers:false,config:md=>md.use(platformContainers)},
 transformPageData(page){const a=rows.find(a=>a.file==='docs/'+page.relativePath);if(a){const {body,raw,file,...meta}=a;page.frontmatter={...page.frontmatter,...meta};if(a.draft){page.frontmatter.search=false;page.frontmatter.head=[...(page.frontmatter.head||[]),['meta',{name:'robots',content:'noindex'}]]}}},
 themeConfig:{logo:'/favicon.svg',siteTitle:c.title,
 nav:[{text:'新手入门',link:'/start/'},{text:'工作',items:[...Object.entries({office:'职场通用',role:'按岗位',project:'按项目'}).map(([group,text])=>({text,items:scenarios.filter(s=>s.group===group).map(s=>({text:s.name,link:'/scenarios/'+s.id+'/'}))})).filter(g=>g.items.length),{text:'全部场景 →',link:'/scenarios/'}]},...(scenarios.some(s=>s.group==='life')?[{text:'生活',items:scenarios.filter(s=>s.group==='life').map(s=>({text:s.name,link:'/scenarios/'+s.id+'/'}))}]:[]),{text:'技能库',link:'/library/'},{text:'搜索',link:'/search/'},{text:'更多',items:[{text:'最近更新',link:'/changelog/'},{text:'评测',link:'/reviews/'},{text:'术语表',link:'/glossary/'},{text:'评测规则',link:'/review-policy/'},{text:'关于',link:'/about/'},{text:'参与贡献',link:'/contribute/'}]}],
 sidebar:makeSidebar(),outline:{label:'本页目录',level:[2,3]},socialLinks:[{icon:'github',link:c.repo}],editLink:{pattern:c.repo+'/edit/main/docs/:path',text:'在 GitHub 上编辑此页'},lastUpdated:{text:'页面最后修改',formatOptions:{dateStyle:'medium'}},docFooter:{prev:'上一篇',next:'下一篇'},sidebarMenuLabel:'目录',returnToTopLabel:'返回顶部',darkModeSwitchLabel:'外观',footer:{message:'正文 CC BY 4.0 · 代码 MIT · 开源，持续更新',copyright:c.title+' · '+c.author}},
 vite:{resolve:{alias:{'@handbook/minisearch':vpReq.resolve('minisearch')}},server:{fs:{allow:['../..']},watch:{ignored:['**/.vitepress/dist/**','**/.vitepress/cache/**']}}}
})
