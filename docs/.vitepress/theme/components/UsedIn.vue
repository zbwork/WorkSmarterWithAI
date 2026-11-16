<script setup>
import {computed} from 'vue'
import {useData,withBase} from 'vitepress'
import {data as articles} from '../../data/articles.data'
import {contentConfig as c} from '../../../../content.config'
import LevelBadge from './LevelBadge.vue'
const {page}=useData(),entry=computed(()=>articles.find(a=>a.url==='/'+page.value.relativePath.replace(/index\.md$/,'')))
</script><template><section><h2>用在哪些任务</h2><div v-if="entry?.usedIn?.length" class="used-in"><a v-for="a in entry.usedIn" :key="a.url" :href="withBase(a.url)"><strong>{{a.title}}</strong><span>{{c.scenarios.find(s=>s.id===a.scenarios?.[0]?.scenario)?.name}}</span><LevelBadge :level="a.difficulty"/></a></div><p v-else>目前还没有已发布的相关任务。</p></section></template>
