<script setup>
import {computed,onMounted,onUnmounted,ref} from 'vue'
import {withBase,useData} from 'vitepress'
import {data as articles} from '../../data/articles.data'
import {filterArticles} from '../content-utils.mjs'
import {contentConfig as c} from '../../../../content.config'
import ArticleCard from './ArticleCard.vue'
const props=defineProps({type:String,industry:String,tool:String,level:String,platform:String});const {page}=useData();const params=computed(()=>page.value.params||{});const format=ref('')
function restore(){format.value=new URLSearchParams(location.search).get('format')||''}
onMounted(()=>{restore();addEventListener('popstate',restore)});onUnmounted(()=>removeEventListener('popstate',restore))
const items=computed(()=>filterArticles(articles,{type:props.type,industry:props.industry||params.value.industryName,tools:props.tool||params.value.toolName,level:props.level,platform:props.platform,format:format.value}))
const groups=computed(()=>props.type?c.levels.map(l=>({level:l,items:items.value.filter(a=>a.difficulty===l.name)})).filter(g=>g.items.length):[{level:null,items:items.value}])
</script><template><div class="article-list"><section v-for="group in groups" :key="group.level?.name||'all'"><h2 v-if="group.level">{{group.level.name}} <small>{{group.level.description}}</small></h2><div class="article-grid"><ArticleCard v-for="a in group.items" :key="a.url" :article="a" /></div></section><p v-if="!items.length">这里还没有教程，先看看<a :href="withBase('/catalog/')">全部教程 →</a></p></div></template>
