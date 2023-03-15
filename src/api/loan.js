import remote from '@/services/remote';
export default {
  //贷款产品列表查询
  getPerLoanPrdQry(payload) {
    return remote.post('/perLoanListQry.do', { payload });
  },
  //贷款产品授信查询
  getPerLoanPrdCreditStateQry(payload) {
    return remote.post('/perLoanPrdCreditStateQry.do', { payload });
  },
  //贷款授信申请提交
  getPerLoanGrantCreditApplyConfirm(payload) {
    return remote.postConfirm('/perLoanGrantCreditApply.do', { payload });
  },
  //贷款授信申请
  getPerLoanGrantCreditApply(payload) {
    return remote.post('/perLoanGrantCreditApply.do', { payload });
  },
  //贷款授信申请用户信息补录提交
  perLoanCompleteUserInfo(payload) {
    return remote.post('/perLoanCompleteUserInfo.do', { payload });
  },
  //贷款授信申请用户信息补录提交
  perLoanCompleteUserInfoConfirm(payload) {
    return remote.postConfirm('/perLoanCompleteUserInfo.do', { payload });
  },
  //贷款发放
  getPerPLoanPayment(payload) {
    return remote.post('/perLoanPayment.do', { payload });
  },
  //贷款发放提交
  getPerPLoanPaymentConfirm(payload) {
    return remote.postConfirm('/perLoanPayment.do', { payload });
  },
  //提前还款
  perPLoanRepay(payload) {
    return remote.post('/perLoanRepay.do', { payload });
  },
  //提前还款
  perPLoanRepayConfirm(payload) {
    return remote.postConfirm('/perLoanRepay.do', { payload });
  },
  //逾期还款
  perLoanOverdueRepay(payload) {
    return remote.post('/perLoanOverdueRepay.do', { payload });
  },
  //逾期还款
  perLoanOverdueRepayConfirm(payload) {
    return remote.postConfirm('/perLoanOverdueRepay.do', { payload });
  },
  //我的贷款列表查询
  perPLoanDebtListQry(payload) {
    return remote.post('perLoanDebtListQry.do', { payload });
  },
  //还款利息计算查询
  perLoanPlanListQry(payload) {
    return remote.post('perLoanPlanListQry.do', { payload });
  },
  //还款记录查询
  perLoanRepayHisQry(payload) {
    return remote.post('perLoanRepayHisQry.do', { payload });
  },

  //付款二维码生成
  perQRCodePaymentGenerate(payload) {
    return remote.post('/perQRCodePaymentGenerate.do', { payload });
  },
  // 贷款进度查询
  perLoanProgressQry(payload) {
    return remote.post('/perLoanProgressQry.do', { payload });
  },
  // 贷款类型查询
  perLoanTypePrdQry(payload) {
    return remote.post('/perLoanTypePrdQry.do', { payload });
  },
  // 获取验证方式,提交信息
  perLoanPrdApply(payload) {
    return remote.post('/perLoanPrdApply.do', { payload });
  },
  // 短信验证校验,提交信息
  pubPerSAuthStep(payload) {
    return remote.post('/pubPerSAuthStep.do', { payload });
  },
  // 登录外查询贷款申请进度
  perLoanProgressQrySceneConfirm(payload) {
    return remote.postConfirm('/perLoanProgressQryScene.scene', { payload });
  },
  // 登录外查询贷款申请进度
  perLoanProgressQryScene(payload) {
    return remote.post('/perLoanProgressQryScene.scene', { payload });
  },
  // 查询未还贷款列表
  perLoanUnpaidQry(payload) {
    return remote.post('/perLoanUnpaidQry.do', { payload });
  },
};
