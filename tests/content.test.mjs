import test from 'node:test'
import assert from 'node:assert/strict'
import {validateArticle,readArticles,validDate} from '../scripts/content.mjs'
import {filterArticles,queryFilters,filterQuery,stale} from '../docs/.vitepress/theme/content-utils.mjs'
const articles=readArticles()
test('已实测文章不能没有证据，未来和无效日期被拒绝',()=>{const a={...articles[0],status:'active',verified:null};assert.ok(validateArticle(a).some(e=>e.includes('verified')));assert.equal(validDate('2026-02-30'),false);assert.ok(validateArticle({...a,verified:'2099-01-01',version:'x'}).some(e=>e.includes('verified 日期')))})
test('未实测评测不能获得分数',()=>{assert.ok(validateArticle({...articles[0],kind:'review',rating:5}).some(e=>e.includes('未实测')))})
test('筛选按交集工作，保留不同类型且默认隐藏停用内容',()=>{const fixtures=[{...articles[0],title:'任务甲',type:'skill',industry:['法律'],status:'active'},{...articles[0],title:'任务乙',type:'workflow',industry:['法律'],status:'active'},{...articles[0],title:'任务丙',type:'skill',industry:['法律'],status:'deprecated'}];assert.deepEqual(filterArticles(fixtures,{type:'skill',industry:'法律'}).map(a=>a.title),['任务甲']);assert.equal(filterArticles(fixtures,{archived:true}).length,3);assert.equal(filterArticles(fixtures,{q:'不存在'}).length,0)})
test('分享链接往返保留中文、空格和布尔选项',()=>{const f=queryFilters('?industry=新媒体&tools=Claude+Code&recent=1&q=会议');assert.deepEqual(queryFilters(filterQuery(f)),f);assert.equal(queryFilters('?recent=0').recent,false)})
test('90 天临界值和缺少日期不误标过期',()=>{const a={verified:'2026-01-01'};assert.equal(stale(a,new Date('2026-04-01T00:00:00+08:00')),false);assert.equal(stale(a,new Date('2026-04-02T00:00:00+08:00')),true);assert.equal(stale({verified:null}),false)})
test('手册初始内容通过字段校验',()=>{assert.ok(articles.length>=6);for(const a of articles)assert.deepEqual(validateArticle(a),[],a.file)})
