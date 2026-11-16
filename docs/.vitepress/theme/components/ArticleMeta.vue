<script setup>
import {computed,ref} from 'vue'
import {useData,withBase} from 'vitepress'
import {contentConfig as c} from '../../../../content.config'
import {deriveArticle} from '../content-model.mjs'
const {frontmatter,page}=useData(),a=computed(()=>deriveArticle(frontmatter.value)),copied=ref('复制全文')
const rawUrl=computed(()=>withBase('/raw/'+page.value.relativePath))
async function copy(){try{const r=await fetch(rawUrl.value);if(!r.ok)throw Error();await navigator.clipboard.writeText(await r.text());copied.value='全文已复制'}catch{copied.value='复制失败，请打开原文'}}
</script><template><footer class="article-meta article-details"><p>维护：<a :href="c.repo" target="_blank" rel="noopener">{{(a.authors||[c.author]).join('、')}}</a> · 更新 {{a.updated}}</p><details><summary>源文件与修改记录</summary><div class="article-actions"><button @click="copy">{{copied}}</button><a :href="rawUrl" target="_blank">查看 Markdown</a><a :href="c.repo+'/blob/main/docs/'+page.relativePath" target="_blank" rel="noopener">在 GitHub 查看</a></div></details></footer></template>
