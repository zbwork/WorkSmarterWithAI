<script setup>
import {computed} from 'vue'
import {useData,withBase} from 'vitepress'
import {data as articles} from '../../data/articles.data'
import {contentConfig as c} from '../../../../content.config'
import {isListed} from '../content-model.mjs'
import LevelBadge from './LevelBadge.vue'
const {page,frontmatter}=useData(),rows=computed(()=>articles.filter(isListed)),section=computed(()=>page.value.relativePath.split('/')[0])
const current=computed(()=>'/'+page.value.relativePath.replace(/index\.md$/,''))
const tasks=computed(()=>rows.value.filter(a=>a.contentType==='task'))
const groups=computed(()=>['work','life'].map(id=>({id,name:id==='work'?'工作':'生活',scenarios:c.scenarios.filter(s=>(id==='life'?s.group==='life':s.group!=='life')&&tasks.value.some(a=>a.scenarios.some(r=>r.scenario===s.id))).map(s=>({...s,stages:(s.stages.length?s.stages:[{slug:'',name:''}]).map(stage=>({...stage,tasks:tasks.value.filter(a=>a.scenarios.some(r=>r.scenario===s.id&&(r.stage||'')===stage.slug))})).filter(g=>g.tasks.length)}))})).filter(g=>g.scenarios.length))
const openScenario=computed(()=>frontmatter.value.scenarios?.[0]?.scenario||page.value.params?.id)
const library=computed(()=>Object.entries(c.methodTypes).map(([type,name])=>({name,items:rows.value.filter(a=>a.libraryType===type)})).filter(g=>g.items.length))
</script>
<template><div class="scenario-sidebar" :key="current"><template v-if="['tasks','scenarios'].includes(section)"><section v-for="group in groups" :key="group.id"><h2>{{group.name}}</h2><details v-for="s in group.scenarios" :key="s.id" :open="openScenario===s.id"><summary>{{s.name}}</summary><a class="scenario-overview" :href="withBase('/scenarios/'+s.id+'/')">查看这个场景 →</a><div v-for="stage in s.stages" :key="stage.slug"><h3 v-if="stage.tasks.length>1">{{stage.name}}</h3><a v-for="task in stage.tasks" :key="task.url" class="sidebar-task" :class="{active:current===task.url}" :aria-current="current===task.url?'page':undefined" :href="withBase(task.url)"><span>{{task.title}}</span><LevelBadge :level="task.difficulty"/></a></div></details></section></template><template v-else-if="section==='start'"><h2>新手入门</h2><a v-for="a in rows.filter(a=>a.contentType==='lesson').sort((a,b)=>a.lesson-b.lesson)" :key="a.url" class="sidebar-task" :class="{active:current===a.url}" :aria-current="current===a.url?'page':undefined" :href="withBase(a.url)">{{a.lesson}}. {{a.title}}</a></template><template v-else-if="section==='library'"><section v-for="g in library" :key="g.name"><h2>{{g.name}}</h2><a v-for="a in g.items" :key="a.url" class="sidebar-task" :class="{active:current===a.url}" :aria-current="current===a.url?'page':undefined" :href="withBase(a.url)">{{a.title}}</a></section></template></div></template>
