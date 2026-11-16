<script setup>
import {computed} from 'vue'
import {contentConfig as c} from '../../../../content.config'
const props=defineProps({slug:String})
const platform=computed(()=>c.apps.find(p=>p.slug===props.slug))
</script><template>{{platform?.name||slug}}</template>
