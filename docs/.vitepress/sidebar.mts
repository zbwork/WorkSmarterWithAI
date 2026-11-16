// The native sidebar supplies the responsive drawer; ScenarioSidebar renders its data-driven contents.
export function makeSidebar(){return Object.fromEntries(['/tasks/','/scenarios/','/start/','/library/'].map(p=>[p,[{text:'目录',items:[]}]]))}
