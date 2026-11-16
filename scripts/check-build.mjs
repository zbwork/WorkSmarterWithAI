import fs from 'node:fs'
import path from 'node:path'
import {unzipSync,strFromU8} from 'fflate'
import {root,readArticles,walk} from './content.mjs'
import {contentConfig as c} from '../content.config.ts'
const dist=path.join(root,'docs/.vitepress/dist')
const fail=m=>{throw Error(m)}
for(const a of readArticles()){
 const html=fs.readFileSync(path.join(dist,a.url,'index.html'),'utf8')
 if(!html.includes(a.title)||!html.includes('article-meta')||html.indexOf('<h1')>html.indexOf('article-meta'))fail('Article rendering missing: '+a.url)
 if(!fs.existsSync(path.join(dist,'raw',a.url,'index.md')))fail('Missing raw Markdown: '+a.url)
}
for(const i of c.industries.filter(i=>readArticles().some(a=>!a.draft&&a.status!=='deprecated'&&a.industry.includes(i.name)))){const html=fs.readFileSync(path.join(dist,'industries',i.slug,'index.html'),'utf8');if(!html.includes(i.description))fail('Industry route missing: '+i.slug)}
const downloads=JSON.parse(fs.readFileSync(path.join(dist,'downloads-manifest.json'),'utf8'))
for(const d of downloads){const files=unzipSync(fs.readFileSync(path.join(dist,d.file)));if(!Object.keys(files).some(k=>k.endsWith('/LICENSE')))fail('Missing license: '+d.file);if(d.file.includes('work-smarter')){const full=files['work-smarter-with-ai/references/llms-full.txt'];if(!full||!strFromU8(full).includes(readArticles()[0].title))fail('Missing handbook snapshot')}}
if(fs.existsSync(path.join(dist,'public/raw')))fail('Raw Markdown must not compile into duplicate website pages')
console.log('Static routes, article rendering, raw Markdown and downloadable archives verified.')

for(const i of c.industries.filter(i=>!readArticles().some(a=>a.industry.includes(i.name)&&!a.draft&&a.status!=='deprecated'))){if(fs.existsSync(path.join(dist,'industries',i.slug,'index.html')))fail('Empty industry route: '+i.slug)}
const assets=fs.readdirSync(path.join(dist,'assets'));if(assets.some(a=>/mermaid|cytoscape/i.test(a)))fail('Unused diagram library is still bundled')

const skillHTML=fs.readFileSync(path.join(dist,'skills/task-brief/index.html'),'utf8')
for(const slug of c.platforms.map(p=>p.slug)){if(!skillHTML.includes('platform-0-panel-'+slug))fail('Missing SSR platform panel: '+slug)}
for(const text of ['形成','在已安装列表确认','即将补充'])if(!skillHTML.includes(text))fail('Platform slot missing from SSR: '+text)
for(const url of ['index.html','catalog/index.html','skills/index.html','workflows/index.html','apps/index.html']){
 const html=fs.readFileSync(path.join(dist,url),'utf8');if(html.includes('article-card')&&html.includes('href="'+(process.env.SITE_BASE||'/')+'skills/task-brief/"'))fail('Draft leaked into default list: '+url)
}
const full=fs.readFileSync(path.join(dist,'llms-full.txt'),'utf8')
if(!full.includes('::: platform codex')||!full.includes('把下面的虚构访谈'))fail('llms-full lost a platform instruction')
const skillFiles=unzipSync(fs.readFileSync(path.join(dist,'downloads/task-brief.zip')))
if(!skillFiles['task-brief/SKILL.md'])fail('Skill package has no SKILL.md')
console.log('All platform panels are server-rendered; default lists exclude drafts; skill package verified.')

const base=process.env.SITE_BASE||'/'
for(const file of walk(dist).filter(f=>f.endsWith('.html'))){
 const html=fs.readFileSync(file,'utf8')
 for(const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g))if(!m[1].startsWith('//')&&!m[1].startsWith(base))fail('Subpath escaped '+base+': '+m[1]+' in '+file)
}
console.log('Internal links and assets respect deployment base '+base)

if(process.env.SITE_URL){const xml=fs.readFileSync(path.join(dist,'sitemap.xml'),'utf8');const expected=new URL(process.env.SITE_URL).origin+base;for(const m of xml.matchAll(/<loc>(.*?)<\/loc>/g))if(!m[1].startsWith(expected))fail('Sitemap lost deployment base: '+m[1]);if(xml.includes('/skills/task-brief/'))fail('Draft leaked into sitemap')}
