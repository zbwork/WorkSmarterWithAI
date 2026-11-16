<script setup>
import {withBase} from 'vitepress'
import {contentConfig as c} from '../../../../content.config'
import {data as articles} from '../../data/articles.data'
</script><template><div class="industry-grid"><a v-for="i in c.industries" :key="i.slug" :href="withBase('/industries/'+i.slug+'/')"><span class="industry-icon">{{i.icon}}</span><div><h2>{{i.name}}</h2><p>{{i.description}}</p><small>{{articles.filter(a=>a.status!=='deprecated'&&a.industry.includes(i.name)).length}} 篇内容</small></div><span>↗</span></a></div></template>
