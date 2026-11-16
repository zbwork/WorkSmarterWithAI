<script setup>
import {computed,reactive,ref,onMounted,onUnmounted,watch,nextTick} from 'vue'
import {useRoute} from 'vitepress'
import MiniSearch from '@handbook/minisearch'
import {data as serialized} from '../../data/search.data'
import {data as articles} from '../../data/articles.data'
import {searchOptions} from '../search-options.mjs'
import {filterArticles,queryFilters,filterQuery,availableOptions} from '../content-utils.mjs'
import {contentConfig as c} from '../../../../content.config'
import ArticleCard from './ArticleCard.vue'
const index=MiniSearch.loadJSON(serialized,searchOptions),f=reactive(queryFilters('')),ready=ref(false),expanded=ref(false),route=useRoute()
function restore(){Object.assign(f,queryFilters(location.search))}
onMounted(()=>{restore();ready.value=true;addEventListener('popstate',restore)});onUnmounted(()=>removeEventListener('popstate',restore));watch(()=>route.path,()=>{if(ready.value)restore()})
watch(f,()=>{if(ready.value){const query=filterQuery(f);history.replaceState(history.state,'',location.pathname+(query?'?'+query:''))}},{deep:true})
const matches=computed(()=>f.q.trim()?new Map(index.search(f.q).map((r,i)=>[r.id,i])):null)
const pool=computed(()=>matches.value?articles.filter(a=>matches.value.has(a.url)):articles)
const results=computed(()=>filterArticles(pool.value,{...f,q:''}).sort((a,b)=>matches.value?matches.value.get(a.url)-matches.value.get(b.url):0))
const definitions=[{key:'scenario',name:'场景',options:c.scenarios.map(s=>({value:s.id,label:s.name}))},{key:'tool',name:'工具',options:c.apps.map(p=>({value:p.slug,label:p.name}))},{key:'level',name:'级别',options:c.levels.map(l=>({value:l.name,label:l.name}))},{key:'type',name:'做法',options:Object.entries(c.methodTypes).map(([value,label])=>({value,label}))}]
const groups=computed(()=>definitions.map(g=>({...g,options:availableOptions(pool.value,{...f,q:''},g.key,g.options)})).filter(g=>g.options.length||f[g.key]))
function select(key,value){f[key]=value;if(key==='tool'&&f.level&&!filterArticles(pool.value,{...f,q:''}).length)f.level=''}
function clear(){Object.assign(f,queryFilters(''))}
function focusSearch(){nextTick(()=>document.getElementById('handbook-search')?.focus())}
</script><template><section class="search-page"><h1>找一件想做的事</h1><form class="main-search" role="search" @submit.prevent="focusSearch"><label class="sr-only" for="handbook-search">搜索全部内容</label><input id="handbook-search" v-model="f.q" type="search" placeholder="例如：会议、评论、访谈"><button type="submit">搜索</button></form><button class="search-filter-toggle" :aria-expanded="expanded" @click="expanded=!expanded">{{expanded?'收起筛选':'按场景、工具筛选'}}</button><div class="search-filters" :class="{expanded}"><fieldset v-for="g in groups" :key="g.key"><legend>{{g.name}}</legend><div class="filter-options"><button :aria-pressed="!f[g.key]" @click="select(g.key,'')">不限</button><button v-for="o in g.options" :key="o.value" :aria-pressed="f[g.key]===o.value" @click="select(g.key,o.value)">{{o.label}} <span>{{o.count}}</span></button></div></fieldset><div class="catalog-checks"><label><input v-model="f.verified" type="checkbox">只看已实测</label><label><input v-model="f.original" type="checkbox">只看自研</label><label v-if="f.draft"><input v-model="f.draft" type="checkbox">包含草稿</label></div></div><p class="search-count" aria-live="polite">找到 {{results.length}} 项内容 <button @click="clear">清除筛选</button></p><div class="article-grid"><ArticleCard v-for="a in results" :key="a.url" :article="a"/></div><p v-if="!results.length">没有找到。试试更短的关键词，或清除筛选。</p></section></template>
