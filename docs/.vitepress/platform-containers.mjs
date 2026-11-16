import container from 'markdown-it-container'
import MarkdownIt from 'markdown-it'
// Parse containers as Markdown blocks: fenced examples must not become live platform tabs.
export function platformContainers(md){
 md.use(container,'platform',{validate:info=>/^platform\s+[-a-z0-9]+\s*$/.test(info.trim())})
 md.core.ruler.after('block','group-platforms',state=>{
  const tokens=state.tokens, blocks=[]
  for(let i=0;i<tokens.length;i++)if(tokens[i].type==='container_platform_open'){
   let depth=1,j=i+1;for(;j<tokens.length;j++){if(tokens[j].type==='container_platform_open')depth++;if(tokens[j].type==='container_platform_close'){depth--;if(depth===0)break} }
   // Closing depth is adjusted only for matching platform tokens.
   blocks.push({start:i,end:j,slug:tokens[i].info.trim().split(/\s+/)[1]});i=j
  }
  let group=0
  for(let i=0;i<blocks.length;){let end=i;while(end+1<blocks.length&&blocks[end].end+1===blocks[end+1].start)end++
   const subset=blocks.slice(i,end+1),slugs=subset.map(b=>b.slug)
   for(const [n,b] of subset.entries()){tokens[b.start].meta={slug:b.slug,slugs,group,first:n===0};tokens[b.end].meta={last:n===subset.length-1}}
   group++;i=end+1
  }
 })
 md.renderer.rules.container_platform_open=(tokens,i)=>{const m=tokens[i].meta;return (m.first?`<PlatformTabs :slugs='${JSON.stringify(m.slugs)}' group-id="platform-${m.group}">\n`:'')+`<template #${m.slug}>\n`}
 md.renderer.rules.container_platform_close=(tokens,i)=>'</template>\n'+(tokens[i].meta.last?'</PlatformTabs>\n':'')
}
export function platformBlocks(source){
 const md=new MarkdownIt({html:true});md.use(platformContainers);const tokens=md.parse(source,{}),lines=source.split('\n')
 return tokens.filter(t=>t.type==='container_platform_open').map(t=>({slug:t.info.trim().split(/\s+/)[1],start:t.map[0],end:t.map[1],content:lines.slice(t.map[0]+1,t.map[1]).join('\n').replace(/\n?\s*:::\s*$/,'').trim()}))
}
