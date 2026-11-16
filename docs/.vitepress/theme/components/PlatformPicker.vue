<script setup>
import {computed} from 'vue'
import {withBase} from 'vitepress'
import {platformList} from '../content-model.mjs'
import {usePlatformPreference} from '../platform-preference'
const {preferredPlatform,savePlatform}=usePlatformPreference()
const current=computed(()=>platformList.find(p=>p.slug===preferredPlatform.value))
</script><template><section class="platform-picker"><h2>你用哪个工具？</h2><div class="platform-options"><button v-for="p in platformList" :key="p.slug" :aria-pressed="preferredPlatform===p.slug" @click="savePlatform(p.slug)">{{p.name}}<small v-if="p.developer">开发者</small><span v-if="preferredPlatform===p.slug" aria-hidden="true">✓</span></button></div><div class="picker-footer"><a :href="withBase('/platforms/')">还没有，帮我选 →</a><span v-if="current" role="status">当前选择：{{current.name}} · 可随时更换</span></div></section></template>
