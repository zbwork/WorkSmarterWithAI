<script setup>
import {withBase} from 'vitepress'
import {data as downloads} from '../../data/downloads.data'
import Download from './Download.vue'
</script><template><div class="download-list"><section v-for="d in downloads" :key="d.file"><h2>{{d.title}}</h2><p>{{d.description}}</p><Download :file="d.file"/><p class="muted">{{d.license}} · {{d.version}} · <a :href="withBase(d.article)">使用说明 →</a></p></section></div></template>
