<script setup>
import {computed} from 'vue'
import {withBase} from 'vitepress'
import {data as articles} from '../../data/articles.data'
import {contentConfig as c} from '../../../../content.config'
import {usePlatformPreference} from '../platform-preference'
import {filterArticles} from '../content-utils.mjs'
import {isListed} from '../content-model.mjs'
import PlatformPicker from './PlatformPicker.vue'
import ArticleCard from './ArticleCard.vue'
const {preferredPlatform}=usePlatformPreference()
const lessons=computed(()=>filterArticles(articles,{platform:preferredPlatform.value}))
const industries=computed(()=>c.industries.filter(i=>articles.some(a=>isListed(a)&&a.industry.includes(i.name))))
</script>
<template><div class="handbook-home beginner-home"><section class="home-hero"><div class="hero-inner"><p class="eyebrow">一本持续更新的 AI 工作手册</p><h1>AI 提效指南<span>从一件小事开始，<br>跟着做，就会了。</span></h1><p class="hero-description">新手跟着做就会，懂行的人也有干货。<br>选一个任务，照着步骤，做出自己的结果。</p><div class="hero-actions"><a class="primary-button" :href="withBase('/start/')">第一次用？从这里开始 →</a><a class="text-button" :href="withBase('/catalog/')">查看全部教程 →</a></div></div><a class="first-lesson" :href="withBase('/workflows/meeting-actions/')"><p>第一课 · 预计 3 分钟（不含登录）</p><h2>把几句会议记录，<br>变成一张待办表。</h2><div class="mini-example"><span>“小林：报名表我来整理，周四前给大家。”</span><span class="example-arrow">↓</span><strong>整理报名表 · 小林 · 周四前</strong></div><span class="lesson-link">跟着做一次 →</span></a></section>
<section class="home-section reader-choices"><h2>你现在是？</h2><div class="reader-paths"><a v-for="level in c.levels" :key="level.name" :href="withBase(level.order===1?'/start/':level.path)"><strong>{{level.audience}}</strong><span>{{level.description}} →</span></a></div><PlatformPicker /></section><section class="home-section"><div class="section-heading"><h2>你今天想做什么？</h2><a :href="withBase('/catalog/')">全部教程 →</a></div><div class="article-grid"><ArticleCard v-for="article in lessons" :key="article.url" :article="article" /></div><p v-if="!lessons.length" class="muted">这个平台的教程还在补测中，先看看<a :href="withBase('/platforms/')">平台入门说明</a>。</p></section>
<section class="home-section"><div class="section-heading"><h2>按自己的工作找</h2></div><div class="industry-links"><a v-for="i in industries" :key="i.slug" :href="withBase('/industries/'+i.slug+'/')">{{i.name}}<span aria-hidden="true">→</span></a></div></section>
<section class="contribute-strip"><div><h2>遇到卡住的地方？</h2><p>告诉我们卡在哪一步，一起把它写明白。</p></div><a class="text-button" :href="withBase('/contribute/')">反馈问题 →</a></section></div></template>
