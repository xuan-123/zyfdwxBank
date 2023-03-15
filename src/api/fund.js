import remote from '@/services/remote';
export default {
  // 基金昨日/累计收益查询
  earningsTotalIncome(payload) {
    return remote.post('/perFundYesterdayOrTotalIncomeQry.do', { payload });
  },
  // 登录外基金列表查询
  perFundQry(payload) {
    return remote.post('/perFundQry.do', { payload });
  },
  // 登录内基金列表查询
  perFundListQry(payload) {
    return remote.post('/perFundListQry.do', { payload });
  },
  // 基金详情
  perPrdFundDetail(payload) {
    return remote.post('/perPrdFundDetail.do', { payload });
  },
  // 基金相关曲线数据查询
  perFundCurveQuery(payload) {
    return remote.post('/perFundCurveQuery.do', { payload });
  },
  // 基金规则查询
  perFundRuleQry(payload) {
    return remote.post('/perFundRuleQry.do', { payload });
  },
  // 基金自选或取消
  perFundDealSubscribe(payload) {
    return remote.post('/perFundDealSubscribe.do', { payload });
  },
  // 基金热门搜索
  perCommonSearch(payload) {
    return remote.post('/perCommonSearch.do', { payload });
  },
  // 收益明细查询
  perFundIncomeQuery(payload) {
    return remote.post('/perFundIncomeQuery.do', { payload });
  },
  // 基金定投列表查询
  perFundFixedInputQry(payload) {
    return remote.post('/perFundFixedInputQry.do', { payload });
  },
  // 基金定投记录
  perFundFixedInputRecord(payload) {
    return remote.post('/perFundFixedInputRecord.do', { payload });
  },
  // 基金交易明细查询
  perFundTransRecord(payload) {
    return remote.post('/perFundTransRecord.do', { payload });
  },
  // 我的基金-我的持有列表
  perPrdFundDealCifHoldFundQry(payload) {
    return remote.post('/perPrdFundDealCifHoldFundQry.do', { payload });
  },
  // 我的基金-我的委托列表
  perAllowRevokeQuery(payload) {
    return remote.post('/perAllowRevokeQuery.do', { payload });
  },
};
