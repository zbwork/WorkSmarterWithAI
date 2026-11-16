<script setup>
import {computed} from 'vue'
import {useData} from 'vitepress'
import {contentConfig as c} from '../../../../content.config'
import {data as articles} from '../../data/articles.data'
import {isListed} from '../content-model.mjs'
import ArticleCard from './ArticleCard.vue'
const {page}=useData(),scenario=computed(()=>c.scenarios.find(s=>s.id===page.value.params?.id)),tasks=computed(()=>articles.filter(a=>a.contentType==='task'&&isListed(a)&&a.scenarios.some(r=>r.scenario===scenario.value?.id)))
const stages=computed(()=>(scenario.value?.stages.length?scenario.value.stages:[{slug:'',name:'可以做的事'}]).map(s=>({...s,tasks:tasks.value.filter(a=>a.scenarios.some(r=>r.scenario===scenario.value?.id&&(r.stage||'')===s.slug))})).filter(g=>g.tasks.length))
const resources=computed(()=>articles.filter(a=>a.libraryType&&tasks.value.some(t=>t.methods.some(m=>m.use===a.id&&m.type===a.libraryType))))
</script><template><template v-if="scenario"><h1>{{scenario.name}}</h1><p>{{scenario.description}}</p><section v-for="s in stages" :key="s.slug"><h2>{{s.name}}</h2><div class="article-grid"><ArticleCard v-for="a in s.tasks" :key="a.url" :article="a"/></div></section><section v-if="resources.length"><h2>这个场景常用的技能</h2><div class="article-grid"><ArticleCard v-for="a in resources" :key="a.url" :article="a"/></div></section></template></template>
