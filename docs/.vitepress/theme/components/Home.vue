<script setup>
import {ref} from 'vue'
import {withBase,useRouter} from 'vitepress'
import TaskChips from './TaskChips.vue'
import ScenarioCards from './ScenarioCards.vue'
const q=ref(''),router=useRouter();function search(){router.go(withBase('/search/?q='+encodeURIComponent(q.value)))}
</script><template><main class="scenario-home"><section class="scenario-hero"><h1>你想用 AI 做什么？</h1><p>新手跟着做就会，懂行的人也有干货</p><form class="main-search" role="search" @submit.prevent="search"><label class="sr-only" for="home-search">搜索想做的事情</label><input id="home-search" v-model="q" type="search" placeholder="例如：整理会议记录、写文章、分析评论"><button type="submit">搜索</button></form><TaskChips/></section><a class="first-lesson lesson-strip" :href="withBase('/tasks/meeting-actions/')"><span><small>第一课 · 预计 3 分钟，不含登录</small><strong>把会议记录变成待办表</strong></span><span class="lesson-link">跟着做一次 →</span></a><a class="beginner-entry" :href="withBase('/start/')">第一次用 AI？从这里开始 →</a><ScenarioCards group="work"/><ScenarioCards group="life"/><a class="library-entry" :href="withBase('/library/')">已经会用了？去技能库 →</a></main></template>
