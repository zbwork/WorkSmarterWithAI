import fs from 'node:fs'
import path from 'node:path'
import readline from 'node:readline/promises'
import {root,today,readArticles} from './content.mjs'
import {contentConfig as c} from '../content.config.ts'
const args=process.argv.slice(2),[type,slug]=args
const templates={task:'task',lesson:'lesson',skill:'library-skill',app:'library-app',review:'review'}
if(!templates[type]||!slug||! /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)){console.log('用法：pnpm new task|lesson|skill|app|review english-slug\n任务：--scenario office --stage meeting；生活场景不需要 stage。');process.exit(args.includes('--help')?0:1)}
const option=name=>args[args.indexOf('--'+name)+1];let scenario=args.includes('--scenario')?option('scenario'):'',stage=args.includes('--stage')?option('stage'):''
if(type==='task'){
 if(!scenario&&process.stdin.isTTY){const rl=readline.createInterface({input:process.stdin,output:process.stdout});console.log(c.scenarios.map(s=>s.id+'：'+s.name).join('\n'));scenario=await rl.question('场景 id：');const choice=c.scenarios.find(s=>s.id===scenario);if(choice?.stages.length){console.log(choice.stages.map(s=>s.slug+'：'+s.name).join('\n'));stage=await rl.question('环节 slug：')}rl.close()}
 const selected=c.scenarios.find(s=>s.id===scenario);if(!selected||(selected.stages.length?!selected.stages.some(s=>s.slug===stage):Boolean(stage)))throw Error('请选择配置中存在的场景和环节；可使用 --scenario / --stage')
}
const dir={task:'tasks',lesson:'start',skill:'library/skills',app:'library/apps',review:'reviews'}[type],target=path.join(root,'docs',dir,slug,'index.md')
if(fs.existsSync(target))throw Error('文件已存在，未覆盖')
const replacements={DATE:today(),AUTHOR:c.author,SLUG:slug,SCENARIO:scenario,STAGE:stage,LESSON:String(Math.max(0,...readArticles().map(a=>a.lesson||0))+1)}
let source=fs.readFileSync(path.join(root,'templates',templates[type]+'.md'),'utf8');for(const [key,value]of Object.entries(replacements))source=source.replaceAll('{{'+key+'}}',value)
fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,source);console.log(target+'\n请填写标题、资源引用、步骤和证据后运行 pnpm check。模板不是已完成的实测。')
