<script setup>
import {withBase} from 'vitepress'
import {statusText} from '../content-utils.mjs'
import {contentConfig as c} from '../../../../content.config'
defineProps({article:Object})
</script>
<template><a class="article-card" :href="withBase(article.url)"><div class="card-eyebrow"><span>{{c.types[article.type]}} <span class="dot">/</span> {{c.kinds[article.kind]}}</span><span class="status" :class="article.status">{{statusText(article)}}</span></div><h3>{{article.title}}<span class="card-arrow" aria-hidden="true">↗</span></h3><p>{{article.description}}</p><div class="card-tags"><span v-for="tag in article.industry" :key="tag">{{tag}}</span><span>{{article.difficulty}}</span><span>{{article.cost}}</span></div><div class="card-foot"><span>{{article.verified?'实测 '+article.verified:'更新 '+article.updated}}</span><span v-if="article.rating">{{article.rating.toFixed(1)}} / 5</span><span v-else>{{article.tools[0]}}</span></div></a></template>
