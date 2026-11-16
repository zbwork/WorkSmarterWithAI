import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { makeSidebar } from './sidebar.mts'
import { contentConfig as c } from '../../content.config'
const base=process.env.SITE_BASE||'/'
const siteURL=process.env.SITE_URL?.replace(/\/$/,'')
export default withMermaid(defineConfig({
 title:c.title, description:'按行业整理的 Skill、工作流与 AI 应用教程。公开实测状态、费用和版本，开源、持续更新。',
 lang:'zh-CN', srcExclude:['public/**'], base, cleanUrls:true, lastUpdated:true,
 head:[['link',{rel:'icon',href:base+'favicon.svg'}], ...(siteURL?[['link',{rel:'alternate',type:'application/rss+xml',title:'AI 提效指南更新',href:siteURL+'/feed.xml'}]]:[])],
 sitemap:siteURL?{hostname:new URL(siteURL).origin}:undefined,
 markdown:{lineNumbers:true},
 themeConfig:{
 logo:'/favicon.svg', siteTitle:'AI 提效指南',
 nav:[{text:'Skill',link:'/skills/'},{text:'工作流',link:'/workflows/'},{text:'AI 应用',link:'/apps/'},{text:'按行业',link:'/industries/'},{text:'总览筛选',link:'/catalog/'},{text:'最近更新',link:'/changelog/'},{text:'关于',items:[{text:'关于手册',link:'/about/'},{text:'贡献指南',link:'/contribute/'},{text:'评测规则',link:'/review-policy/'},{text:'下载中心',link:'/downloads/'}]}],
 sidebar:makeSidebar(), outline:{label:'本页目录',level:[2,3]},
 socialLinks:[{icon:'github',link:c.repo}],
 editLink:{pattern:c.repo+'/edit/main/docs/:path',text:'在 GitHub 上编辑此页'},
 lastUpdated:{text:'页面最后修改',formatOptions:{dateStyle:'medium'}},
 docFooter:{prev:'上一篇',next:'下一篇'}, sidebarMenuLabel:'目录', returnToTopLabel:'返回顶部', darkModeSwitchLabel:'外观',
 footer:{message:'正文 CC BY 4.0 · 代码 MIT · 开源，持续更新',copyright:'AI 提效指南 · WorkSmarterWithAI'},
 search:{provider:'local',options:{
  translations:{button:{buttonText:'搜索手册',buttonAriaLabel:'搜索手册'},modal:{noResultsText:'没有找到相关内容',resetButtonTitle:'清空',displayDetails:'显示详情',backButtonTitle:'返回',footer:{selectText:'选择',navigateText:'切换',closeText:'关闭'}}},
  miniSearch:{options:{tokenize:(text)=>Array.from(new Intl.Segmenter('zh',{granularity:'word'}).segment(text.toLowerCase())).filter(s=>s.isWordLike).map(s=>s.segment)},searchOptions:{prefix:true,fuzzy:0.2}}
 }}
 },
 // Prebundle Mermaid and its CommonJS dependencies for pnpm's strict module layout.
 vite:{optimizeDeps:{include:['mermaid']},server:{fs:{allow:['../..']}},ssr:{noExternal:['vitepress-plugin-mermaid']}}
}))
