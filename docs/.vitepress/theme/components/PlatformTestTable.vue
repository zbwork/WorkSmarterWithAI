<script setup>
import {computed} from 'vue'
import {useData} from 'vitepress'
import {contentConfig as c} from '../../../../content.config'
import {platformList,platformStatus,deriveArticle} from '../content-model.mjs'
const {frontmatter}=useData();const article=computed(()=>deriveArticle(frontmatter.value))
const list=computed(()=>platformList.filter(p=>article.value.platforms?.[p.slug]).map(p=>({...p,test:article.value.platforms[p.slug]})))
</script><template><div v-if="list.length" class="platform-test-table"><table><thead><tr><th>平台</th><th>日期 / 版本</th><th>结果 / 次数</th><th>备注</th></tr></thead><tbody><tr v-for="p in list" :key="p.slug"><th>{{p.name}}</th><td>{{p.test.verified||'尚未实测'}}<br>{{p.test.version||'版本待记录'}}<small v-if="p.test.model">模型：{{p.test.model}}</small></td><td>{{p.test.result||c.platformStatuses[platformStatus(p.test)].label}}<br><span v-if="p.test.runs">{{p.test.runs}} 次 · 成功 {{p.test.successes??'待记录'}} 次</span></td><td>{{p.test.notes||p.test.reason||'等待补充真实截图和结果'}}<span v-if="p.test.input"><br>输入：{{p.test.input}}</span></td></tr></tbody></table></div><p v-else class="muted">概念说明，不包含平台运行结果。</p></template>
