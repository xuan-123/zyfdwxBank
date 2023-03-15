let messages = {};
let fields = {};
// 理财产品列表 - 类型
messages['transProductList'] = {
  '0': '活期',
  '1': '特色',
  '2': '定期',
  '3': '全部',
};
fields.transProductList = [
  { name: '0', label: '活期' },
  { name: '1', label: '定期' },
  { name: '2', label: '特色' },
  { name: '3', label: '全部' },
];
// 理财产品 - 筛选条件
messages['transProductFilter'] = {
  financeProductType: '产品类型',
  financePurchaseAmount: '起购金额',
  financeIncomeType: '收益类型',
  financeLimit: '产品期限',
  financeRiskLevel: '风险等级',
};
//我的理财 - 交易状态
messages['transProductState'] = {
  100200: '购买',
  100201: '申购',
  100202: '赎回',
};
// 银行卡类型
messages['cardForm'] = {
  '0': '工资卡',
  '1': '储蓄卡',
  '2': '信用卡',
};
// 理财 - 风险测评
messages['financeRiskAssessment'] = {
  '1': { value: '保守型', key: '极低' },
  '2': { value: '稳健型', key: '较低' },
  '3': { value: '平衡型', key: '适中' },
  '4': { value: '成长型', key: '较高' },
  '5': { value: '进取型', key: '高' },
};
//风险评估分数
messages['score'] = {
  A: '5',
  B: '4',
  C: '3',
  D: '2',
  E: '1',
};
// 开户类型
messages['depositMode'] = {
  PMBS: '手机银行开户',
  PWBS: '个人微信银行开户',
  PBOP: '个人直销银行开户',
  EIBS: '企业网银开户',
  OETS: '柜面开户',
  PIBS: '个人网银',
};
// 通知存款类型
messages['callDepositTime'] = {
  '01': '1天',
  '07': '7天',
};
export default {
  fields,
  messages,
};
