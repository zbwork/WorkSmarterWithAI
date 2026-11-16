import { contentConfig } from '../../../content.config'
export default {paths(){return contentConfig.tools.map((t)=>({params:{tool:t.toLowerCase().replace(/ /g,'-'),toolName:t}}))}}
