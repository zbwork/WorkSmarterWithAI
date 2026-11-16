<script setup>
import {ref} from 'vue'
const body=ref(null),message=ref('')
async function copy(){try{await navigator.clipboard.writeText(body.value.innerText.trim());message.value='已复制，去 AI 对话框粘贴即可'}catch{message.value='复制未成功，请选中下面的文字手动复制'}}
</script>
<template><section class="prompt-box" aria-label="可以复制给 AI 的话"><div class="prompt-toolbar"><strong>复制这段话</strong><button @click="copy">一键复制</button></div><div ref="body" class="prompt-body"><slot /></div><p v-if="message" class="copy-feedback" role="status">{{message}}</p></section></template>
