import fs from 'node:fs'
import path from 'node:path'
import {root,today} from './content.mjs'
import {contentConfig as c} from '../content.config.ts'
const [type,kind,slug]=process.argv.slice(2)
if(!c.types[type]||!c.kinds[kind]||!/^[-a-z0-9]+$/.test(slug||'')){console.error('用法: pnpm new skill|workflow|app guide|review|original english-slug');process.exit(1)}
const dir={skill:'skills',workflow:'workflows',app:'apps'}[type]
const target=path.join(root,'docs',dir,slug,'index.md');if(fs.existsSync(target))throw Error('文件已存在，未覆盖')
const source=fs.readFileSync(path.join(root,'templates',(type==='skill'?'skill':kind)+'.md'),'utf8').replaceAll('{{TYPE}}',type).replaceAll('{{KIND}}',kind).replaceAll('{{EXTRA}}',kind==='original'?'source: {{SOURCE}}\nlicense: MIT\ndownload: null\nrepo: null':kind==='review'?'scores: {效果: null, 易用: null, 稳定: null, 成本: null, 生态: null}\nrating: null\ntestCase: null':'').replaceAll('{{DATE}}',today()).replaceAll('{{FORMAT}}','').replaceAll('{{SOURCE}}',dir+'/'+slug).replaceAll('{{AUTHOR}}',c.author)
fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,source);console.log(target+'\n请填写内容和证据后运行 pnpm check；评测未实测不能发布。')
