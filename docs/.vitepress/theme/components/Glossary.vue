<script setup>
import {data as glossary} from '../../data/glossary.data'
</script><template><section v-for="(term,id) in glossary" :key="id" :id="id" class="glossary-entry"><h2>{{term.name}}</h2><p>{{term.explanation}}</p><a :href="term.link" target="_blank" rel="noopener">延伸阅读 →</a></section></template>
