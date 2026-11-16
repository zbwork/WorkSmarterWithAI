<script setup>
import {useData,withBase} from 'vitepress'
const {frontmatter:a}=useData()
</script>
<template><p v-if="a.draft" class="draft-notice">草稿 · 这份技能还没有实测通过。<a :href="withBase('/search/?draft=1')">查看草稿 →</a></p><p v-if="a.sponsored" class="notice">合作说明：{{a.disclosure}}</p></template>
