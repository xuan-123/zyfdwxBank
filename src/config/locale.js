// import sign from '@/modules/sign/config/locale.js';
export default (function () {
  const locales = {};
  locales.id = 'zh_CN';

  /**
   * fields/messages for example $field('xxxx')/$msg('xxxx') or
   * locales.FIELDS.xxxx/locales.MESSAGES.xxxx
   */
  let fields = {};
  let messages = {};

  //(1)
  messages['channelType'] = {
    weixin: 'wx', // 微信小程序
    public: 'wx', // 微信公众号
    browser: 'wx', // 浏览器
    alipay: 'ap', // 支付宝小程序
  };

  // 到账类型(1)
  fields.transferType = [
    { value: '01', text: '实时转账', text1: '转账金额≤100万，转账时间为7*24小时' },
    { value: '02', text: '普通转账', text1: '预计2小时后到账' },
    { value: '03', text: '次日转账', text1: '转账时间为下一工作日' },
  ];
  // 转账用途(1)
  fields.payUseList = [
    { value: '01', text: '借钱' },
    { value: '02', text: '还款' },
    { value: '03', text: '工资' },
    { value: '04', text: '房租' },
    { value: '05', text: '生活费' },
  ];

  // 银行卡类型(1)
  fields.bankCardTypeList = [
    { value: '01', text: '借记卡' },
    { value: '02', text: '信用卡' },
  ];
  // 信用卡证件类型列表
  fields.idTypeList = [
    { text: '居民身份证', value: '101' },
    { text: '军官证', value: '105' },
    { text: '外国护照', value: '103' },
    { text: '香港通行证', value: '108' },
    { text: '澳门通行证', value: '114' },
    { text: '台湾通行证', value: '109' },
    { text: '户口本', value: '102' },
  ];
  // 理财 - 产品类型(1)
  fields.financeProductType = [
    { value: '', text: '不限' },
    { value: '0', text: '活期' },
    { value: '1', text: '特色' },
    { value: '2', text: '定期' },
  ];
  // 理财 - 起购金额(1)
  fields.financePurchaseAmount = [
    { value: 'a', text: '不限' },
    { value: 'b', text: '5万(含)以下' },
    { value: 'c', text: '5万-100万(含)' },
    { value: 'd', text: '100万及以上' },
  ];
  // (2)
  fields.financeIncomeType = [
    { value: '', text: '不限' },
    { value: '0', text: '净值型' },
    { value: '1', text: '非净值型' },
  ];
  // 理财 - 产品期限(1)
  fields.financeLimit = [
    { value: 'f', text: '不限' },
    { value: 'a', text: '1个月以内' },
    { value: 'b', text: '1-3个月' },
    { value: 'c', text: '3-6个月' },
    { value: 'd', text: '6-12个月' },
    { value: 'e', text: '12个月以上' },
  ];
  // (2)
  fields.financeRiskLevel = [
    { value: '', text: '不限' },
    { value: '1', text: '低风险' },
    { value: '2', text: '中低风险' },
    { value: '3', text: '中风险' },
    { value: '4', text: '中高风险' },
    { value: '5', text: '高风险' },
  ];

  // 性别
  fields.sex = [
    { text: '女', value: '0' },
    { text: '男', value: '1' },
  ];
  // 婚姻状况
  fields.marriage = [
    { text: '已婚', value: '0' },
    { text: '未婚', value: '1' },
    { text: '离异', value: '2' },
  ];
  // 理财 - 收益类型
  messages['financeIncomeType'] = {
    0: '净值型',
    1: '非净值型',
  };
  // 理财 - 风险等级
  messages['financeRiskLevel'] = {
    0: '未评定',
    1: '低风险',
    2: '中低风险',
    3: '中风险',
    4: '中高风险',
    5: '高风险',
  };
  //理财-产品状态
  messages['financeInvestStatus'] = {
    '0': '开放期',
    '1': '募集期',
    '2': '发行成功',
    '3': '发行失败',
    '4': '停止交易',
    '5': '停止申购',
    '6': '停止赎回',
    '7': '权益登记',
    '8': '红利发放',
    '9': '产品封闭期',
    a: '产品终止',
    b: '预约认购期',
  };

  // 卡类型（1）
  messages['bankCardTypes'] = {
    '1': '借记卡',
    '2': '信用卡',
    '3': '准贷记卡',
    '4': '预付费卡',
  };
  //受教育程度
  fields.eduLevel = [
    { text: '无', value: '0' },
    { text: '小学', value: '1' },
    { text: '初中', value: '2' },
    { text: '技工学校', value: '3' },
    { text: '职业高中', value: '4' },
    { text: '普通高中', value: '5' },
    { text: '中等专业学校', value: '6' },
    { text: '大学专科', value: '7' },
    { text: '大学本科', value: '8' },
    { text: '硕士研究生', value: '9' },
    { text: '博士研究生', value: '10' },
  ];
  // 账户列表类型（1）
  fields.bankAcTypeList = [
    { text: '借记卡', value: 'PSAV' },
    { text: '信用卡', value: 'PCRC' },
  ];
  // (1)
  messages['transferType'] = {
    '01': '实时转账',
    '02': '普通转账',
    '03': '次日转账',
  };
  // (1)
  messages['payUseList'] = {
    '01': '借钱',
    '02': '还款',
    '03': '工资',
    '04': '房租',
    '05': '生活费',
  };

  // 银行卡类型(1)
  messages['bankCardType'] = {
    '0': '工资卡',
    '1': '储蓄卡',
    PSAV: '信用卡',
  };

  //联调接口添加账户图片(1)
  messages['bankAcTypeImg'] = {
    2032: 'boc',
    2079: 'njb',
    6003: 'icbc',
    2117: 'ccb',
  };
  //联调接口账户查询卡类型
  messages['bankAcType'] = {
    PSAV: '借记卡',
    PCRC: '信用卡',
    PSDC: '一类卡',
    PEA2: '电子账户',
    PEA3: '电子账户',
    VCAD: '三类户',
    POBC: '他行卡',
  };

  //联调接口账户列表查询卡类型
  messages['bankAcTypeType'] = {
    '1': 'I类',
    '2': 'II类',
    '3': 'III类',
  };
  // (1)
  messages['bankAcTypeNumber'] = {
    PSAV: 'I类',
    PEA2: 'II类',
    PEA3: 'III类',
  };
  // 账户状态(1)
  messages['accountStatus'] = {
    N: '正常',
    C: '关闭',
    L: '锁定',
    F: '冻结',
  };

  messages['ProcessState'] = {
    // 处理状态
    WCK: '待复核',
    WAH: '待授权',
    WAP: '待审批',
    FL: '失败',
    OK: '成功',
    UC: '未确定状态',
    RJ: '拒绝',
    CC: '取消',
    RC: '退回',
    BSC: '已作废',
    TMR: '预约生效',
    KCX: '可撤销',
  };

  //信用卡-业务类型(1)
  messages['applyType'] = {
    '01': '仅申请主卡',
    '02': '主副卡同时申请',
  };

  //信用卡-附属卡申请额度(1)
  messages['subCardLimit'] = {
    '01': '3万',
    '02': '5万',
    '03': '10万',
  };

  // 理财 - 风险等级
  messages['financeRiskLevel'] = {
    0: '未评定',
    1: '低风险',
    2: '中低风险',
    3: '中风险',
    4: '中高风险',
    5: '高风险',
  };

  // 理财产品 - 排序列表(1)
  messages['transProductSort'] = {
    annualizedRate: '收益率',
    purchaseAmount: '起购金额',
    investTerm: '期限',
  };

  // 理财产品 - 风险等级 - EN
  messages['transProductLevelEN'] = {
    low: 0,
    mediumLow: 1,
    medium: 2,
    mediumHigh: 3,
    high: 4,
  };
  // 理财产品 - 产品详情 - 时间期限
  messages['transProductDetail'] = {
    1: '起售日',
    2: '截止日',
    3: '起息日',
    4: '到期日',
  };
  // 理财产品 - 产品详情 - 产品类型
  messages['financeInvestType'] = {
    0: '基金',
    1: '行内理财',
    2: '境外理财产品',
  };
  // 理财产品 - 净值型 - 图标时间间隔(1)
  messages['netWorthTableDate'] = {
    oneMonth: '近1月',
    threeMonth: '近3月',
    oneYear: '近1年',
    threeYear: '近3年',
  };

  // 理财产品 - 风险等级 - CN
  messages['transProductLevel'] = {
    0: '极低风险',
    1: '较低风险',
    2: '适中风险',
    3: '较高风险',
    4: '高风险',
  };

  //分红方式
  messages['dividendWays'] = {
    0: '红利转投',
    1: '现金分红',
  };

  // 币种类型
  messages['CurrencyType'] = {
    CNY: '人民币',
    AUD: '澳大利亚元',
    CAD: '加拿大元',
    CHF: '瑞士法郎',
    EUR: '欧元',
    GBP: '英镑',
    HKD: '港币',
    JPY: '日元',
    NZD: '新西兰元',
    SEK: '瑞典克郎',
    SGD: '新加坡元',
    USD: '美元',
    THB: '泰铢',
  };

  // 处理日期
  messages['hadleDate'] = {
    D007: '7天',
    M001: '1个月',
    M003: '3个月',
    M006: '6个月',
    M009: '9个月',
    M018: '18个月',
    Y001: '1年',
    Y002: '2年',
    Y003: '3年',
    Y005: '5年',
    Y006: '6年',
  };

  // 网点营业状态(1)
  messages['busiStatus'] = {
    0: '营业中',
    1: '休息中',
  };

  // 城市列表(1)
  fields.getCity = [
    { value: '0', label: '北京市' },
    { value: '1', label: '广东省' },
    { value: '2', label: '山东省' },
    { value: '3', label: '江苏省' },
    { value: '4', label: '河南省' },
    { value: '5', label: '上海市' },
    { value: '6', label: '浙江省' },
    { value: '7', label: '陕西省' },
    { value: '8', label: '湖南省' },
    { value: '9', label: '重庆市' },
    { value: '10', label: '福建省' },
    { value: '11', label: '天津市' },
    { value: '12', label: '云南省' },
    { value: '13', label: '四川省' },
  ];

  // 贷款类型(1)
  fields.loanType = [
    { value: '1', text: '个人二手书房购置贷款' },
    { value: '2', text: '住房装修' },
    { value: '3', text: '旅游' },
    { value: '4', text: '婚庆' },
    { value: '5', text: '留学' },
    { value: '6', text: '大额耐用消费品购置' },
    { value: '7', text: '教育' },
    { value: '8', text: '医疗' },
    { value: '9', text: '其他' },
  ];

  // 婚姻状况
  messages['gender'] = {
    F: '女',
    M: '男',
  };

  // 证件类型
  messages['idType'] = {
    P02: '身份证',
    P08: '军官证',
    P11: '解放军文职干部证',
    P13: '警官证',
    P14: '解放军士兵证',
    P05: '户口簿',
    P15: '（港、澳）回乡证、通行证',
    P17: '（台）通行证、其他有效旅行证',
    P20: '（外国）护照',
    P04: '（中国）护照',
    P10: '武警士兵证',
    P29: '军事院校学员证',
    P25: '军官退休证',
    P26: '文职干部退休证',
    P24: '离退休干部荣誉证',
    P99: '其他',
  };
  fields.idTypeLists = [
    { value: 'P02', text: '身份证' },
    { value: 'P08', text: '军官证' },
    { value: 'P11', text: '解放军文职干部证' },
    { value: 'P13', text: '警官证' },
    { value: 'P14', text: '解放军士兵证' },
    { value: 'P05', text: '户口簿' },
    { value: 'P15', text: '（港、澳）回乡证、通行证' },
    { value: 'P20', text: '（外国）护照' },
    { value: 'P04', text: '（中国）护照' },
    { value: 'P10', text: '武警士兵证' },
    { value: 'P29', text: '军事院校学员证' },
    { value: 'P25', text: '军官退休证' },
    { value: 'P26', text: '文职干部退休证' },
    { value: 'P24', text: '离退休干部荣誉证' },
    { value: 'P99', text: '其他' },
  ];

  locales.FIELDS = {
    ...fields,
    // ...sign.fields,
  };
  locales.MESSAGES = {
    ...messages,
    // ...sign.messages,
  };
  return locales;
})();
