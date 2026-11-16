<script setup>
import {computed} from 'vue'
import {useData} from 'vitepress'
import {contentConfig as c} from '../../../../content.config'
const {frontmatter}=useData();const score=computed(()=>frontmatter.value.scores)
</script><template><table v-if="score"><thead><tr><th>维度</th><th>权重</th><th>评分 / 5</th></tr></thead><tbody><tr v-for="(weight,key) in c.ratingWeights" :key="key"><td>{{key}}</td><td>{{weight*100}}%</td><td>{{score[key]}}</td></tr><tr><th>加权总分</th><td>100%</td><th>{{frontmatter.rating}}</th></tr></tbody></table></template>
