import fs from 'node:fs'
import path from 'node:path'
import {root,walk} from './content.mjs'
export function readPrompts(){return Object.fromEntries(walk(path.join(root,'skills')).filter(f=>f.endsWith('/prompt.md')).map(f=>{const source=fs.readFileSync(f,'utf8').trim(),parts={};for(const m of source.matchAll(/^## ([^\n]+)\n([\s\S]*?)(?=^## |$(?![\s\S]))/gm))parts[m[1].trim()]=m[2].trim();return [path.basename(path.dirname(f)),{text:source,parts}]}))}
export function resolvePrompt(id,part){const source=readPrompts()[id];const result=part?source?.parts[part]:source?.text;if(!result)throw Error('提示词不存在：'+id+(part?' / '+part:''));return result}
export function expandPrompts(body){return body.replace(/<PromptBox\s+src="([^"]+)"(?:\s+part="([^"]+)")?\s*\/>/g,(_,id,part)=>resolvePrompt(id,part))}
