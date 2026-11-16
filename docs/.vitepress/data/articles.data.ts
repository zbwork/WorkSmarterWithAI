import {readArticles} from '../../../scripts/content.mjs'
export default {watch:['../../{tasks,start,library,reviews}/**/*.md','../../../content.config.ts'],load(){return readArticles().map(({body,raw,file,...a})=>a).sort((a,b)=>(a.order||99)-(b.order||99))}}
