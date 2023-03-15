import remote from '../services/remote';
export default {
  // 信用卡账单列表查询
  perHisBillListQuery(payload) {
    return remote.post('/perHisBillListQuery.do', { payload });
  },
  // 信用卡账单列表查询
  perApplyCardAllBillQry(payload) {
    return remote.post('/perApplyCardAllBillQry.do', { payload });
  },
  // 可申请信用卡查询
  perWaitApplyCardListQry(payload) {
    return remote.post('/perWaitApplyCardListQry.do', { payload });
  },
  // 信用卡申请
  perCreditCardApply(payload) {
    return remote.postMultiAuth('/perCreditCardApply.do', { payload });
  },
  // 信用卡申请第一页获取认证列表
  perCreditCardApplyConfirm(payload) {
    return remote.postConfirm('/perCreditCardApply.do', { payload });
  },
  // 校验短信 登录外 分步
  pubPerSAuthStep(payload) {
    return remote.postMultiAuth('/pubPerSAuthStep.do', { payload });
  },
  // 获取短信 登录外
  perSendSmsNoLogin(payload) {
    return remote.post('/perSendSmsNoLogin.do', { payload });
  },
  // 获取短信 登录外
  perGetSendSmsNoLogin(payload) {
    return remote.postMultiAuth('/perSendSmsNoLogin.do', { payload });
  },
  // 校验短信 登录外
  perAuthSmsNoLogin(payload) {
    return remote.post('/perAuthSmsNoLogin.do', { payload });
  },
  // 认证短信
  perSAuthStep(payload) {
    return remote.postMultiAuth('/perSAuthStep.do', { payload });
  },
  // 未登录联网核查
  perIdentityInfoCheckOrQryNoLogin(payload) {
    return remote.post('/perIdentityInfoCheckOrQryNoLogin.do', { payload });
  },
  // 信用卡申请进度查询
  perCreditCardApplyProQry(payload) {
    return remote.post('/perCreditCardApplyProQry.do', { payload });
  },
  // 信用卡激活确认
  perCreditCardActivateConfirm(payload) {
    return remote.postConfirm('/perCreditCardActivate.do', { payload });
  },
  // 信用卡激活交易
  perCreditCardActivate(payload) {
    return remote.postMultiAuth('/perCreditCardActivate.do', { payload });
  },
  // 账户信用卡列表
  perCreditCardAccountQueryList(payload) {
    return remote.post('/perCreditCardAccountQueryList.do', { payload });
  },
  // 信用卡副卡列表&额度查询
  perViceCardInfoQry(payload) {
    return remote.post('/perViceCardInfoQry.do', { payload });
  },
  // 额度查询
  perCreditCardLimitQry(payload) {
    return remote.post('/perCreditCardLimitQry.do', { payload });
  },
  // 额度调整confirm
  perCreditCardLimitModifyConfirm(payload) {
    return remote.postConfirm('/perCreditCardLimitModify.do', { payload });
  },
  // 额度调整
  perCreditCardLimitModify(payload) {
    return remote.post('/perCreditCardLimitModify.do', { payload });
  },
  // 额度分配confirm
  perCreditCardLimitAllotConfirm(payload) {
    return remote.postConfirm('/perCreditCardLimitAllot.do', { payload });
  },
  // 额度分配
  perCreditCardLimitAllot(payload) {
    return remote.post('/perCreditCardLimitAllot.do', { payload });
  },
  // 立即还款账单信息列表
  perCreditCardAccountQuery(payload) {
    return remote.post('/perCreditCardAccountQuery.do', { payload });
  },
  // 账单分期查询
  perWantToCreditCardInstallmentQry(payload) {
    return remote.post('/perWantToCreditCardInstallmentQry.do', { payload });
  },
  // 消费分期查询
  perPaymentDetailQuery(payload) {
    return remote.post('/perPaymentDetailQuery.do', { payload });
  },
  // 分期试算
  perCreditCardInstallmentCalculation(payload) {
    return remote.post('/perCreditCardInstallmentCalculation.do', { payload });
  },
  // 确认分期confirm
  perCreditCardBillInstallConfirm(payload) {
    return remote.postConfirm('/perCreditCardBillInstall.do', { payload });
  },
  // 确认分期
  perCreditCardBillInstall(payload) {
    return remote.post('/perCreditCardBillInstall.do', { payload });
  },
  // 分期记录查询
  perBillInstallQuery(payload) {
    return remote.post('/perBillInstallQuery.do', { payload });
  },
  // 历史或未出账单查询
  perHisBillQuery(payload) {
    return remote.post('/perHisBillQuery.do', { payload });
  },
  // 信用卡账单明细查询
  perCreditCardBillDetailsQry(payload) {
    return remote.post('/perCreditCardBillDetailsQry.do', { payload });
  },
  // 信用卡立即&提前还款confirm
  perPayForCreditCardConfirm(payload) {
    return remote.postConfirm('/perPayForCreditCard.do', { payload });
  },
  // 信用卡立即&提前还款
  perPayForCreditCard(payload) {
    return remote.post('/perPayForCreditCard.do', { payload });
  },
  // 信用卡个人信息查询
  perCreditCardOneMessageQuery(payload) {
    return remote.post('/perCreditCardOneMessageQuery.do', { payload });
  },
  // 信用卡个人信息修改confirm
  perCreditCardOneMessageModifyConf(payload) {
    return remote.postConfirm('/perCreditCardOneMessageModify.do', { payload });
  },
  // 信用卡个人信息修改
  perCreditCardOneMessageModify(payload) {
    return remote.post('/perCreditCardOneMessageModify.do', { payload });
  },
  // 卡片挂失提交confirm
  perCreditCardLostConfirm(payload) {
    return remote.postConfirm('/perCreditCardLost.do', { payload });
  },
  // 卡片挂失提交
  perCreditCardLost(payload) {
    return remote.post('/perCreditCardLost.do', { payload });
  },
  // 自动还款签约列表查询
  perCreditCardAutoPaymentQry(payload) {
    return remote.post('/perCreditCardAutoPaymentQry.do', { payload });
  },
  // 自动还款签约/修改/解约confirm
  perCreditCardAutoRepayManageConfirm(payload) {
    return remote.postConfirm('/perCreditCardAutoRepayManage.do', { payload });
  },
  // 自动还款签约/修改/解约
  perCreditCardAutoRepayManage(payload) {
    return remote.post('/perCreditCardAutoRepayManage.do', { payload });
  },
};
