<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData, useRoute, useRouter, withBase } from 'vitepress'
import { onMounted, onUnmounted, watch, nextTick } from 'vue'
import mediumZoom from 'medium-zoom'
import ScenarioSidebar from './components/ScenarioSidebar.vue'
import ArticleMeta from './components/ArticleMeta.vue'
const {frontmatter}=useData(); const route=useRoute(); let zoom;const router=useRouter()
async function shortcut(e){if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();await router.go(withBase('/search/'));await nextTick();document.getElementById('handbook-search')?.focus()}}
onMounted(()=>addEventListener('keydown',shortcut));onUnmounted(()=>removeEventListener('keydown',shortcut))
async function attach(){await nextTick();zoom?.detach();zoom=mediumZoom('.vp-doc img:not(.no-zoom)',{background:'var(--vp-c-bg)'})}
onMounted(attach);watch(()=>route.path,attach);onUnmounted(()=>zoom?.detach())
</script>
<template><DefaultTheme.Layout><template #sidebar-nav-before><ScenarioSidebar /></template><template #nav-bar-content-after><a class="mobile-search-link" :href="withBase('/search/')" aria-label="搜索手册"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><circle cx="10" cy="10" r="6.5"/><path d="m15 15 5 5"/></svg></a></template><template #doc-after><ArticleMeta v-if="frontmatter.contentType" /></template></DefaultTheme.Layout></template>
