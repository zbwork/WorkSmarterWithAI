<script setup>
import {withBase} from 'vitepress'
import LevelBadge from './LevelBadge.vue'
import MethodBadge from './MethodBadge.vue'
import PlatformBadges from './PlatformBadges.vue'
defineProps({article:Object})
</script><template><a class="article-card" :href="withBase(article.url)"><div class="card-eyebrow"><MethodBadge :method="article.methods?.[0]||(article.libraryType?{type:article.libraryType,format:article.format}:null)"/><span v-if="article.lesson">新手课 {{article.lesson}}</span><span v-if="article.draft">草稿</span><span v-if="article.original">自研</span><LevelBadge :level="article.difficulty"/></div><h3>{{article.title}} <span class="card-arrow" aria-hidden="true">→</span></h3><p>{{article.description}}</p><PlatformBadges :platforms="article.platforms"/><div class="card-foot"><span>{{article.time||article.duration}}</span><span v-if="article.libraryType">用在 {{article.usedIn?.length||0}} 个任务</span></div></a></template>
