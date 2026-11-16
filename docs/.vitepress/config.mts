import { defineConfig } from 'vitepress'
import { makeSidebar } from './sidebar.mts'
import { contentConfig as c } from '../../content.config'
import { platformContainers } from './platform-containers.mjs'
import { readArticles } from '../../scripts/content.mjs'
import { deriveArticle } from './theme/content-model.mjs'
const base=process.env.SITE_BASE||'/'
const draftURLs=new Set(readArticles().filter(a=>a.draft).map(a=>a.url.slice(1)))
const siteURL=process.env.SITE_URL?.replace(/\/$/,'')
export default defineConfig({
 title:c.title, description:'给第一次用 AI 的人：打开工具，复制一句话，照着完成一个小任务。开源，持续更新。',
 lang:'zh-CN', srcExclude:['public/**'], base, cleanUrls:true, lastUpdated:true,
 head:[['link',{rel:'icon',href:base+'favicon.svg'}], ...(siteURL?[['link',{rel:'alternate',type:'application/rss+xml',title:'AI 提效指南更新',href:siteURL+'/feed.xml'}]]:[])],
 sitemap:siteURL?{hostname:new URL(siteURL).origin,transformItems:items=>items.filter(i=>!draftURLs.has(i.url)).map(i=>({...i,url:base+i.url}))}:undefined,
 markdown:{lineNumbers:false,config:md=>md.use(platformContainers)},
 transformPageData(page){if(page.frontmatter.type){page.frontmatter=deriveArticle(page.frontmatter);if(page.frontmatter.draft){page.frontmatter.search=false;page.frontmatter.head=[...(page.frontmatter.head||[]),['meta',{name:'robots',content:'noindex'}]]}}},
 themeConfig:{
 logo:'/favicon.svg', siteTitle:'AI 提效指南',
 nav:[{text:'新手开始',link:'/start/'},...Object.entries(c.types).map(([type,text])=>({text,link:({skill:'/skills/',workflow:'/workflows/',app:'/apps/'})[type]})),{text:'按平台',items:c.platforms.filter(p=>p.guideAvailable).map(p=>({text:p.name,link:'/platforms/'+p.slug+'/'}))},{text:'按行业',link:'/industries/'},{text:'全部教程',link:'/catalog/'},{text:'更多',items:[{text:'术语表',link:'/glossary/'},{text:'评测规则',link:'/review-policy/'},{text:'最近更新',link:'/changelog/'},{text:'关于手册',link:'/about/'},{text:'参与贡献',link:'/contribute/'},{text:'下载源文件',link:'/downloads/'}]}],
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
 vite:{server:{fs:{allow:['../..']},watch:{ignored:['**/.vitepress/dist/**','**/.vitepress/cache/**']}}}
})
