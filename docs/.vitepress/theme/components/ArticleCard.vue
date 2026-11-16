<script setup>
import {withBase} from 'vitepress'
import {contentConfig as c} from '../../../../content.config'
defineProps({article:Object})
</script>
<template><a class="article-card" :href="withBase(article.url)"><div class="card-eyebrow"><span>{{c.types[article.type]}}</span><span v-if="article.status==='active'" class="tested-label">已试跑</span></div><h3>{{article.title}}<span class="card-arrow" aria-hidden="true">→</span></h3><p>{{article.description}}</p><div class="card-foot"><span>{{article.duration}}</span><span>{{article.tools[0]}}</span></div></a></template>
