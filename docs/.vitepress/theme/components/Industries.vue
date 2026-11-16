<script setup>
import {computed} from 'vue'
import {withBase} from 'vitepress'
import {contentConfig as c} from '../../../../content.config'
import {data as articles} from '../../data/articles.data'
const available=computed(()=>c.industries.map(i=>({...i,count:articles.filter(a=>!a.draft&&a.status!=='deprecated'&&a.industry.includes(i.name)).length})).filter(i=>i.count))
</script><template><div class="industry-grid"><a v-for="i in available" :key="i.slug" :href="withBase('/industries/'+i.slug+'/')"><div><h2>{{i.name}}</h2><p>{{i.description}}</p><small>{{i.count}} 篇教程</small></div><span aria-hidden="true">→</span></a></div></template>
