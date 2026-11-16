<script setup>
import {computed} from 'vue'
import {withBase,useData} from 'vitepress'
import {data as articles} from '../../data/articles.data'
import {contentConfig as c} from '../../../../content.config'
import ArticleCard from './ArticleCard.vue'
const props=defineProps({type:String,industry:String,tool:String});const {page}=useData();const params=computed(()=>page.value.params||{})
const groups=computed(()=>Object.entries(c.kinds).map(([kind,label])=>({label,items:articles.filter(a=>a.status!=='deprecated'&&a.kind===kind&&(!props.type||a.type===props.type)&&(!(props.industry||params.value.industryName)||a.industry.includes(props.industry||params.value.industryName))&&(!(props.tool||params.value.toolName)||a.tools.includes(props.tool||params.value.toolName)))})).filter(g=>g.items.length))
</script><template><div class="article-list"><section v-for="group in groups" :key="group.label"><h2>{{group.label}} <span class="muted">{{group.items.length}}</span></h2><div class="article-grid"><ArticleCard v-for="a in group.items" :key="a.url" :article="a" /></div></section><div v-if="!groups.length" class="empty-state"><h2>这个专题，等一份好实践</h2><p>还没有发布相关内容。欢迎提交真实场景与测试记录。</p><a class="primary-button" :href="withBase('/contribute/')">贡献第一篇 →</a></div></div></template>
