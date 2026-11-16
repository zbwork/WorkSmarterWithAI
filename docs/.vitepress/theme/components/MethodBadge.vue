<script setup>
import {contentConfig as c} from '../../../../content.config'
defineProps({method:Object})
</script><template><span v-if="method" class="method-badge">{{c.methodTypes[method.type]}}<template v-if="method.format"> · {{c.formatLabels[method.format]}}</template></span></template>
