<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData, useRoute, useRouter, withBase } from 'vitepress'
import { onMounted, onUnmounted, watch, nextTick } from 'vue'
import mediumZoom from 'medium-zoom'
import ScenarioSidebar from './components/ScenarioSidebar.vue'
import ArticleMeta from './components/ArticleMeta.vue'
import PageOutline from './components/PageOutline.vue'
import {contentConfig as c} from '../../../content.config'
const {frontmatter,isDark}=useData(); const route=useRoute(); let zoom;const router=useRouter()
async function shortcut(e){if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();await router.go(withBase('/search/'));await nextTick();document.getElementById('handbook-search')?.focus()}}
onMounted(()=>addEventListener('keydown',shortcut));onUnmounted(()=>removeEventListener('keydown',shortcut))
async function attach(){await nextTick();zoom?.detach();zoom=mediumZoom('.vp-doc img:not(.no-zoom)',{background:'var(--vp-c-bg)'})}
onMounted(attach);watch(()=>route.path,attach);onUnmounted(()=>zoom?.detach())
</script>
<template>
  <DefaultTheme.Layout>
    <template #nav-bar-title-after><span class="brand-caption">一份面向普通人的实用 AI 手册</span></template>
    <template #aside-top><PageOutline /></template>
    <template #sidebar-nav-before><ScenarioSidebar /></template>
    <template #nav-bar-content-after>
      <a class="handbook-search-link" :href="withBase('/search/')" aria-label="搜索手册"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6.5"/><path d="m15 15 5 5"/></svg><span>搜索教程</span></a>
      <a class="handbook-icon handbook-github" :href="c.repo" target="_blank" rel="noopener noreferrer" aria-label="GitHub 项目仓库（新窗口打开）" title="GitHub 项目仓库"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12 .75a11.25 11.25 0 0 0-3.558 21.923c.563.104.768-.244.768-.542 0-.267-.01-.975-.015-1.914-3.13.68-3.79-1.508-3.79-1.508-.512-1.3-1.25-1.646-1.25-1.646-1.022-.7.078-.685.078-.685 1.13.08 1.724 1.16 1.724 1.16 1.005 1.722 2.637 1.225 3.28.937.102-.728.393-1.225.715-1.507-2.498-.284-5.124-1.25-5.124-5.566 0-1.23.44-2.235 1.16-3.022-.117-.285-.503-1.43.11-2.98 0 0 .945-.302 3.094 1.154A10.786 10.786 0 0 1 12 6.176c.956.004 1.918.129 2.817.378 2.147-1.456 3.09-1.154 3.09-1.154.616 1.55.23 2.695.114 2.98.722.787 1.157 1.792 1.157 3.022 0 4.327-2.63 5.28-5.136 5.558.404.35.765 1.043.765 2.1 0 1.516-.014 2.738-.014 3.11 0 .3.202.65.774.54A11.252 11.252 0 0 0 12 .75Z" /></svg></a>
      <button class="handbook-icon handbook-appearance" type="button" :aria-label="isDark?'切换到浅色模式':'切换到深色模式'" :title="isDark?'切换到浅色模式':'切换到深色模式'" @click="isDark=!isDark"><span :class="isDark?'vpi-moon':'vpi-sun'" aria-hidden="true" /></button>
    </template>
    <template #doc-after><ArticleMeta v-if="frontmatter.contentType" /></template>
  </DefaultTheme.Layout>
</template>
