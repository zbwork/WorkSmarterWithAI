import fs from 'node:fs'
import {readArticles,root,today} from './content.mjs'
import {stale} from '../docs/.vitepress/theme/content-utils.mjs'
const list=readArticles().filter(a=>a.status!=='deprecated'&&(a.status==='outdated'||stale(a)))
const report='# 复测待办 · '+today()+'\n\n'+(list.length?list.map(a=>`- [ ] [${a.title}](https://github.com/zbwork/WorkSmarterWithAI/blob/main/${a.file})：最近实测 ${a.verified||'未记录'}`).join('\n'):'目前没有超过 90 天未复测的已验证文章。')+'\n'
if(process.argv.includes('--output'))fs.writeFileSync(root+'/stale-report.md',report)
console.log(report)
