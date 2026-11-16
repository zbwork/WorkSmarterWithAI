<script setup>
import {computed} from 'vue'
import {withBase,useData} from 'vitepress'
import {data as articles} from '../../data/articles.data'
import ArticleCard from './ArticleCard.vue'
const props=defineProps({type:String,industry:String,tool:String});const {page}=useData();const params=computed(()=>page.value.params||{})
const items=computed(()=>articles.filter(a=>a.status!=='deprecated'&&(!props.type||a.type===props.type)&&(!(props.industry||params.value.industryName)||a.industry.includes(props.industry||params.value.industryName))&&(!(props.tool||params.value.toolName)||a.tools.includes(props.tool||params.value.toolName))))
</script><template><div class="article-list"><div class="article-grid"><ArticleCard v-for="a in items" :key="a.url" :article="a" /></div><p v-if="!items.length">这里还没有教程，先看看<a :href="withBase('/catalog/')">全部教程 →</a></p></div></template>
