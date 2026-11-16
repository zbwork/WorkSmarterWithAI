import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { root, walk, readArticles, validateArticle } from './content.mjs'
const errors=[]; const articles=readArticles();const docs=path.join(root,'docs');const external=new Set()
for(const a of articles){for(const e of validateArticle(a))errors.push(`${a.file}: ${e}`)
 if(a.source){const source=path.resolve(root,a.source);if(!source.startsWith(root+path.sep)||!fs.existsSync(source))errors.push(`${a.file}: source 不存在或越界`)}
 if(a.download && !/^\/downloads\/[a-z0-9-]+\.zip$/.test(a.download))errors.push(`${a.file}: download 路径不合法`)
}
for(const f of walk(docs).filter(f=>f.endsWith('.md')&&!f.includes('/public/'))){
 const s=fs.readFileSync(f,'utf8').replace(/```[\s\S]*?```/g,'')
 for(const m of s.matchAll(/(!?)\[([^\]]*)\]\(([^\s)]+)(?:\s+[^)]*)?\)/g)){
  const [_,image,alt,href]=m;if(image&&!alt.trim())errors.push(`${f}: 图片缺少 alt`)
  if(/^https?:\/\//.test(href)){external.add(href);continue}if(/^(#|mailto:|data:)/.test(href))continue
  const clean=decodeURIComponent(href.split(/[?#]/)[0]);if(!clean)continue
  let target=clean.startsWith('/')?path.join(docs,clean):path.resolve(path.dirname(f),clean)
  if(!target.startsWith(docs+path.sep)&&target!==docs){errors.push(`${f}: 链接越界 ${href}`);continue}
  if([target,target+'.md',path.join(target,'index.md'),path.join(docs,'public',clean)].some(p=>fs.existsSync(p)&&fs.statSync(p).isFile()))continue
  if(/^\/(industries|tools)\/[^/]+\/?$/.test(clean))continue
  errors.push(`${path.relative(root,f)}: 内链不存在 ${href}`)
 }
}
for(const f of walk(docs).filter(f=>/\.(png|jpe?g|webp|gif)$/i.test(f)&&!f.includes('/public/raw/'))){
 if(!f.endsWith('.webp'))errors.push(`${f}: 文章图片须使用 WebP`)
 if(fs.statSync(f).size>300*1024)errors.push(`${f}: 图片超过 300 KB`)
 const meta=await sharp(f).metadata();if(meta.width>1600)errors.push(`${f}: 图片宽度超过 1600px`)
}
for(const dir of ['skills','workflows','handbook-skill'])for(const f of walk(path.join(root,dir))){
 if(!/\.(md|json|ya?ml|js|mjs|py|txt)$/.test(f))continue
 const s=fs.readFileSync(f,'utf8')
 if(/(?:sk-[A-Za-z0-9]{20,}|gh[pousr]_[A-Za-z0-9]{20,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----)/.test(s))errors.push(`${f}: 疑似密钥，禁止打包`)
}
if(process.argv.includes('--external'))for(const url of external){try{const r=await fetch(url,{signal:AbortSignal.timeout(12000),headers:{'user-agent':'WorkSmarterWithAI-link-check'}});if(!r.ok)errors.push(`${url}: HTTP ${r.status}`)}catch{errors.push(`${url}: 网络检查失败，需人工核对`)}}
if(errors.length){console.error(errors.join('\n'));process.exit(1)}console.log(`Content checks passed (${articles.length} articles).`)
