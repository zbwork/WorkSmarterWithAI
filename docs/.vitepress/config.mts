import {defineConfig} from 'vitepress'
import {createRequire} from 'node:module'
import fs from 'node:fs'
import {makeSidebar} from './sidebar.mts'
import {contentConfig as c} from '../../content.config'
import {platformContainers} from './platform-containers.mjs'
import {readArticles} from '../../scripts/content.mjs'
import {isListed} from './theme/content-model.mjs'
import {scenarioNavigation} from './theme/scenario-navigation.mjs'
const base=process.env.SITE_BASE||'/',rows=readArticles(),tasks=rows.filter(a=>a.contentType==='task'&&isListed(a))
const redirects=JSON.parse(fs.readFileSync(new URL('../../design/v0.3-redirects.json',import.meta.url),'utf8'))
const excluded=new Set([...rows.filter(a=>a.draft).map(a=>a.url),...Object.keys(redirects)].map(s=>s.slice(1)))
const siteURL=process.env.SITE_URL?.replace(/\/$/,''),req=createRequire(import.meta.url),vpReq=createRequire(req.resolve('vitepress/package.json'))
export default defineConfig({
 title:c.title,description:'新手跟着做就会，懂行的人也有干货。按场景完成工作与生活中的小事。',lang:'zh-CN',srcExclude:['public/**'],base,cleanUrls:true,lastUpdated:false,
 head:[['link',{rel:'icon',href:base+'favicon.svg'}]],
 sitemap:siteURL?{hostname:new URL(siteURL).origin,transformItems:items=>items.filter(i=>!excluded.has(i.url)).map(i=>({...i,url:base+i.url}))}:undefined,
 markdown:{lineNumbers:false,config:md=>md.use(platformContainers)},
 transformPageData(page){const a=rows.find(a=>a.file==='docs/'+page.relativePath);if(a){if(a.resourceTitle)page.title=a.resourceTitle;const {body,raw,file,...meta}=a;page.frontmatter={...page.frontmatter,...meta};if(a.draft){page.frontmatter.search=false;page.frontmatter.head=[...(page.frontmatter.head||[]),['meta',{name:'robots',content:'noindex'}]]}}},
 themeConfig:{siteTitle:c.title,aside:true,
 nav:[{text:'新手入门',link:'/start/'},...scenarioNavigation(c,tasks),{text:'技能库',link:'/library/'}],
 sidebar:makeSidebar(),outline:false,lastUpdated:{text:'页面最后修改',formatOptions:{dateStyle:'medium'}},docFooter:{prev:'上一篇',next:'下一篇'},sidebarMenuLabel:'目录',returnToTopLabel:'返回顶部',darkModeSwitchLabel:'外观',footer:undefined},
 vite:{resolve:{alias:{'@handbook/minisearch':vpReq.resolve('minisearch')}},server:{fs:{allow:['../..']},watch:{ignored:['**/.vitepress/dist/**','**/.vitepress/cache/**']}}}
})
