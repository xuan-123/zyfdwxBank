import remote from '@/services/remote';
export default {
  // 理财产品查询
  perInvestPrdListQry(payload) {
    return remote.post('/perInvestPrdListQry.do', { payload });
  },
  //风险评估试卷查询
  perInvestRiskQuestionQry(payload) {
    return remote.post('/perInvestRiskQuestionQry.do', { payload });
  },
  //风险评估
  perInvestRiskLevelUpdate(payload) {
    return remote.post('/perInvestRiskLevelUpdate.do', { payload });
  },
  //理财详情查询
  perInvestPrdDetailQry(payload) {
    return remote.post('/perInvestPrdDetailQry.do', { payload });
  },
  //理财购买确认
  perInvestPrdBuyConfirm(payload) {
    return remote.postConfirm('/perInvestPrdBuy.do', { payload });
  },
  //理财购买
  perInvestPrdBuy(payload) {
    return remote.post('/perInvestPrdBuy.do', { payload });
  },
  //客户历史成交查询
  perInvestPrdPendingListQry(payload) {
    return remote.post('/perInvestPrdPendingListQry.do', { payload });
  },
  // 客户当前委托查询
  perInvestCurrentEntrustListQry(payload) {
    return remote.post('/perInvestCurrentEntrustListQry.do', { payload });
  },
  // 客户理财产品份额查询
  perInvestPrdHoldListQry(payload) {
    return remote.post('/perInvestPrdHoldListQry.do', { payload });
  },
  // 理财昨日/累计收益查询
  perInvestYesterdayOrTotalIncomeQry(payload) {
    return remote.post('/perInvestYesterdayOrTotalIncomeQry.do', { payload });
  },
  // 理财客户签约查询
  perInvestCifInfoQry(payload) {
    return remote.post('/perInvestCifInfoQry.do', { payload });
  },
  // 理财净值曲线数据查询
  perInvestNetWorthCurveQuery(payload) {
    return remote.post('/perInvestNetWorthCurveQuery.do', { payload });
  },
  //理财撤单
  perInvestPrdPendingCancel(payload) {
    return remote.post('/perInvestPrdPendingCancel.do', { payload });
  },
  //理财撤单确认
  perInvestPrdPendingCancelConfirm(payload) {
    return remote.postConfirm('/perInvestPrdPendingCancel.do', { payload });
  },
  //赎回
  perInvestPrdRedeem(payload) {
    return remote.post('/perInvestPrdRedeem.do', { payload });
  },
  //赎回确认
  perInvestPrdRedeemConfirm(payload) {
    return remote.postConfirm('/perInvestPrdRedeem.do', { payload });
  },
  //收益试算
  perInvestIncomeTrial(payload) {
    return remote.post('/perInvestIncomeTrial.do', { payload });
  },
  //产品公告列表
  perMessageNotifyQry(payload) {
    return remote.post('/perMessageNotifyQry.do', { payload });
  },
  //理财产品日期查询
  perInvestProductDate(payload) {
    return remote.post('/perInvestProductDate.do', { payload });
  },
};
