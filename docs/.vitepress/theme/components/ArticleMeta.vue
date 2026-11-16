<script setup>
import {computed,ref} from 'vue'
import {useData,withBase} from 'vitepress'
import {contentConfig as c} from '../../../../content.config'
import {statusText,stale} from '../content-utils.mjs'
const {frontmatter:a,page}=useData();const copied=ref('复制 Markdown')
const rawUrl=computed(()=>withBase('/raw/'+page.value.relativePath))
async function copy(){try{const r=await fetch(rawUrl.value);if(!r.ok)throw Error();await navigator.clipboard.writeText(await r.text());copied.value='已复制'}catch{copied.value='复制失败，请打开原文'}}
</script><template><div class="article-meta"><div class="article-breadcrumb">{{c.types[a.type]}} <span>/</span> {{c.kinds[a.kind]}} <span>/</span> {{a.industry.join(' · ')}}</div><div class="meta-line"><span>{{a.difficulty}}</span><span>{{a.cost}}</span><span>{{statusText(a)}}</span><span v-if="a.verified">实测 {{a.verified}}</span><span v-else>尚未完成工具端实测</span></div><p v-if="a.version" class="version-line">测试环境：{{a.version}}</p><div v-if="a.status==='unverified'" class="notice">方法示例 · 尚未完成工具端实测，不包含效果或兼容性保证。</div><div v-else-if="a.status==='deprecated'" class="notice">该内容已停止维护，保留此页供历史查阅。</div><div v-else-if="a.status==='outdated'||stale(a)" class="notice">{{stale(a)?'超过 90 天未复测':'内容已标记待复测'}}，操作和费用可能已变化。</div><div v-if="a.sponsored" class="notice">商业合作披露：{{a.disclosure}}</div><div class="article-actions"><button @click="copy">{{copied}}</button><a :href="rawUrl" target="_blank">Markdown 原文 ↗</a><a :href="c.repo+'/blob/main/docs/'+page.relativePath" target="_blank" rel="noopener">GitHub ↗</a></div><p v-if="a.authors?.length" class="muted">作者：{{a.authors.join('、')}}</p></div></template>
