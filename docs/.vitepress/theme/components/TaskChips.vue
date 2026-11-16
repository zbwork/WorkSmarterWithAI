<script setup>
import {withBase} from 'vitepress'
import {data as articles} from '../../data/articles.data'
import {isListed} from '../content-model.mjs'
const tasks=articles.filter(a=>a.contentType==='task'&&a.featured&&isListed(a))
</script><template><div class="task-chips"><span>常用任务</span><a v-for="a in tasks" :key="a.url" :href="withBase(a.url)">{{a.title}}</a></div></template>
