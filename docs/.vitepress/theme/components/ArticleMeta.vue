<script setup>
import {computed,ref} from 'vue'
import {useData,withBase} from 'vitepress'
import {contentConfig as c} from '../../../../content.config'
import {stale} from '../content-utils.mjs'
const {frontmatter:a,page}=useData();const copied=ref('复制全文')
const dateLabel=value=>value?String(value instanceof Date?value.toISOString():value).slice(0,10):''
const rawUrl=computed(()=>withBase('/raw/'+page.value.relativePath))
async function copy(){try{const r=await fetch(rawUrl.value);if(!r.ok)throw Error();await navigator.clipboard.writeText(await r.text());copied.value='全文已复制'}catch{copied.value='复制失败，请打开原文'}}
</script>
<template><footer class="article-meta article-details"><p v-if="a.status==='unverified'">这篇还没有实际试跑，先作为练习参考。</p><p v-else-if="a.status==='deprecated'">这篇已停止更新，请查看其他教程。</p><p v-else-if="a.status==='outdated'||stale(a)">这篇需要重新试跑，界面可能已有变化。</p><p v-else>已试跑 · {{dateLabel(a.verified)}} · {{a.version}}<span v-if="a.testNote">。{{a.testNote}}</span></p><p v-if="a.sponsored">合作说明：{{a.disclosure}}</p><p>维护：<a :href="c.repo" target="_blank" rel="noopener">{{(a.authors||[c.author]).join('、')}}</a> · 更新 {{dateLabel(a.updated)}}</p><details><summary>源文件与修改记录</summary><div class="article-actions"><button @click="copy">{{copied}}</button><a :href="rawUrl" target="_blank">查看 Markdown</a><a :href="c.repo+'/blob/main/docs/'+page.relativePath" target="_blank" rel="noopener">在 GitHub 查看</a></div></details></footer></template>
