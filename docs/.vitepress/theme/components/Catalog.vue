<script setup>
import {computed,reactive,onMounted,onUnmounted,watch} from 'vue'
import {withBase} from 'vitepress'
import {data as articles} from '../../data/articles.data'
import {contentConfig as c} from '../../../../content.config'
import {filterArticles,queryFilters,filterQuery,availableOptions} from '../content-utils.mjs'
import {usePlatformPreference} from '../platform-preference'
const {preferredPlatform}=usePlatformPreference()
import ArticleCard from './ArticleCard.vue'
const filters=reactive(queryFilters(''));let ready=false
const options=o=>Object.entries(o).map(([value,label])=>({value,label}))
const fields=[{key:'platform',label:'你用哪个平台',options:c.platforms.map(p=>({value:p.slug,label:p.name}))},{key:'level',label:'需要会什么',options:c.levels.map(l=>({value:l.name,label:l.name+' · '+l.description}))},{key:'type',label:'内容',options:options(c.types)},{key:'industry',label:'你的工作',options:c.industries.map(i=>({value:i.name,label:i.name}))},{key:'kind',label:'形式',options:options(c.kinds)},{key:'cost',label:'费用',options:c.costs.map(value=>({value,label:value}))}]
const choices=computed(()=>fields.map(f=>({...f,options:availableOptions(articles,filters,f.key,f.options)})).filter(f=>f.options.length))
const results=computed(()=>filterArticles(articles,filters))
const active=computed(()=>Object.values(filters).some(Boolean))
function restore(){const f=queryFilters(location.search);if(!new URLSearchParams(location.search).has('platform')&&!location.search)f.platform=preferredPlatform.value;Object.assign(filters,f)}
onMounted(()=>{restore();ready=true;addEventListener('popstate',restore)})
onUnmounted(()=>removeEventListener('popstate',restore))
watch(filters,()=>{if(ready){const q=filterQuery(filters);history.replaceState(history.state,'',location.pathname+(q?'?'+q:''))}})
function reset(){Object.assign(filters,queryFilters(''))}
</script>
<template><div class="lesson-catalog wide-page"><h1>全部教程</h1><p class="intro">选一件现在想做的事。第一次用？<a :href="withBase('/start/')">从这里开始 →</a></p><label class="catalog-search"><input type="search" v-model="filters.q" placeholder="搜一个任务，比如：会议、评论、写文章" aria-label="搜索教程"></label><div class="simple-filters"><fieldset v-for="field in choices" :key="field.key"><legend>{{field.label}}</legend><div class="filter-options"><button :aria-pressed="!filters[field.key]" @click="filters[field.key]=''">全部</button><button v-for="option in field.options" :key="option.value" :aria-pressed="filters[field.key]===option.value" @click="filters[field.key]=filters[field.key]===option.value?'':option.value">{{option.label}} <span>{{option.count}}</span></button></div></fieldset></div><div class="catalog-checks"><label><input type="checkbox" v-model="filters.verified"> 只看已实测</label><label><input type="checkbox" v-model="filters.recent"> 最近 30 天更新</label><label><input type="checkbox" v-model="filters.original"> 只看自研</label><label v-if="filters.draft"><input type="checkbox" v-model="filters.draft"> 包含草稿</label></div><p v-if="filters.format" class="filter-note">格式：{{c.formatLabels[filters.format] || filters.format}} <button @click="filters.format=''">清除</button></p><div class="result-summary" role="status"><span>{{results.length}} 篇教程</span><button v-if="active" @click="reset">清空筛选</button></div><div class="article-grid"><ArticleCard v-for="article in results" :key="article.url" :article="article" /></div><div v-if="!results.length" class="empty-state"><h2>还没找到这类教程</h2><p>换个词试试，或清空条件看看全部内容。</p><button class="primary-button" @click="reset">查看全部教程</button></div></div></template>
