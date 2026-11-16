<script setup>
import {computed} from 'vue'
import {contentConfig as c} from '../../../../content.config'
import {platformList,platformStatus,platformStale} from '../content-model.mjs'
const props=defineProps({platforms:Object})
const list=computed(()=>platformList.filter(p=>props.platforms?.[p.slug]).map(p=>({...p,test:props.platforms[p.slug],state:platformStatus(props.platforms[p.slug])})))
</script><template><span class="platform-badges"><span v-for="p in list" :key="p.slug" class="platform-badge" :class="p.state" :title="p.name+'：'+c.platformStatuses[p.state].label+(platformStale(p.test)?'，该工具 90 天未复测':'')"><span>{{p.name}}</span><span aria-hidden="true">{{c.platformStatuses[p.state].icon}}</span><span class="sr-only">{{c.platformStatuses[p.state].label}}</span></span></span></template>
