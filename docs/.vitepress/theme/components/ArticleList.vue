<script setup>
import {computed} from 'vue'
import {data as articles} from '../../data/articles.data'
import {isListed} from '../content-model.mjs'
import ArticleCard from './ArticleCard.vue'
const props=defineProps({kind:String,contentType:String});const items=computed(()=>articles.filter(a=>isListed(a)&&(!props.kind||a.kind===props.kind)&&(!props.contentType||a.contentType===props.contentType)).sort((a,b)=>(a.lesson||99)-(b.lesson||99)))
</script><template><div class="article-grid"><ArticleCard v-for="a in items" :key="a.url" :article="a"/></div><p v-if="!items.length">目前还没有已发布的内容。</p></template>
