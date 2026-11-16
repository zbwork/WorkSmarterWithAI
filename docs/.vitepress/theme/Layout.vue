<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData, useRoute } from 'vitepress'
import { onMounted, onUnmounted, watch, nextTick } from 'vue'
import mediumZoom from 'medium-zoom'
import ArticleMeta from './components/ArticleMeta.vue'
const {frontmatter}=useData(); const route=useRoute(); let zoom
async function attach(){await nextTick();zoom?.detach();zoom=mediumZoom('.vp-doc img:not(.no-zoom)',{background:'var(--vp-c-bg)'})}
onMounted(attach);watch(()=>route.path,attach);onUnmounted(()=>zoom?.detach())
</script>
<template><DefaultTheme.Layout><template #doc-after><ArticleMeta v-if="frontmatter.type" /></template></DefaultTheme.Layout></template>
