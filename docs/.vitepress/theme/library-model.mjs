// Applications stay accessible through their existing documentation links.
export function resourceKind(article){
 if(article.libraryType==='workflow')return 'workflow'
 if(article.libraryType==='skill'&&['prompt','skill'].includes(article.format))return article.format
 return ''
}
