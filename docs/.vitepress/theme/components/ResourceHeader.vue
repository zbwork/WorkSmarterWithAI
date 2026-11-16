<script setup>
import {computed} from 'vue'
import {useData,withBase} from 'vitepress'
import {contentConfig as c} from '../../../../content.config'
import {resourceKind} from '../library-model.mjs'
const {frontmatter:a}=useData()
const kind=computed(()=>c.libraryCategories.find(t=>t.id===resourceKind(a.value))?.name)
</script>
<template>
 <header class="resource-header">
  <a class="resource-back" :href="withBase('/library/')">← 返回技能库</a>
  <p class="resource-kind">{{kind}}</p>
  <h1>{{a.resourceTitle||a.name}}</h1>
  <p class="resource-lead">{{a.resourceDescription||a.description}}</p>
 </header>
 <div class="library-mobile-outline"></div>
</template>
