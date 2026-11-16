import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { zipSync, strToU8 } from 'fflate'
import { root, walk, readArticles, today } from './content.mjs'
import { isListed } from '../docs/.vitepress/theme/content-model.mjs'
import {visibleScenarioGroups,scenarioStages} from '../docs/.vitepress/theme/scenario-navigation.mjs'
import {expandPrompts} from './prompts.mjs'
import { contentConfig as c } from '../content.config.ts'
const allArticles=readArticles();const articles=allArticles.filter(isListed);const publicDir=path.join(root,'docs/public')
const site=(process.env.SITE_URL||'').replace(/\/$/,'')
function write(file,content){fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,content)}
const link=a=>(site||'')+a.url
const tasks=articles.filter(a=>a.contentType==='task')
const index='# AI 提效指南\n\n新手跟着做就会，懂行的人也有干货。\n\n'+visibleScenarioGroups(c,tasks).map(group=>'## '+group.name+'\n\n'+group.items.map(s=>'### '+s.name+'\n\n'+scenarioStages(s,tasks).map(stage=>(stage.name?'#### '+stage.name+'\n':'')+stage.tasks.map(a=>`- [${a.title}](${link(a)})：${a.description} [${a.status}]`).join('\n')).join('\n\n')).join('\n\n')).join('\n\n')+'\n\n## 新手课与技能库\n'+articles.filter(a=>a.contentType!=='task').map(a=>`- [${a.title}](${link(a)})：${a.description}`).join('\n')+'\n'
const full='# AI 提效指南 · 正文快照\n\n生成日期：'+today()+'\n\n'+articles.map(a=>`## ${a.title}\n\n原文：${link(a)}\n验证状态：${a.status}；实测日期：${a.verified||'未实测'}；费用：${a.cost}\n\n${expandPrompts(a.body)}`).join('\n\n---\n\n')
write(path.join(publicDir,'llms.txt'),index);write(path.join(publicDir,'llms-full.txt'),full)
fs.rmSync(path.join(publicDir,'raw'),{recursive:true,force:true})
for(const f of walk(path.join(root,'docs')).filter(f=>f.endsWith('.md')&&!f.includes('/public/')&&!f.includes('['))){const text=fs.readFileSync(f,'utf8');if(!/^redirectTo:/m.test(text))write(path.join(publicDir,'raw',path.relative(path.join(root,'docs'),f)),expandPrompts(text))}
let events=[]
for(const a of articles){
 let date=a.created
 try { const first=execFileSync('git',['log','--follow','--diff-filter=A','--format=%as','--',a.file],{cwd:root,encoding:'utf8',stdio:['ignore','pipe','ignore']}).trim().split('\n').pop();if(first)date=first }catch{}
 events.push({title:a.title,url:a.url,date,kind:'新增'})
 if(a.updated>date)events.push({title:a.title,url:a.url,date:a.updated,kind:'修正'})
 for(const [slug,test] of Object.entries(a.platforms||{})){if(test.verified)events.push({title:a.title,url:a.url,date:test.verified,kind:'重测',platform:slug})}
 // Preserve previous material changes when Git history is available. Wording-only commits add no entries.
 try {
  const commits=execFileSync('git',['log','--format=%H','--',a.file],{cwd:root,encoding:'utf8',stdio:['ignore','pipe','ignore']}).trim().split('\n').filter(Boolean)
  for(const sha of commits){const patch=execFileSync('git',['show','--format=','--unified=0',sha,'--',a.file],{cwd:root,encoding:'utf8',stdio:['ignore','pipe','ignore']});for(const [field,kind] of [['updated','修正']]){const added=patch.match(new RegExp('^\\+'+field+':\\s*["\x27]?(\\d{4}-\\d{2}-\\d{2})','m'));const removed=patch.match(new RegExp('^-'+field+':\\s*(.*)','m'));if(added&&removed&&!removed[1].includes(added[1])&&added[1]>date)events.push({title:a.title,url:a.url,date:added[1],kind})}}
 }catch{}
}
events=[...new Map(events.map(e=>[e.url+e.date+e.kind+(e.platform||''),e])).values()].sort((a,b)=>b.date.localeCompare(a.date))
write(path.join(publicDir,'changelog.json'),JSON.stringify(events,null,2))
const xml=s=>String(s).replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]))
if(site)write(path.join(publicDir,'feed.xml'),`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>AI 提效指南</title><link>${xml(site+'/')}</link><description>新增、重测与实质修正</description><language>zh-CN</language>${events.map(e=>`<item><title>${xml(e.kind+' · '+e.title)}</title><link>${xml(site+e.url)}</link><guid isPermaLink="false">${xml(site+e.url+'#'+e.kind+'-'+e.date)}</guid><pubDate>${new Date(e.date+'T00:00:00+08:00').toUTCString()}</pubDate><description>${xml(e.kind+'：'+e.title)}</description></item>`).join('')}</channel></rss>`)
else if(fs.existsSync(path.join(publicDir,'feed.xml')))fs.unlinkSync(path.join(publicDir,'feed.xml'))
const downloads=[]
for(const a of allArticles.filter(a=>a.contentType==='library'&&a.original&&a.download)){
 const src=path.resolve(root,a.source);if(!src.startsWith(root+path.sep)||!fs.existsSync(src))throw Error('Invalid source: '+a.source)
 const files={};for(const f of walk(src)) files[path.basename(src)+'/'+path.relative(src,f)]=new Uint8Array(fs.readFileSync(f))
 const zip=zipSync(files,{level:6});write(path.join(publicDir,a.download),zip)
 if(isListed(a))downloads.push({title:a.title,description:a.description,file:a.download,bytes:zip.length,updated:a.updated,license:a.license,version:'0.1.0',article:a.url})
}
const bundle={};for(const f of walk(path.join(root,'handbook-skill')))bundle['work-smarter-with-ai/'+path.relative(path.join(root,'handbook-skill'),f)]=new Uint8Array(fs.readFileSync(f))
bundle['work-smarter-with-ai/references/LICENSE-CONTENT']=new Uint8Array(fs.readFileSync(path.join(root,'LICENSE')));bundle['work-smarter-with-ai/references/llms.txt']=strToU8(index);bundle['work-smarter-with-ai/references/llms-full.txt']=strToU8(full)
const skillZip=zipSync(bundle,{level:6});write(path.join(publicDir,'downloads/work-smarter-with-ai.zip'),skillZip)
downloads.push({title:'让 AI 按这本手册查找方法',description:'含目录与正文快照的手册查询 Skill。还没在各个 AI 工具中试过。',file:'/downloads/work-smarter-with-ai.zip',bytes:skillZip.length,updated:today(),license:'MIT；正文快照 CC BY 4.0',version:'0.1.0',article:'/about/'})
write(path.join(publicDir,'downloads-manifest.json'),JSON.stringify(downloads,null,2))
console.log(`Generated ${articles.length} articles, ${events.length} updates and ${downloads.length} downloadable packages. RSS: ${site?'enabled':'set SITE_URL to enable'}`)
