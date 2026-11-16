<script setup>
import {useData} from 'vitepress'
const {frontmatter:a}=useData()
</script>
<template><p class="article-summary"><span>{{a.audience||'第一次用 AI 的人'}}</span><span>{{a.duration||'预计 3 分钟'}}</span><span>{{a.costNote||a.cost}}</span></p></template>
