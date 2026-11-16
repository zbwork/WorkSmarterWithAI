<script setup>
import {ref,computed} from 'vue'
import {withBase} from 'vitepress'
import {data as glossary} from '../../data/glossary.data'
const props=defineProps({id:{type:String,required:true}}),open=ref(false)
const term=computed(()=>glossary[props.id])
</script><template><span v-if="term" class="term" @mouseenter="open=true" @mouseleave="open=false" @focusin="open=true" @focusout="e=>{if(!e.currentTarget.contains(e.relatedTarget))open=false}" @keydown.esc="open=false"><button type="button" :aria-expanded="open" :aria-label="term.name+'：查看解释'" @click="open=true"><slot>{{term.name}}</slot></button><span v-if="open" class="term-tip" role="note">{{term.explanation}} <a :href="withBase('/glossary/#'+id)">术语表 →</a></span></span><span v-else><slot>{{id}}</slot></span></template>
