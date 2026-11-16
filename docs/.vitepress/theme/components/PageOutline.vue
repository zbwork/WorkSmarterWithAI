<script setup>
import {ref,onMounted,onUnmounted,nextTick} from 'vue'
import {onContentUpdated,useData} from 'vitepress'
const {frontmatter}=useData()
const headings=ref([]),active=ref(''),mobileTarget=ref(''),expanded=ref(false),mobileMenu=ref(null)
let observer,frame=0,root,alive=false
function updateActive(){
 frame=0
 const list=headings.value
 let id=list[0]?.id||''
 for(const h of list){if(document.getElementById(h.id)?.getBoundingClientRect().top<=150)id=h.id;else break}
 active.value=id
}
function onScroll(){if(!frame)frame=requestAnimationFrame(updateActive)}
function collect(){
 if(!alive)return
 const target=frontmatter.value.pageClass==='library-resource'?'.library-mobile-outline':'.VPLocalNav .container'
 mobileTarget.value=document.querySelector(target)?target:''
 headings.value=frontmatter.value.outline===false?[]:[...document.querySelectorAll('.vp-doc h2,.vp-doc h3')].filter(el=>el.getClientRects().length&&!el.closest('[hidden],a,.article-card')&&!el.classList.contains('ignore-header')).map((el,index)=>{
  if(!el.id)el.id='section-'+index
  const copy=el.cloneNode(true);copy.querySelectorAll('.header-anchor,.ignore-header').forEach(n=>n.remove())
  return {id:el.id,title:copy.textContent.trim(),level:el.tagName==='H3'?3:2}
 })
 updateActive()
}
async function attach(){
 await nextTick();if(!alive)return
 expanded.value=false;observer?.disconnect();root=document.querySelector('.vp-doc');collect()
 if(root){observer=new MutationObserver(collect);observer.observe(root,{subtree:true,childList:true,attributes:true,attributeFilter:['hidden','open']})}
}
function closeOutside(event){if(expanded.value&&!mobileMenu.value?.contains(event.target))expanded.value=false}
function closeEscape(event){if(event.key==='Escape'&&expanded.value){expanded.value=false;mobileMenu.value?.querySelector('button')?.focus()}}
function jump(){expanded.value=false}
onMounted(()=>{alive=true;attach();addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',collect);document.addEventListener('click',closeOutside);document.addEventListener('keydown',closeEscape)})
onContentUpdated(attach)
onUnmounted(()=>{alive=false;observer?.disconnect();cancelAnimationFrame(frame);removeEventListener('scroll',onScroll);removeEventListener('resize',collect);document.removeEventListener('click',closeOutside);document.removeEventListener('keydown',closeEscape)})
</script>
<template>
 <nav v-if="headings.length" class="manual-outline" aria-label="本页目录"><h2>本页目录</h2><a v-for="h in headings" :key="h.id" :href="'#'+h.id" :class="{active:active===h.id,nested:h.level===3}" :aria-current="active===h.id?'location':undefined">{{h.title}}</a></nav>
 <Teleport v-if="mobileTarget&&headings.length" :to="mobileTarget"><div ref="mobileMenu" class="manual-outline-mobile"><button type="button" :aria-expanded="expanded" aria-controls="mobile-page-outline" @click="expanded=!expanded">本页目录 <span aria-hidden="true">⌄</span></button><nav v-if="expanded" id="mobile-page-outline" aria-label="本页目录"><a v-for="h in headings" :key="h.id" :href="'#'+h.id" :class="{active:active===h.id,nested:h.level===3}" :aria-current="active===h.id?'location':undefined" @click="jump">{{h.title}}</a></nav></div></Teleport>
</template>
