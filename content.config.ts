export const contentConfig = {
  title: 'AI 提效指南',
  author: 'zbwork',
  repo: 'https://github.com/zbwork/WorkSmarterWithAI',
  industries: [
    { name: '通用', slug: 'general', description: '从日常工作里的一个小任务开始。', icon: '◎' },
    { name: '新媒体', slug: 'media', description: '选题、写作、内容复用与发布检查。', icon: '↗' },
    { name: '电商', slug: 'commerce', description: '理解用户反馈，整理商品与运营资料。', icon: '▤' },
    { name: '设计', slug: 'design', description: '整理需求、探索方案与交付作品。', icon: '◇' },
    { name: '教育', slug: 'education', description: '备课、练习设计与学习反馈。', icon: '⌘' },
    { name: '开发', slug: 'development', description: '代码、文档与可复用的自动化能力。', icon: '⌁' },
    { name: '行政人事', slug: 'operations', description: '会议、招聘与团队协作。', icon: '⊞' },
    { name: '法律', slug: 'legal', description: '资料整理与专业判断的辅助工具。', icon: '§' },
    { name: '财务', slug: 'finance', description: '表格整理、信息核对与报表辅助。', icon: '≋' },
    { name: '医疗', slug: 'healthcare', description: '信息整理与知识检索，保留专业复核。', icon: '+' }
  ],
  tools: ['DeepSeek', '通用对话 AI', 'Claude Code', 'Cursor', 'n8n', 'Dify', 'Coze', 'ComfyUI', '飞书', 'Python'],
  types: { skill: 'Skill（技能）', workflow: '工作流', app: 'AI 应用' },
  kinds: { guide: '教程', review: '评测', original: '自研' },
  levels: [
    {name:'入门', description:'会复制粘贴就行', prerequisites:'打开网页或客户端，点按钮、拖文件、复制粘贴', color:'#246b55', soft:'#eaf5ee', order:1, path:'/paths/beginner/', audience:'我刚开始用 AI'},
    {name:'进阶', description:'要装软件 / 会配置', prerequisites:'改造和组合现成技能，配置连接器，或在 Codex 中使用技能', color:'#2764b4', soft:'#eaf1fd', order:2, path:'/paths/intermediate/', audience:'我已经在用 AI'},
    {name:'高级', description:'要会命令行 / 写代码', prerequisites:'自己写技能、加脚本、跨平台适配、发布技能或编写 MCP', color:'#7850a5', soft:'#f2ecfa', order:3, path:'/paths/advanced/', audience:'我是开发者 / 从业者'}
  ],
  platforms: [
    {name:'豆包工作', slug:'doubao', mode:'图形界面', defaultLevel:'入门', website:'https://www.doubao.com/work', docs:'https://www.doubao.com/work/docs/zh-cn/articles/081010973544-skills', order:1, developer:false, guideAvailable:true},
    {name:'WorkBuddy', slug:'workbuddy', mode:'图形界面', defaultLevel:'入门', website:'https://www.workbuddy.cn/', docs:'https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Skills-Market', order:2, developer:false, guideAvailable:true},
    {name:'知办', slug:'zhiban', mode:'图形界面（待确认）', defaultLevel:'入门', website:'', docs:'', order:3, developer:false, guideAvailable:false},
    {name:'Codex', slug:'codex', mode:'命令行 / 客户端', defaultLevel:'进阶', website:'https://openai.com/codex/', docs:'https://developers.openai.com/codex/skills/', order:4, developer:true, guideAvailable:true}
  ],
  platformStatuses: {
    active:{label:'已实测',icon:'✓'}, unverified:{label:'待实测',icon:'⏳'}, planned:{label:'即将补充',icon:'◷'}, unsupported:{label:'暂不支持',icon:'—'}, outdated:{label:'待复测',icon:'↻'}
  },
  formatLabels: {prompt:'提示词',skill:'技能包',mcp:'MCP 连接'},
  platformPreferenceKey: 'worksmarter-platform',
  platformIssue: 'https://github.com/zbwork/WorkSmarterWithAI/issues/new?template=platform-test.yml',
  costs: ['免费额度内', '免费', '低', '中', '高', '按所用工具计费'],
  statuses: ['unverified', 'active', 'outdated', 'deprecated'],
  formats: ['skill', 'mcp', 'prompt'],
  ratingWeights: { 效果: 0.3, 易用: 0.2, 稳定: 0.2, 成本: 0.2, 生态: 0.1 }
}
