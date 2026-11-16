<script setup>
import {ref,computed} from 'vue'
import {data as prompts} from '../../data/prompts.data'
const props=defineProps({src:String,part:String,copyLabel:{type:String,default:'一键复制'}}),body=ref(null),message=ref('')
const source=computed(()=>props.src?(props.part?prompts[props.src]?.parts[props.part]:prompts[props.src]?.text):null)
async function copy(){try{await navigator.clipboard.writeText(source.value??body.value.innerText.trim());message.value='已复制，去 AI 对话框粘贴即可'}catch{message.value='复制未成功，请选中下面的文字手动复制'}}
</script>
<template><section class="prompt-box" aria-label="可以复制给 AI 的话"><div class="prompt-toolbar"><strong>复制这段话</strong><button @click="copy"><svg v-if="copyLabel!=='一键复制'" viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4"/></svg>{{copyLabel}}</button></div><div ref="body" class="prompt-body"><template v-if="source"><p v-for="(paragraph,i) in source.split(/\n\n+/)" :key="i" style="white-space:pre-wrap">{{paragraph}}</p></template><slot v-else /></div><p v-if="message" class="copy-feedback" role="status">{{message}}</p></section></template>
