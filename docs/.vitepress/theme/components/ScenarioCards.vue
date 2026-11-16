<script setup>
import {computed} from 'vue'
import {withBase} from 'vitepress'
import {contentConfig as c} from '../../../../content.config'
import {data as articles} from '../../data/articles.data'
import {isListed} from '../content-model.mjs'
const props=defineProps({group:String})
const items=computed(()=>c.scenarios.filter(s=>(!props.group||(props.group==='life'?s.group==='life':s.group!=='life'))&&articles.some(a=>a.contentType==='task'&&isListed(a)&&a.scenarios.some(r=>r.scenario===s.id))))
</script><template><section v-if="items.length" class="scenario-cards"><h2 v-if="group">{{group==='life'?'生活里用':'工作上用'}}</h2><a v-for="s in items" :key="s.id" :href="withBase('/scenarios/'+s.id+'/')"><strong>{{s.name}}</strong><span>{{s.description}}</span><b aria-hidden="true">→</b></a></section></template>
