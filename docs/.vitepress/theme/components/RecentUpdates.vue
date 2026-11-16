<script setup>
import {computed,ref} from 'vue'
import {withBase} from 'vitepress'
import {data as events} from '../../data/changelog.data'
const days=ref(0)
const list=computed(()=>events.filter(e=>!days.value||(Date.now()-Date.parse(e.date+'T00:00:00+08:00'))/86400000<=days.value))
</script><template><div class="updates"><div class="update-tabs"><button v-for="d in [0,7,30]" :key="d" :aria-pressed="days===d" @click="days=d">{{d?d+' 天内':'全部记录'}}</button></div><a v-for="e in list" :key="e.url+e.date+e.kind" :href="withBase(e.url)" class="update-row"><time>{{e.date}}</time><span class="update-kind">{{e.kind}}</span><strong>{{e.title}}</strong><span>↗</span></a><p v-if="!list.length" class="empty-state">这个时间范围内暂无内容更新。</p></div></template>
