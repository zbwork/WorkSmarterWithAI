<script setup>
import {computed} from 'vue'
import {contentConfig as c} from '../../../../content.config'
const props=defineProps({level:String})
const item=computed(()=>c.levels.find(l=>l.name===props.level))
</script><template><span v-if="item" class="level-badge" :style="{'--level-color':item.color,'--level-soft':item.soft}" :title="item.prerequisites">{{item.name}}<span class="sr-only">：{{item.description}}</span></span></template>
