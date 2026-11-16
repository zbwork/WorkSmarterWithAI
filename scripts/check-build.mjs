import fs from 'node:fs'
import path from 'node:path'
import {unzipSync,strFromU8} from 'fflate'
import {root,readArticles} from './content.mjs'
import {contentConfig as c} from '../content.config.ts'
const dist=path.join(root,'docs/.vitepress/dist')
const fail=m=>{throw Error(m)}
for(const a of readArticles()){
 const html=fs.readFileSync(path.join(dist,a.url,'index.html'),'utf8')
 if(!html.includes(a.title)||!html.includes('article-meta'))fail('Article rendering missing: '+a.url)
 if(!fs.existsSync(path.join(dist,'raw',a.url,'index.md')))fail('Missing raw Markdown: '+a.url)
}
for(const i of c.industries){const html=fs.readFileSync(path.join(dist,'industries',i.slug,'index.html'),'utf8');if(!html.includes(i.description))fail('Industry route missing: '+i.slug)}
const downloads=JSON.parse(fs.readFileSync(path.join(dist,'downloads-manifest.json'),'utf8'))
for(const d of downloads){const files=unzipSync(fs.readFileSync(path.join(dist,d.file)));if(!Object.keys(files).some(k=>k.endsWith('/LICENSE')))fail('Missing license: '+d.file);if(d.file.includes('work-smarter')){const full=files['work-smarter-with-ai/references/llms-full.txt'];if(!full||!strFromU8(full).includes(readArticles()[0].title))fail('Missing handbook snapshot')}}
if(fs.existsSync(path.join(dist,'public/raw')))fail('Raw Markdown must not compile into duplicate website pages')
console.log('Static routes, article rendering, raw Markdown and downloadable archives verified.')
