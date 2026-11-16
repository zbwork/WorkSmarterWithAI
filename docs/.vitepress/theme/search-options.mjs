export const tokenize=text=>Array.from(new Intl.Segmenter('zh',{granularity:'word'}).segment(text.toLowerCase())).filter(s=>s.isWordLike).map(s=>s.segment)
export const searchOptions={fields:['title','description','body','tags','context'],storeFields:['url'],idField:'url',tokenize,searchOptions:{prefix:true,fuzzy:0.15,boost:{title:4,description:2},combineWith:'AND'}}
