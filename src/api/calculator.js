import remote from '@/services/remote';
export default {
  //存款/贷款利率查询
  perInvestRateQry(payload) {
    return remote.post('perInvestRateQry.do', { payload });
  },
  //贷款计算器
  perLoanCalculate(payload) {
    return remote.post('perLoanCalculate.do', { payload });
  },
};
