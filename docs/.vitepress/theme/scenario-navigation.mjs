import {isListed} from './content-model.mjs'

// Keep Header and sidebar destinations in the same order as the visible tree.
export function scenarioStages(scenario,articles){
 const tasks=articles.filter(a=>a.contentType==='task'&&isListed(a)).sort((a,b)=>(a.order||99)-(b.order||99))
 return (scenario?.stages.length?scenario.stages:[{slug:'',name:''}]).map(stage=>({...stage,tasks:tasks.filter(a=>a.scenarios.some(r=>r.scenario===scenario?.id&&(r.stage||'')===stage.slug))})).filter(g=>g.tasks.length)
}
export function scenarioTarget(scenario,articles){
 const first=scenarioStages(scenario,articles)[0]?.tasks[0]
 return first?first.url+'?scenario='+encodeURIComponent(scenario.id):'/scenarios/'+scenario.id+'/'
}

export function visibleScenarioGroups(config,articles){
 return [...config.scenarioGroups].sort((a,b)=>a.order-b.order).map(group=>({...group,items:config.scenarios.filter(s=>group.groups.includes(s.group)&&scenarioStages(s,articles).length).sort((a,b)=>a.order-b.order)})).filter(group=>group.items.length)
}
export function scenarioNavigation(config,articles){
 return visibleScenarioGroups(config,articles).map(group=>{
  const entry=s=>({text:s.name,link:scenarioTarget(s,articles)})
  const common=group.items.filter(s=>s.group==='office'),others=group.items.filter(s=>s.group!=='office')
  return {text:group.name,items:[...(common.length?[{items:common.map(entry)}]:[]),...(others.length?[{items:others.map(entry)}]:[]),{items:[{text:'全部场景 →',link:'/scenarios/#'+group.id}]}]}
 })
}
