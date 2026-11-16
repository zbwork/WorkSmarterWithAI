import fs from 'node:fs'
import {readArticles,root,today} from './content.mjs'
import {stalePlatforms} from '../docs/.vitepress/theme/content-utils.mjs'
import {contentConfig as c} from '../content.config.ts'
const list=stalePlatforms(readArticles())
const report='# 平台复测待办 · '+today()+'\n\n'+(list.length?list.map(p=>`- [ ] [${p.article.title}](${c.repo}/blob/main/${p.article.file}) × ${c.platforms.find(x=>x.slug===p.slug)?.name}：最近实测 ${p.verified}`).join('\n'):'目前没有需要复测的已验证平台。')+'\n'
if(process.argv.includes('--output'))fs.writeFileSync(root+'/stale-report.md',report)
console.log(report)
