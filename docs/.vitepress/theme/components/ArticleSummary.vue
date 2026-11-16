<script setup>
import {computed} from 'vue'
import {useData,withBase} from 'vitepress'
import {deriveArticle,allPlatformsStale} from '../content-model.mjs'
import LevelBadge from './LevelBadge.vue'
import PlatformBadges from './PlatformBadges.vue'
const {frontmatter}=useData();const a=computed(()=>deriveArticle(frontmatter.value))
</script><template><p class="article-summary"><span>{{a.audience||'按步骤练习的读者'}}</span><span>{{a.time||a.duration}}</span><span>{{a.costNote||a.cost}}</span><LevelBadge :level="a.difficulty"/></p><PlatformBadges :platforms="a.platforms"/><p v-if="a.draft" class="draft-notice">草稿 · 技能包还未在两个平台实测通过。<a :href="withBase('/catalog/?draft=1')">查看草稿 →</a></p><p v-if="allPlatformsStale(a)" class="notice">这篇所有已实测平台都需要复测。</p><p v-if="a.sponsored" class="notice">合作说明：{{a.disclosure}}</p></template>
