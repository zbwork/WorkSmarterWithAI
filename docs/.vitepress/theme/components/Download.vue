<script setup>
import {computed} from 'vue'
import {withBase} from 'vitepress'
import {data as downloads} from '../../data/downloads.data'
const props=defineProps({file:{type:String,required:true}})
const item=computed(()=>downloads.find(d=>d.file===props.file))
</script><template><a class="download-button" v-if="item" :href="withBase(file)" download><span>↓ 下载 {{file.split('/').pop()}}</span><small>{{(item.bytes/1024).toFixed(1)}} KB · {{item.updated}}</small></a><p v-else class="notice">这个下载文件暂未发布。</p></template>
