module.exports = {
  types: [
    { value: 'Merge branch', name: 'Merge branch: 代码合并' },
    { value: 'feat', name: 'feat:     一个新功能' },
    { value: 'fix', name: 'fix:      修复一个bug' },
    { value: 'docs', name: 'docs:     只有文档变更' },
    {
      value: 'style',
      name: 'style:    修改代码格式，不影响代码运行\n            (空格, 格式, 缺少分号等)',
    },
    {
      value: 'refactor',
      name: 'refactor: 代码重构，未添加新功能，未修改bug',
    },
    {
      value: 'perf',
      name: 'perf:     提高性能',
    },
    { value: 'test', name: 'test:     增加测试' },
    {
      value: 'chore',
      name: 'chore:    构建过程或辅助工具和库的更改\n            例如文档生成',
    },
    { value: 'revert', name: 'revert:   代码回滚' },
    { value: 'WIP', name: 'WIP:      Work in progress' },
  ],

  scopes: [
    { name: '五大主页' },
    { name: '预约服务' },
    { name: '银联二维码' },
    { name: '登录注册' },
    { name: '我的账户' },
    { name: '转账' },
    { name: '贷款' },
    { name: '设置' },
    { name: '信用卡' },
    { name: '存款' },
    { name: '理财' },
    { name: '基金' },
    { name: '金融工具' },
    { name: '生活' },
    { name: '更多' },
    { name: '微厅-客户端' },
    { name: '微厅-客户经理端' },
  ],

  // allowTicketNumber: false,
  // isTicketNumberRequired: false,
  // ticketNumberPrefix: 'TICKET-',
  // ticketNumberRegExp: '\\d{1,5}',

  // it needs to match the value for field type. Eg.: 'fix'
  /*
  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  */
  // override the messages, defaults are as follows
  messages: {
    type: '选择一种你的提交类型:',
    scope: '选择一个提交的功能模块 (可选):',
    // used if allowCustomScopes is true
    // customScope: 'Denote the SCOPE of this change:',
    subject: '简要说明(必填):\n',
    body: '详细说明，使用"|"换行(选填)：\n',
    breaking: '非兼容性说明 (可选):\n',
    footer: '关联关闭的issue，例如：#31, #34(可选):\n',
    confirmCommit: '确定提交?',
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  // skip any questions you want
  //skipQuestions: ["body"],

  // limit subject length
  subjectLimit: 100,
  // breaklineChar: '|', // It is supported for fields body and footer.
  // footerPrefix : 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true, // default is false
};
