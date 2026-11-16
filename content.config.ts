export const contentConfig = {
  title: 'AI 提效指南',
  author: 'zbwork',
  repo: 'https://github.com/zbwork/WorkSmarterWithAI',
  scenarioGroups: [
    {id:'workplace',name:'职场',groups:['office','role'],order:1},
    {id:'projects',name:'项目实战',groups:['project'],order:2},
    {id:'life',name:'生活',groups:['life'],order:3}
  ],
  scenarios: [
  {
    "id": "office",
    "name": "通用能力",
    "group": "office",
    "description": "不分岗位，人人都要做的事",
    "order": 1,
    "stages": [
      {
        "slug": "writing",
        "name": "写材料",
        "order": 1
      },
      {
        "slug": "meeting",
        "name": "开会",
        "order": 2
      },
      {
        "slug": "data",
        "name": "表格与数据",
        "order": 3
      },
      {
        "slug": "presentation",
        "name": "汇报与 PPT",
        "order": 4
      },
      {
        "slug": "communication",
        "name": "沟通与邮件",
        "order": 5
      }
    ]
  },
  {
    "id": "hr",
    "name": "行政人事",
    "group": "role",
    "description": "招人、办活动、管日常事务",
    "order": 2,
    "stages": [
      {
        "slug": "recruitment",
        "name": "招聘",
        "order": 1
      },
      {
        "slug": "onboarding",
        "name": "入职与培训",
        "order": 2
      },
      {
        "slug": "events",
        "name": "活动与会议",
        "order": 3
      },
      {
        "slug": "administration",
        "name": "日常行政",
        "order": 4
      }
    ]
  },
  {
    "id": "media",
    "name": "新媒体运营",
    "group": "role",
    "description": "想选题、写稿、做图、发布",
    "order": 3,
    "stages": [
      {
        "slug": "ideas",
        "name": "选题",
        "order": 1
      },
      {
        "slug": "writing",
        "name": "写稿",
        "order": 2
      },
      {
        "slug": "visuals",
        "name": "图片与视频",
        "order": 3
      },
      {
        "slug": "publishing",
        "name": "发布与复盘",
        "order": 4
      }
    ]
  },
  {
    "id": "commerce",
    "name": "电商运营",
    "group": "role",
    "description": "写详情、回客服、看评论",
    "order": 4,
    "stages": [
      {
        "slug": "research",
        "name": "选品与竞品",
        "order": 1
      },
      {
        "slug": "product",
        "name": "商品详情",
        "order": 2
      },
      {
        "slug": "service",
        "name": "客服",
        "order": 3
      },
      {
        "slug": "reviews",
        "name": "评论与复盘",
        "order": 4
      }
    ]
  },
  {
    "id": "finance",
    "name": "财务",
    "group": "role",
    "description": "整理票据和报表，辅助分析",
    "order": 5,
    "stages": [
      {
        "slug": "expenses",
        "name": "票据与报销",
        "order": 1
      },
      {
        "slug": "reports",
        "name": "报表",
        "order": 2
      },
      {
        "slug": "analysis",
        "name": "分析",
        "order": 3
      }
    ]
  },
  {
    "id": "teacher",
    "name": "教师",
    "group": "role",
    "description": "备课、出题、写评语",
    "order": 6,
    "stages": [
      {
        "slug": "preparation",
        "name": "备课",
        "order": 1
      },
      {
        "slug": "exercises",
        "name": "出题",
        "order": 2
      },
      {
        "slug": "feedback",
        "name": "批改与反馈",
        "order": 3
      }
    ]
  },
  {
    "id": "ai-app",
    "name": "做一个 AI 应用",
    "group": "project",
    "description": "从想法到上线，用 AI 做出一个能用的应用",
    "order": 7,
    "stages": [
      {
        "slug": "discovery",
        "name": "想法与需求",
        "order": 1
      },
      {
        "slug": "design",
        "name": "产品设计",
        "order": 2
      },
      {
        "slug": "development",
        "name": "开发",
        "order": 3
      },
      {
        "slug": "launch",
        "name": "上线",
        "order": 4
      },
      {
        "slug": "operations",
        "name": "运营",
        "order": 5
      }
    ]
  },
  {
    "id": "online-shop",
    "name": "开一家网店",
    "description": "从选品到第一笔订单",
    "group": "project",
    "order": 8,
    "stages": [
      {
        "slug": "selection",
        "name": "选品",
        "order": 1
      },
      {
        "slug": "setup",
        "name": "开店和装修",
        "order": 2
      },
      {
        "slug": "listing",
        "name": "上架商品",
        "order": 3
      },
      {
        "slug": "promotion",
        "name": "推广引流",
        "order": 4
      },
      {
        "slug": "service",
        "name": "客服和复盘",
        "order": 5
      }
    ]
  },
  {
    "id": "media-account",
    "name": "做一个自媒体账号",
    "description": "从定位到稳定更新",
    "group": "project",
    "order": 9,
    "stages": [
      {
        "slug": "positioning",
        "name": "定位",
        "order": 1
      },
      {
        "slug": "content",
        "name": "做内容",
        "order": 2
      },
      {
        "slug": "profile",
        "name": "包装账号",
        "order": 3
      },
      {
        "slug": "growth",
        "name": "发布和涨粉",
        "order": 4
      },
      {
        "slug": "monetization",
        "name": "变现",
        "order": 5
      }
    ]
  },
  {
    "id": "online-course",
    "name": "做一门线上课",
    "description": "把你会的东西做成一门课",
    "group": "project",
    "order": 10,
    "stages": [
      {
        "slug": "outline",
        "name": "定主题和大纲",
        "order": 1
      },
      {
        "slug": "script",
        "name": "写讲稿",
        "order": 2
      },
      {
        "slug": "production",
        "name": "做课件和录制",
        "order": 3
      },
      {
        "slug": "launch",
        "name": "上架",
        "order": 4
      },
      {
        "slug": "enrollment",
        "name": "招生",
        "order": 5
      }
    ]
  },
  {
    "id": "local-store",
    "name": "开一家实体小店",
    "description": "开店前后的准备和宣传",
    "group": "project",
    "order": 11,
    "stages": [
      {
        "slug": "research",
        "name": "选址和调研",
        "order": 1
      },
      {
        "slug": "branding",
        "name": "起店名做招牌",
        "order": 2
      },
      {
        "slug": "pricing",
        "name": "定菜单和价格",
        "order": 3
      },
      {
        "slug": "opening",
        "name": "开业宣传",
        "order": 4
      },
      {
        "slug": "operations",
        "name": "日常经营",
        "order": 5
      }
    ]
  },
  {
    "id": "study",
    "name": "孩子学习",
    "group": "life",
    "description": "陪孩子学，不替孩子做",
    "order": 12,
    "stages": []
  },
  {
    "id": "health",
    "name": "健康",
    "group": "life",
    "description": "看懂报告和说明书，问诊前做好准备",
    "order": 13,
    "stages": []
  },
  {
    "id": "meals",
    "name": "一日三餐",
    "description": "今天吃什么，交给 AI 出主意",
    "group": "life",
    "order": 14,
    "stages": []
  },
  {
    "id": "travel",
    "name": "出行",
    "group": "life",
    "description": "做攻略、看外文、排行程",
    "order": 15,
    "stages": []
  },
  {
    "id": "affairs",
    "name": "办事和维权",
    "description": "看懂条款，写清楚诉求",
    "group": "life",
    "order": 16,
    "stages": []
  },
  {
    "id": "safety",
    "name": "防骗和辨别",
    "description": "认出假消息和 AI 骗局",
    "group": "life",
    "order": 17,
    "stages": []
  }
],
  libraryCategories: [{id:'prompt',name:'提示词'},{id:'skill',name:'Skill'},{id:'workflow',name:'工作流'}],
  methodTypes: {skill:"Skill（技能）",workflow:"工作流",app:"AI 应用"},
  kinds: { guide: '教程', review: '评测', original: '自研' },
  levels: [
    {name:'入门', description:'会复制粘贴就行', prerequisites:'打开网页或客户端，点按钮、拖文件、复制粘贴', color:'#246b55', soft:'#eaf5ee', order:1, path:'/paths/beginner/', audience:'我刚开始用 AI'},
    {name:'进阶', description:'要装软件 / 会配置', prerequisites:'改造和组合现成技能，配置连接器，或在 Codex 中使用技能', color:'#2764b4', soft:'#eaf1fd', order:2, path:'/paths/intermediate/', audience:'我已经在用 AI'},
    {name:'高级', description:'要会命令行 / 写代码', prerequisites:'自己写技能、加脚本、跨平台适配、发布技能或编写 MCP', color:'#7850a5', soft:'#f2ecfa', order:3, path:'/paths/advanced/', audience:'我是开发者 / 从业者'}
  ],
  apps: [
  {
    "slug": "doubao",
    "name": "豆包",
    "category": "对话助手（App / 网页）",
    "website": "https://www.doubao.com/chat/",
    "docs": "",
    "tab": true,
    "skills": false,
    "developer": false,
    "defaultLevel": "入门",
    "order": 1
  },
  {
    "slug": "doubao-work",
    "name": "豆包工作",
    "category": "办公智能体",
    "website": "https://www.doubao.com/work",
    "docs": "https://www.doubao.com/work/docs/zh-cn/articles/081010973544-skills",
    "tab": true,
    "skills": true,
    "developer": false,
    "defaultLevel": "入门",
    "order": 2
  },
  {
    "slug": "workbuddy",
    "name": "WorkBuddy",
    "category": "办公智能体",
    "website": "https://www.workbuddy.cn/",
    "docs": "https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Skills-Market",
    "tab": true,
    "skills": true,
    "developer": false,
    "defaultLevel": "入门",
    "order": 3
  },
  {
    "slug": "zhiban",
    "name": "知办",
    "category": "待确认",
    "website": "",
    "docs": "",
    "tab": true,
    "skills": null,
    "developer": false,
    "defaultLevel": "入门",
    "order": 4,
    "skillCandidate": true
  },
  {
    "slug": "codex",
    "name": "Codex",
    "category": "编程工具",
    "website": "https://openai.com/codex/",
    "docs": "https://developers.openai.com/codex/skills/",
    "tab": true,
    "skills": true,
    "developer": true,
    "defaultLevel": "进阶",
    "order": 5
  },
  {
    "slug": "deepseek",
    "name": "DeepSeek",
    "category": "对话助手",
    "website": "https://chat.deepseek.com/",
    "docs": "",
    "tab": true,
    "skills": false,
    "developer": false,
    "defaultLevel": "入门",
    "order": 6
  }
],
  platformStatuses: {
    active:{label:'已实测',icon:'✓'}, unverified:{label:'待实测',icon:'⏳'}, planned:{label:'即将补充',icon:'◷'}, unsupported:{label:'暂不支持',icon:'—'}, outdated:{label:'待复测',icon:'↻'}
  },
  formatLabels: {prompt:'提示词',skill:'技能包',mcp:'MCP 连接'},
  platformPreferenceKey: 'worksmarter-tool-v3',
  platformIssue: 'https://github.com/zbwork/WorkSmarterWithAI/issues/new?template=tool-test.yml',
  costs: ['免费额度内', '免费', '低', '中', '高', '按所用工具计费'],
  statuses: ['unverified', 'active', 'outdated', 'deprecated'],
  formats: ['skill', 'mcp', 'prompt'],
  ratingWeights: { 效果: 0.3, 易用: 0.2, 稳定: 0.2, 成本: 0.2, 生态: 0.1 }
}
