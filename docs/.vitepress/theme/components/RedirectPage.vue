<script setup>
import {onMounted} from 'vue'
import {useData,withBase} from 'vitepress'
const {frontmatter}=useData()
onMounted(()=>{const target=new URL(withBase(frontmatter.value.redirectTo),location.origin);for(const [key,value]of new URLSearchParams(location.search))if(!target.searchParams.has(key))target.searchParams.append(key,value);target.hash=location.hash;location.replace(target.href)})
</script><template><p>正在打开新的页面。<a :href="withBase(frontmatter.redirectTo)">点这里继续 →</a></p></template>
