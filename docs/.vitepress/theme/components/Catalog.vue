<script setup>
import {computed,reactive,onMounted,onUnmounted,watch} from 'vue'
import {withBase} from 'vitepress'
import {data as articles} from '../../data/articles.data'
import {contentConfig as c} from '../../../../content.config'
import {filterArticles,queryFilters,filterQuery,availableOptions} from '../content-utils.mjs'
import ArticleCard from './ArticleCard.vue'
const filters=reactive({q:'',type:'',industry:''});let ready=false
const fields=[{key:'type',label:'想看哪类',options:Object.entries(c.types).map(([value,label])=>({value,label}))},{key:'industry',label:'你的工作',options:c.industries.map(i=>({value:i.name,label:i.name}))}]
const choices=computed(()=>fields.map(f=>({...f,options:availableOptions(articles,filters,f.key,f.options)})))
const results=computed(()=>filterArticles(articles,filters))
const active=computed(()=>Object.values(filters).some(Boolean))
function restore(){const f=queryFilters(location.search);for(const k of Object.keys(filters))filters[k]=f[k]||''}
onMounted(()=>{restore();ready=true;addEventListener('popstate',restore)})
onUnmounted(()=>removeEventListener('popstate',restore))
watch(filters,()=>{if(ready){const q=filterQuery(filters);history.replaceState(history.state,'',location.pathname+(q?'?'+q:''))}})
function reset(){for(const k of Object.keys(filters))filters[k]=''}
</script>
<template><div class="lesson-catalog wide-page"><h1>全部教程</h1><p class="intro">选一件现在想做的事。第一次用？<a :href="withBase('/start/')">从这里开始 →</a></p><label class="catalog-search"><input type="search" v-model="filters.q" placeholder="搜一个任务，比如：会议、评论、写文章" aria-label="搜索教程"></label><div class="simple-filters"><fieldset v-for="field in choices" :key="field.key"><legend>{{field.label}}</legend><div class="filter-options"><button :aria-pressed="!filters[field.key]" @click="filters[field.key]=''">全部</button><button v-for="option in field.options" :key="option.value" :aria-pressed="filters[field.key]===option.value" @click="filters[field.key]=filters[field.key]===option.value?'':option.value">{{option.label}}</button></div></fieldset></div><div class="result-summary" role="status"><span>{{results.length}} 篇教程</span><button v-if="active" @click="reset">清空筛选</button></div><div class="article-grid"><ArticleCard v-for="article in results" :key="article.url" :article="article" /></div><div v-if="!results.length" class="empty-state"><h2>还没找到这类教程</h2><p>换个词试试，或清空条件看看全部内容。</p><button class="primary-button" @click="reset">查看全部教程</button></div></div></template>
