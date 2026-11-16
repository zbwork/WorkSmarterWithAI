import {buildSearchIndex} from '../../../scripts/search-index.mjs'
export default {watch:['../../{tasks,start,library,reviews}/**/*.md','../../../skills/**/prompt.md','../../../content.config.ts'],load:buildSearchIndex}
