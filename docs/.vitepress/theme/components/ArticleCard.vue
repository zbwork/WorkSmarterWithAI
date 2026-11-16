<script setup>
import {withBase} from 'vitepress'
import {contentConfig as c} from '../../../../content.config'
import LevelBadge from './LevelBadge.vue'
import PlatformBadges from './PlatformBadges.vue'
defineProps({article:Object})
</script><template><a class="article-card" :href="withBase(article.url)"><div class="card-eyebrow"><span>{{c.types[article.type]}}<span v-if="article.format"> · {{c.formatLabels[article.format]}}</span></span><span v-if="article.draft">草稿</span><LevelBadge :level="article.difficulty"/></div><h3>{{article.title}}<span class="card-arrow" aria-hidden="true">→</span></h3><p>{{article.description}}</p><PlatformBadges :platforms="article.platforms"/><div class="card-foot"><span>{{article.time||article.duration}}</span><span>{{article.costNote||article.cost}}</span></div></a></template>
