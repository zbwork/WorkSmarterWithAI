import { contentConfig } from '../../../content.config'
import { readArticles } from '../../../scripts/content.mjs'
export default {paths(){const articles=readArticles();return contentConfig.tools.filter(t=>articles.some(a=>!a.draft&&a.status!=='deprecated'&&a.tools.includes(t))).map(t=>({params:{tool:t.toLowerCase().replace(/ /g,'-'),toolName:t}}))}}
