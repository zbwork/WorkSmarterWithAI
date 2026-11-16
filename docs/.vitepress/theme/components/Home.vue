<script setup>
import {withBase} from 'vitepress'
import {data as articles} from '../../data/articles.data'
import {contentConfig as c} from '../../../../content.config'
import {isListed} from '../content-model.mjs'
import {visibleScenarioGroups,scenarioTarget} from '../scenario-navigation.mjs'
const tasks=articles.filter(a=>a.contentType==='task'&&isListed(a))
const groups=visibleScenarioGroups(c,tasks)
const featured=c.homeFeatured.map(slug=>tasks.find(a=>a.url===`/tasks/${slug}/`)).filter(Boolean)
</script>
<template>
  <main class="manual-home">
    <section class="manual-intro">
      <h1>把 AI 用在具体的事情上。</h1>
      <div class="manual-intro-bottom">
        <p>一本面向普通人的 AI 实用手册，跟着步骤，把事情做好。</p>
      </div>
    </section>
    <nav class="manual-directory" aria-label="按场景学习">
      <section v-for="group in groups" :key="group.id" class="directory-column" :aria-labelledby="'home-'+group.id">
        <h2 :id="'home-'+group.id" class="directory-group-title">{{group.name}}</h2>
        <a v-for="(s,index) in group.items" :key="s.id" class="directory-entry" :href="withBase(scenarioTarget(s,tasks))">
          <span class="directory-number" aria-hidden="true">{{String(index+1).padStart(2,'0')}}</span>
          <span><strong>{{s.name}}</strong><small>{{s.description}}</small></span>
          <svg class="directory-hand" viewBox="0 0 44 32" aria-hidden="true">
            <path d="M22 10H5a2 2 0 0 0 0 4h13a2 2 0 0 0 0 4h2a2 2 0 0 0 0 4h2a2 2 0 0 0 1 4l10 .5c5 0 7-1.5 7-5V13c0-2-1-3-3-3l-7-2.5c-3-1-5-3-8-2-2.5 1-3 3-.5 4.5Z" />
            <path class="hand-rays" d="M-5 5-8 2M-7 12h-5M-5 19-8 22" />
          </svg>
        </a>
        </section>
        <section v-if="featured.length" class="manual-featured" aria-labelledby="featured-heading">
          <h2 id="featured-heading">精选教程</h2>
          <a v-for="a in featured" :key="a.url" :href="withBase(a.url)"><span>{{a.title}}</span><span class="featured-arrow" aria-hidden="true">→</span></a>
        </section>
    </nav>
  </main>
</template>
