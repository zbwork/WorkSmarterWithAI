<script setup>
import {computed,ref,onMounted,onUnmounted,watch,nextTick} from 'vue'
import {useData,useRoute} from 'vitepress'
import {choosePlatform,readablePlatforms,platformStale} from '../content-model.mjs'
import {usePlatformPreference} from '../platform-preference'
const props=defineProps({slugs:{type:Array,required:true},groupId:{type:String,required:true}})
const {frontmatter}=useData(),route=useRoute(),{preferredPlatform,savePlatform}=usePlatformPreference()
const items=computed(()=>readablePlatforms(props.slugs,frontmatter.value.platforms))
const slugs=computed(()=>items.value.map(p=>p.slug))
const multiple=computed(()=>items.value.length>1)
const selected=ref(choosePlatform(slugs.value,'','')),tabButtons=ref([])
function sync(){selected.value=choosePlatform(slugs.value,new URLSearchParams(location.search).get('platform'),preferredPlatform.value)}
onMounted(()=>{sync();addEventListener('popstate',sync)})
onUnmounted(()=>removeEventListener('popstate',sync))
watch([()=>route.path,slugs,preferredPlatform],()=>{if(typeof window!=='undefined')sync()},{flush:'post'})
async function select(slug){
 selected.value=slug;savePlatform(slug)
 const url=new URL(location.href);url.searchParams.set('platform',slug)
 history.replaceState(history.state,'',url.pathname+url.search+url.hash)
 await nextTick()
 const button=tabButtons.value[slugs.value.indexOf(slug)]
 if(button){const list=button.parentElement;const left=button.offsetLeft;if(left<list.scrollLeft)list.scrollLeft=left;else if(left+button.offsetWidth>list.scrollLeft+list.clientWidth)list.scrollLeft=left+button.offsetWidth-list.clientWidth}
}
async function keydown(e,index){
 let target=index
 if(e.key==='ArrowRight')target=(index+1)%items.value.length
 else if(e.key==='ArrowLeft')target=(index-1+items.value.length)%items.value.length
 else if(e.key==='Home')target=0
 else if(e.key==='End')target=items.value.length-1
 else return
 e.preventDefault();await select(items.value[target].slug);tabButtons.value[target]?.focus()
}
</script>
<template>
  <section v-if="items.length" class="platform-tabs" :class="{'single-tool':!multiple}">
    <div v-if="multiple" role="tablist" aria-label="选择使用工具" class="platform-tab-list">
      <button v-for="(p,index) in items" :key="p.slug" :ref="el=>tabButtons[index]=el" role="tab" :id="groupId+'-tab-'+p.slug" :aria-controls="groupId+'-panel-'+p.slug" :aria-selected="selected===p.slug" :tabindex="selected===p.slug?0:-1" @click="select(p.slug)" @keydown="keydown($event,index)">{{p.name}}</button>
    </div>
    <div v-for="p in items" :key="p.slug" :role="multiple?'tabpanel':undefined" :id="groupId+'-panel-'+p.slug" :aria-labelledby="multiple?groupId+'-tab-'+p.slug:undefined" :hidden="multiple&&selected!==p.slug" :tabindex="multiple?0:undefined" class="platform-panel">
      <p v-if="platformStale(p.test)||p.test.status==='outdated'" class="tool-note">这份教程需要复测，工具界面可能已有变化。</p>
      <p v-else-if="p.test.status==='unverified'" class="tool-note">这份操作步骤还未实测。</p>
      <slot :name="p.slug" />
    </div>
  </section>
</template>
