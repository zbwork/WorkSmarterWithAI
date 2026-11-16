<script setup>
import {ref,onMounted} from 'vue'
import {withBase} from 'vitepress'
defineProps({src:{type:String,required:true},poster:String,title:{type:String,default:'操作演示'}})
const autoplay=ref(false);onMounted(()=>{autoplay.value=!matchMedia('(prefers-reduced-motion: reduce)').matches})
</script><template><figure><video :src="src.startsWith('/')?withBase(src):src" :poster="poster" :aria-label="title" :autoplay="autoplay" muted loop playsinline controls preload="none" style="width:100%;border-radius:8px"></video><figcaption>{{title}}</figcaption></figure></template>
