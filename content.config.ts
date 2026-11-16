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
  tools: ['豆包', 'DeepSeek', '通用对话 AI', 'Claude Code', 'Codex', 'Cursor', 'n8n', 'Dify', 'Coze', 'ComfyUI', '飞书', 'Python'],
  types: { prompt: '现成指令', workflow: '工作步骤', app: '工具入门', skill: '进阶知识' },
  kinds: { guide: '教程', review: '评测', original: '自研' },
  difficulties: ['入门', '进阶', '高级'],
  costs: ['免费额度内', '免费', '低', '中', '高', '按所用工具计费'],
  statuses: ['unverified', 'active', 'outdated', 'deprecated'],
  formats: ['skill', 'mcp', 'prompt'],
  ratingWeights: { 效果: 0.3, 易用: 0.2, 稳定: 0.2, 成本: 0.2, 生态: 0.1 }
}
