<script setup>
import {computed,ref,onMounted,onUnmounted} from 'vue'
import {withBase} from 'vitepress'
import {contentConfig as c} from '../../../../content.config'
import {data as articles} from '../../data/articles.data'
import {isListed} from '../content-model.mjs'
import {resourceKind} from '../library-model.mjs'
const resources=articles.filter(a=>isListed(a)&&resourceKind(a))
const categories=c.libraryCategories.filter(t=>resources.some(a=>resourceKind(a)===t.id))
const type=ref(''),query=ref('')
function sync(){
 const p=new URLSearchParams(location.search),legacy=p.get('format')||p.get('type')||''
 type.value=categories.some(t=>t.id===legacy)?legacy:'';query.value=p.get('q')||''
}
onMounted(()=>{sync();addEventListener('popstate',sync)});onUnmounted(()=>removeEventListener('popstate',sync))
function persist(){const url=new URL(location.href);url.searchParams.delete('format');for(const [key,value]of [['type',type.value],['q',query.value]])value?url.searchParams.set(key,value):url.searchParams.delete(key);history.replaceState(history.state,'',url.pathname+url.search+url.hash)}
function choose(id){type.value=id;persist()}
function clear(){type.value='';query.value='';persist()}
const visible=computed(()=>resources.filter(a=>(!type.value||resourceKind(a)===type.value)&&[a.resourceTitle||a.title,a.resourceDescription||a.description].join(' ').toLocaleLowerCase().includes(query.value.trim().toLocaleLowerCase())))
const label=a=>c.libraryCategories.find(t=>t.id===resourceKind(a))?.name
</script>
<template>
 <div class="resource-catalog">
  <p class="resource-catalog-intro">可直接复用的提示词、技能和工作流。</p>
  <div class="resource-toolbar">
   <div class="resource-filters" role="group" aria-label="资源类型">
    <button :aria-pressed="!type" @click="choose('')">全部</button>
    <button v-for="t in categories" :key="t.id" :aria-pressed="type===t.id" @click="choose(t.id)">{{t.name}}</button>
   </div>
   <label class="resource-search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6.5"/><path d="m15 15 5 5"/></svg><input v-model="query" type="search" aria-label="搜索资源" placeholder="搜索资源" @input="persist" /></label>
  </div>
  <div class="resource-list-label" aria-hidden="true"><span>资源</span><span>类型</span><span></span></div>
  <ul class="resource-list" aria-label="技能库资源">
   <li v-for="a in visible" :key="a.url">
    <a :href="withBase(a.url)" class="resource-row">
     <span class="resource-description"><strong>{{a.resourceTitle||a.title}}</strong><span>{{a.resourceDescription||a.description}}</span></span>
     <span class="resource-type">{{label(a)}}</span>
     <span class="resource-action" aria-hidden="true"><span>查看</span><span>→</span></span>
    </a>
   </li>
  </ul>
  <div v-if="!visible.length" class="resource-empty" role="status"><p>没有找到匹配的资源。</p><button @click="clear">清除筛选</button></div>
 </div>
</template>
