<script setup>
import {computed} from 'vue'
import {useData,withBase} from 'vitepress'
import {deriveArticle,allPlatformsStale} from '../content-model.mjs'
import MethodBadge from './MethodBadge.vue'
import LevelBadge from './LevelBadge.vue'
import PlatformBadges from './PlatformBadges.vue'
const {frontmatter}=useData();const a=computed(()=>deriveArticle(frontmatter.value))
</script><template><p class="article-summary"><span>{{a.audience||'按步骤练习的读者'}}</span><span>{{a.time||a.duration}}</span><span>{{a.costNote||a.cost}}</span><LevelBadge :level="a.difficulty"/></p><MethodBadge :method="a.methods?.[0]||(a.libraryType?{type:a.libraryType,format:a.format}:null)"/><p v-if="a.status==='unverified'&&a.contentType!=='lesson'" class="muted">待实测 · 目前还没有完成这条做法的实际验证。</p><p v-if="a.draft" class="draft-notice">草稿 · 技能包尚未在任何工具实测通过，完成一次验证后再公开列出。<a :href="withBase('/search/?draft=1')">查看草稿 →</a></p><p v-if="allPlatformsStale(a)" class="notice">这篇所有已实测工具都需要复测。</p><p v-if="a.sponsored" class="notice">合作说明：{{a.disclosure}}</p></template>
