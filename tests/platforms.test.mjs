import test from 'node:test'
import assert from 'node:assert/strict'
import MarkdownIt from 'markdown-it'
import {deriveArticle,allPlatformsStale,choosePlatform} from '../docs/.vitepress/theme/content-model.mjs'
import {filterArticles,availableOptions,stalePlatforms} from '../docs/.vitepress/theme/content-utils.mjs'
import {platformContainers,platformBlocks} from '../docs/.vitepress/platform-containers.mjs'
import {readArticles,validateArticle,today} from '../scripts/content.mjs'
const rows=readArticles(),skill=rows.find(a=>a.contentType==='task'&&a.methods?.[0]?.format==='skill')
const p=(status='unverified',level='入门',verified=null)=>({status,level,verified,version:verified?'test version':null})
const make=platforms=>deriveArticle({...rows[0],contentType:'task',methods:[{type:'skill',use:'meeting-to-todo',format:'prompt'}],format:undefined,platforms})
test('文章派生最低级别、平台状态和最近实测日期，不依赖旧字段',()=>{
 const a=make({doubao:p('unverified'),codex:p('active','进阶',today())});assert.equal(a.difficulty,'入门');assert.equal(a.status,'active');assert.equal(a.verified,today())
 assert.equal(make({doubao:p('outdated','入门','2026-01-01'),codex:p()}).status,'outdated')
 assert.equal(make({doubao:p(),codex:p('planned','进阶')}).status,'unverified')
})
test('技能不足一个 active 为草稿；默认隐藏、显式草稿筛选可见',()=>{
 assert.equal(skill.draft,true);assert.equal(filterArticles([skill]).length,0);assert.equal(filterArticles([skill],{draft:true}).length,1)
 const platforms={...skill.platforms,'doubao-work':p('active','入门',today())}
 assert.equal(deriveArticle({...skill,platforms}).draft,false)
 assert.equal(deriveArticle({...skill,draft:false}).draft,true)
})
test('平台和级别必须在同一平台匹配，已实测也使用被选平台',()=>{
 const a=make({doubao:p('active','入门',today()),codex:p('unverified','进阶')})
 assert.equal(filterArticles([a],{platform:'codex',level:'入门'}).length,0)
 assert.equal(filterArticles([a],{platform:'codex',level:'进阶'}).length,1)
 assert.equal(filterArticles([a],{platform:'codex',verified:true}).length,0)
 assert.equal(filterArticles([a],{platform:'doubao',verified:true}).length,1)
 const options=['入门','进阶','高级'].map(value=>({value}))
 assert.deepEqual(availableOptions([a],{platform:'codex'},'level',options).map(o=>[o.value,o.count]),[['进阶',1]])
})
test('缺平台、日期、版本、截图的技能不能通过校验',()=>{
 const bad=structuredClone(skill);delete bad.platforms.workbuddy;assert.ok(validateArticle(bad).some(e=>e.includes('缺少工具 workbuddy')))
 bad.platforms['doubao-work']=p('active');assert.ok(validateArticle(bad).some(e=>e.includes('verified 和 version')))
 bad.platforms['doubao-work']=p('active','入门',today());assert.ok(validateArticle(bad).some(e=>e.includes('真实截图')))
 bad.platforms.codex={...p(),verified:'2099-01-01'};assert.ok(validateArticle(bad).some(e=>e.includes('日期不合法')))
})
test('planned/unsupported 不允许步骤，unsupported 必须有原因',()=>{
 const a=structuredClone(skill);a.body=a.body.replace('::: platform zhiban\n:::','::: platform zhiban\n点安装\n:::');assert.ok(validateArticle(a).some(e=>e.includes('不允许写操作步骤')))
 a.platforms.zhiban.status='unsupported';assert.ok(validateArticle(a).some(e=>e.includes('必须写原因')))
})
test('新手平台拒绝命令行，Codex 标签可以记录命令',()=>{
 const body='\n```bash\npnpm install\n```\n'
 assert.ok(validateArticle({...skill,body:skill.body.replace('::: platform doubao-work','::: platform doubao-work'+body)}).some(e=>e.includes('不应出现命令行')))
 assert.ok(!validateArticle({...skill,body:skill.body.replace('::: platform codex','::: platform codex'+body)}).some(e=>e.includes('不应出现命令行')))
})
test('相邻平台容器合并、分隔后另起组，代码示例不被渲染',()=>{
 const source='::: platform doubao\n甲\n:::\n\n::: platform codex\n乙\n:::\n\n正文\n\n::: platform workbuddy\n丙\n:::'
 const md=new MarkdownIt().use(platformContainers),html=md.render(source)
 assert.equal((html.match(/<PlatformTabs /g)||[]).length,2);assert.ok(html.includes('<template #codex>'));assert.ok(html.includes('<p>乙</p>'))
 assert.deepEqual(platformBlocks(source).map(b=>[b.slug,b.content]),[['doubao','甲'],['codex','乙'],['workbuddy','丙']])
 assert.equal(platformBlocks('```md\n'+source+'\n```').length,0)
})
test('平台选择优先级是 URL、偏好、配置顺序',()=>{
 const s=['codex','doubao'];assert.equal(choosePlatform(s,'doubao','codex'),'doubao');assert.equal(choosePlatform(s,'bad','codex'),'codex');assert.equal(choosePlatform(s,'',''),'doubao')
})
test('过期逐平台检查，仍有新实测平台时不显示全篇警告',()=>{
 const now=new Date('2026-11-16T12:00:00+08:00'),a=make({doubao:p('active','入门','2026-01-01'),codex:p('active','进阶','2026-11-16')})
 assert.deepEqual(stalePlatforms([a],now).map(x=>x.slug),['doubao']);assert.equal(allPlatformsStale(a,now),false)
 a.platforms.codex.verified='2026-01-01';assert.equal(allPlatformsStale(a,now),true)
})

test('只给有教程的工具提供切换，空工具保留证据但不能被 URL 选中',async()=>{
 const {readablePlatforms}=await import('../docs/.vitepress/theme/content-model.mjs')
 const records={doubao:p(),codex:p('active','进阶',today()),workbuddy:p('planned'),'doubao-work':{...p('unsupported'),reason:'不支持'}}
 const visible=readablePlatforms(Object.keys(records),records).map(x=>x.slug)
 assert.deepEqual(visible,['doubao','codex'])
 assert.equal(choosePlatform(visible,'workbuddy','codex'),'codex')
 assert.equal(readablePlatforms(['doubao'],records).length,1)
 assert.equal(readablePlatforms(['workbuddy'],records).length,0)
})
