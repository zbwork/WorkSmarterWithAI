import fs from 'node:fs'
import path from 'node:path'
import {unzipSync,strFromU8} from 'fflate'
import {root,readArticles,walk} from './content.mjs'
import {readablePlatforms} from '../docs/.vitepress/theme/content-model.mjs'
import {contentConfig as c} from '../content.config.ts'
const dist=path.join(root,'docs/.vitepress/dist')
const fail=m=>{throw Error(m)}
for(const a of readArticles()){
 const html=fs.readFileSync(path.join(dist,a.url,'index.html'),'utf8')
 if(!html.includes(a.resourceTitle||a.title)||!html.includes('article-meta')||html.indexOf('<h1')>html.indexOf('article-meta'))fail('Article rendering missing: '+a.url)
 if(!fs.existsSync(path.join(dist,'raw',a.url,'index.md')))fail('Missing raw Markdown: '+a.url)
}
for(const s of c.scenarios){const exists=readArticles().some(a=>a.contentType==='task'&&!a.draft&&a.status!=='deprecated'&&a.scenarios.some(r=>r.scenario===s.id));const file=path.join(dist,'scenarios',s.id,'index.html');if(exists?!fs.existsSync(file):fs.existsSync(file))fail('Scenario route visibility: '+s.id)}
const downloads=JSON.parse(fs.readFileSync(path.join(dist,'downloads-manifest.json'),'utf8'))
for(const d of downloads){const files=unzipSync(fs.readFileSync(path.join(dist,d.file)));if(!Object.keys(files).some(k=>k.endsWith('/LICENSE')))fail('Missing license: '+d.file);if(d.file.includes('work-smarter')){const full=files['work-smarter-with-ai/references/llms-full.txt'];if(!full||!strFromU8(full).includes(readArticles()[0].title))fail('Missing handbook snapshot')}}
if(fs.existsSync(path.join(dist,'public/raw')))fail('Raw Markdown must not compile into duplicate website pages')
console.log('Static routes, article rendering, raw Markdown and downloadable archives verified.')

const assets=fs.readdirSync(path.join(dist,'assets'));if(assets.some(a=>/mermaid|cytoscape/i.test(a)))fail('Unused diagram library is still bundled')

const skillHTML=fs.readFileSync(path.join(dist,'tasks/task-brief/index.html'),'utf8')
const skill=readArticles().find(a=>a.url==='/tasks/task-brief/')
for(const {slug} of readablePlatforms(Object.keys(skill.platforms),skill.platforms)){if(!skillHTML.includes('platform-0-panel-'+slug))fail('Missing SSR platform panel: '+slug)}
for(const text of ['形成','在已安装列表确认'])if(!skillHTML.includes(text))fail('Platform slot missing from SSR: '+text)
for(const url of ['index.html','search/index.html','scenarios/index.html','library/index.html']){
 const html=fs.readFileSync(path.join(dist,url),'utf8');if(html.includes('article-card')&&html.includes('href="'+(process.env.SITE_BASE||'/')+'skills/task-brief/"'))fail('Draft leaked into default list: '+url)
}
const full=fs.readFileSync(path.join(dist,'llms-full.txt'),'utf8')
if(!full.includes('::: platform codex')||!full.includes('把下面的虚构访谈'))fail('llms-full lost a platform instruction')
const skillFiles=unzipSync(fs.readFileSync(path.join(dist,'downloads/task-brief.zip')))
if(!skillFiles['task-brief/SKILL.md'])fail('Skill package has no SKILL.md')
if(skillHTML.includes('role="tab" id="platform-0-tab-zhiban"'))fail('Pending tool is exposed as a tab')
const single=fs.readFileSync(path.join(dist,'tasks/meeting-actions/index.html'),'utf8')
if(single.includes('role="tablist"')||single.includes('你用哪个工具'))fail('Single tool must render directly')
if(!single.includes('platform-0-panel-doubao'))fail('Single tool instructions missing')
console.log('Written tool panels are server-rendered; single tool renders directly; draft and archive checks passed.')

const base=process.env.SITE_BASE||'/'
for(const file of walk(dist).filter(f=>f.endsWith('.html'))){
 const html=fs.readFileSync(file,'utf8')
 for(const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g))if(!m[1].startsWith('//')&&!m[1].startsWith(base))fail('Subpath escaped '+base+': '+m[1]+' in '+file)
}
console.log('Internal links and assets respect deployment base '+base)

if(process.env.SITE_URL){const xml=fs.readFileSync(path.join(dist,'sitemap.xml'),'utf8');const expected=new URL(process.env.SITE_URL).origin+base;for(const m of xml.matchAll(/<loc>(.*?)<\/loc>/g))if(!m[1].startsWith(expected))fail('Sitemap lost deployment base: '+m[1]);if(xml.includes('/tasks/task-brief/'))fail('Draft leaked into sitemap')}

const redirects=JSON.parse(fs.readFileSync(path.join(root,'design/v0.3-redirects.json'),'utf8'));for(const [old,dest] of Object.entries(redirects)){const html=fs.readFileSync(path.join(dist,old,'index.html'),'utf8');if(!html.includes('页面已迁移'))fail('Missing redirect '+old);const target=dest.split('?')[0];if(!fs.existsSync(path.join(dist,target,'index.html')))fail('Missing redirect target '+dest)}
const prompt=fs.readFileSync(path.join(root,'skills/meeting-to-todo/prompt.md'),'utf8').split('\n\n')[1];if(!fs.readFileSync(path.join(dist,'tasks/meeting-actions/index.html'),'utf8').includes(prompt))fail('Prompt text not SSR rendered');if(!full.includes(prompt))fail('Prompt not expanded into llms-full')
if(process.env.SITE_URL){const xml=fs.readFileSync(path.join(dist,'sitemap.xml'),'utf8');for(const old of Object.keys(redirects))if(xml.includes('<loc>'+process.env.SITE_URL.replace(/\/$/,'')+old+'</loc>'))fail('Redirect in sitemap '+old)}
console.log('Scenario routes, redirects, shared prompts, search sources and sitemap verified.')
