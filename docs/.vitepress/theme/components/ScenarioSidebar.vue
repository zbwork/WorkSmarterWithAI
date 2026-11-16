<script setup>
import {computed,ref,onMounted,onUnmounted,nextTick,watch} from 'vue'
import {useData,useRoute,useRouter,withBase} from 'vitepress'
import {data as articles} from '../../data/articles.data'
import {contentConfig as c} from '../../../../content.config'
import {isListed} from '../content-model.mjs'
import {scenarioStages as buildStages,scenarioTarget as targetFor,visibleScenarioGroups} from '../scenario-navigation.mjs'
const {page,frontmatter}=useData(),route=useRoute(),router=useRouter()
const rows=computed(()=>articles.filter(isListed)),section=computed(()=>page.value.relativePath.split('/')[0])
const current=computed(()=>'/'+page.value.relativePath.replace(/index\.md$/,''))
const tasks=computed(()=>rows.value.filter(a=>a.contentType==='task'))
const scenarios=computed(()=>c.scenarios.filter(s=>tasks.value.some(a=>a.scenarios.some(r=>r.scenario===s.id))).sort((a,b)=>a.order-b.order))
const requested=ref('')
function sync(){requested.value=new URLSearchParams(location.search).get('scenario')||''}
onMounted(()=>{sync();window.addEventListener('popstate',sync)});watch(()=>route.path,sync)
onUnmounted(()=>window.removeEventListener('popstate',sync))
const selected=computed(()=>{
 const memberships=frontmatter.value.scenarios||[]
 const id=page.value.params?.id||(memberships.some(r=>r.scenario===requested.value)?requested.value:memberships[0]?.scenario)
 return scenarios.value.find(s=>s.id===id)
})
const stages=computed(()=>buildStages(selected.value,tasks.value))
const scenarioTarget=scenario=>withBase(targetFor(scenario,tasks.value))
// A Header switch may change only ?scenario for a shared article.
// Observe completed navigation as well as pathname changes.
let previousAfterRoute,afterRoute
onMounted(()=>{
 previousAfterRoute=router.onAfterRouteChange
 afterRoute=async href=>{await previousAfterRoute?.(href);sync()}
 router.onAfterRouteChange=afterRoute
})
onUnmounted(()=>{if(router.onAfterRouteChange===afterRoute)router.onAfterRouteChange=previousAfterRoute})
async function chooseScenario(event,scenario){
 // Preserve opening a link in a new tab/window.
 if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return
 event.preventDefault();closeSwitch()
 await router.go(scenarioTarget(scenario))
 // VitePress route.path excludes the query; shared tasks can keep the same path.
 sync()
 await nextTick()
 // The theme closes its drawer only on path changes. Use its existing backdrop
 // close handler for a query-only scenario change as well.
 if(document.querySelector('.VPSidebar.open'))document.querySelector('.VPBackdrop.backdrop')?.click()
}

const switchOpen=ref(false),switchRoot=ref(null),switchButton=ref(null)
const scenarioGroups=computed(()=>visibleScenarioGroups(c,tasks.value).map(g=>({label:g.name,items:g.items})))
function closeSwitch(restore=false){switchOpen.value=false;if(restore)switchButton.value?.focus()}
function outside(event){if(!switchRoot.value?.contains(event.target))closeSwitch()}
function leaveSwitch(event){if(!switchRoot.value?.contains(event.relatedTarget))closeSwitch()}
async function switchKeys(event){
 if(event.key==='Escape'&&switchOpen.value){event.preventDefault();event.stopPropagation();closeSwitch(true);return}
 if(!['ArrowDown','ArrowUp','Home','End'].includes(event.key))return
 event.preventDefault();switchOpen.value=true;await nextTick()
 const links=[...switchRoot.value.querySelectorAll('nav a')],index=links.indexOf(document.activeElement)
 const next=event.key==='Home'?0:event.key==='End'?links.length-1:event.key==='ArrowDown'?(index+1)%links.length:index<0?links.length-1:(index-1+links.length)%links.length
 links[next]?.focus()
}
onMounted(()=>document.addEventListener('pointerdown',outside))
onUnmounted(()=>document.removeEventListener('pointerdown',outside))
watch(()=>route.path,()=>closeSwitch())
const library=computed(()=>Object.entries(c.methodTypes).map(([type,name])=>({name,items:rows.value.filter(a=>a.libraryType===type)})).filter(g=>g.items.length))
</script>
<template>
 <div class="scenario-sidebar" :key="current">
  <template v-if="['tasks','scenarios'].includes(section)">
   <div ref="switchRoot" class="scenario-switch" @keydown="switchKeys" @focusout="leaveSwitch">
    <button ref="switchButton" type="button" class="scenario-switch-trigger" aria-label="切换场景" :aria-expanded="switchOpen" aria-controls="scenario-options" @click="switchOpen=!switchOpen">
     <span>{{selected?.name||'选择场景'}}</span><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg>
    </button>
    <nav v-if="switchOpen" id="scenario-options" class="scenario-options" aria-label="场景">
     <div v-for="(group,index) in scenarioGroups" :key="index" class="scenario-option-group">
      <p v-if="group.label">{{group.label}}</p>
      <a v-for="s in group.items" :key="s.id" :href="scenarioTarget(s)" :class="{selected:selected?.id===s.id}" :aria-current="selected?.id===s.id?'true':undefined" @click="chooseScenario($event,s)">
       <span>{{s.name}}</span><svg v-if="selected?.id===s.id" viewBox="0 0 16 16" aria-hidden="true"><path d="m3 8 3 3 7-7"/></svg>
      </a>
     </div>
    </nav>
   </div>
   <template v-for="stage in stages" :key="stage.slug">
    <details v-if="stages.length>1" open><summary><svg class="tree-chevron" viewBox="0 0 16 16" aria-hidden="true"><path d="m6 4 4 4-4 4"/></svg><span>{{stage.name}}</span></summary><a v-for="task in stage.tasks" :key="task.url" class="sidebar-task" :class="{active:current===task.url}" :aria-current="current===task.url?'page':undefined" :href="withBase(task.url)+'?scenario='+selected.id">{{task.title}}</a></details>
    <template v-else><a v-for="task in stage.tasks" :key="task.url" class="sidebar-task" :class="{active:current===task.url}" :aria-current="current===task.url?'page':undefined" :href="withBase(task.url)+'?scenario='+selected.id">{{task.title}}</a></template>
   </template>
  </template>
  <template v-else-if="section==='start'"><h2>新手入门</h2><a v-for="a in rows.filter(a=>a.contentType==='lesson').sort((a,b)=>a.lesson-b.lesson)" :key="a.url" class="sidebar-task" :class="{active:current===a.url}" :aria-current="current===a.url?'page':undefined" :href="withBase(a.url)">{{a.sidebarTitle||a.title}}</a></template>
  <template v-else-if="section==='library'"><section v-for="g in library" :key="g.name"><h2>{{g.name}}</h2><a v-for="a in g.items" :key="a.url" class="sidebar-task" :class="{active:current===a.url}" :aria-current="current===a.url?'page':undefined" :href="withBase(a.url)">{{a.title}}</a></section></template>
 </div>
</template>
