import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import matter from 'gray-matter'
import {deriveArticle} from '../docs/.vitepress/theme/content-model.mjs'
import {platformBlocks} from '../docs/.vitepress/platform-containers.mjs'
import {validateArticle,today} from '../scripts/content.mjs'

for(const [name,type,count] of [['task','task',1],['task-multi-tool','task',3],['lesson','lesson',1]]){
 test(`${name} 模板填入基本信息后通过内容校验，工具记录与正文对应`,()=>{
  let source=fs.readFileSync(new URL(`../templates/${name}.md`,import.meta.url),'utf8')
  for(const [key,value] of Object.entries({DATE:today(),AUTHOR:'zbwork',SCENARIO:'office',STAGE:'meeting',LESSON:'99'}))source=source.replaceAll('{{'+key+'}}',value)
  const {data,content}=matter(source),article=deriveArticle({...data,contentType:type,body:content})
  assert.deepEqual(validateArticle(article),[])
  const blocks=platformBlocks(content)
  assert.equal(blocks.length,count)
  assert.deepEqual(new Set(blocks.map(b=>b.slug)),new Set(Object.keys(data.platforms)))
  assert.ok(Object.values(data.platforms).every(p=>p.status==='unverified'&&p.verified===null))
 })
}
