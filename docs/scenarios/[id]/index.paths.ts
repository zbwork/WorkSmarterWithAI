import {readArticles} from '../../../scripts/content.mjs'
import {contentConfig as c} from '../../../content.config'
import {isListed} from '../../.vitepress/theme/content-model.mjs'
export default {paths(){const tasks=readArticles().filter(a=>a.contentType==='task'&&isListed(a));return c.scenarios.filter(s=>tasks.some(a=>a.scenarios.some(r=>r.scenario===s.id))).map(s=>({params:{id:s.id,title:s.name}}))}}
