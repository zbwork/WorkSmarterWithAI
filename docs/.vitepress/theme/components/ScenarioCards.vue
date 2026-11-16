<script setup>
import {computed} from 'vue'
import {withBase} from 'vitepress'
import {contentConfig as c} from '../../../../content.config'
import {data as articles} from '../../data/articles.data'
import {visibleScenarioGroups,scenarioTarget} from '../scenario-navigation.mjs'
const props=defineProps({group:String})
const groups=computed(()=>visibleScenarioGroups(c,articles).filter(g=>!props.group||g.id===props.group))
</script>
<template><section v-for="g in groups" :key="g.id" class="scenario-cards"><h2 :id="g.id">{{g.name}}</h2><a v-for="s in g.items" :key="s.id" :href="withBase(scenarioTarget(s,articles))"><strong>{{s.name}}</strong><span>{{s.description}}</span><b aria-hidden="true">→</b></a></section></template>
