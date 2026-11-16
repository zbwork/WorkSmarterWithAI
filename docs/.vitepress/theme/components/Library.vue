<script setup>
import {computed,ref,onMounted,onUnmounted} from 'vue'
import {contentConfig as c} from '../../../../content.config'
import {data as articles} from '../../data/articles.data'
import ArticleCard from './ArticleCard.vue'
const type=ref(''),format=ref('');function sync(){const p=new URLSearchParams(location.search);type.value=p.get('type')||'';format.value=p.get('format')||''}onMounted(()=>{sync();addEventListener('popstate',sync)});onUnmounted(()=>removeEventListener('popstate',sync))
function clear(){type.value="";format.value="";history.replaceState(history.state,"",location.pathname)}
const groups=computed(()=>Object.entries(c.methodTypes).filter(([id])=>!type.value||id===type.value).map(([id,name])=>({name,items:articles.filter(a=>a.libraryType===id&&(!format.value||a.format===format.value))})).filter(g=>g.items.length))
</script><template><p>这里集中放着任务里用到的提示词、技能包和 AI 应用。每个条目都能找到对应的任务。</p><p v-if="type||format"><button @click="clear">查看全部技能库</button></p><section v-for="g in groups" :key="g.name"><h2>{{g.name}}</h2><div class="article-grid"><ArticleCard v-for="a in g.items" :key="a.url" :article="a"/></div></section><p v-if="!groups.length">这一类还没有收录，先看看已有条目。</p></template>
