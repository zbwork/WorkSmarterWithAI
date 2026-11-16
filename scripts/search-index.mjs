import {createRequire} from 'node:module'
import {readArticles} from './content.mjs'
import {expandPrompts} from './prompts.mjs'
import {contentConfig as c} from '../content.config.ts'
import {searchOptions} from '../docs/.vitepress/theme/search-options.mjs'
const req=createRequire(import.meta.url),vpReq=createRequire(req.resolve('vitepress/package.json')),MiniSearch=vpReq('minisearch')
export function buildSearchIndex(){const index=new MiniSearch(searchOptions);index.addAll(readArticles().map(a=>({url:a.url,title:a.title,description:a.description,body:expandPrompts(a.body),tags:(a.tags||[]).join(' '),context:(a.scenarios||[]).map(r=>{const s=c.scenarios.find(s=>s.id===r.scenario);return s?.name+' '+(s?.stages.find(t=>t.slug===r.stage)?.name||'')}).join(' ')})));return JSON.stringify(index)}
