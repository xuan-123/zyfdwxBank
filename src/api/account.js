import remote from '@/services/remote';
export default {
  //我的账户 本行账户列表查询-含余额
  perAcOverview(payload) {
    return remote.post('/perAcOverview.do', { payload });
  },
  //我的账户 他行行账户列表查询
  otherBankAcInfoQry(payload) {
    return remote.post('/perOtherBankAcInfoQry.do', { payload });
  },
  //我的账户 账户余额查询
  perActBalanceQry(payload) {
    return remote.post('/perActBalanceQry.do', { payload });
  },
  //我的账户 信用卡详情
  perCreditCardAccountQuery(payload) {
    return remote.post('/perCreditCardAccountQuery.do', { payload });
  },
  //我的账户 他行卡详情(余额)
  perOtherCardAcctBalanceQry(payload) {
    return remote.post('/perOtherCardAcctBalanceQry.do', { payload });
  },
  //我的账户 修改别名
  getAlicas(payload) {
    return remote.post('/perAcAliasUpdate.do', { payload });
  },
  //我的账户 设置默认卡第一阶段
  perMajorAcctSetConfirm(payload) {
    return remote.postConfirm('/perMajorAcctSet.do', { payload });
  },
  //我的账户 设置默认卡第二阶段
  perMajorAcctSet(payload) {
    return remote.post('/perMajorAcctSet.do', { payload });
  },
  //我的账户 电子账户绑定卡列表
  perEleAcctBindAcctListQry(payload) {
    return remote.post('/perEleAcctBindAcctListQry.do', { payload });
  },
  //我的账户 电子账户未绑定卡查询
  perEleAcctUnBindCard(payload) {
    return remote.post('/perEleAcctUnBindCard.do', { payload });
  },
  //我的账户 电子账户绑卡第一阶段
  perEleAcctAddBindCardConfirm(payload) {
    return remote.postConfirm('/perEleAcctAddBindCard.do', { payload });
  },
  //我的账户 电子账户绑卡第二阶段
  perEleAcctAddBindCard(payload) {
    return remote.post('/perEleAcctAddBindCard.do', { payload });
  },
  //我的账户 电子账户绑他行卡
  perEleAcctAddBindCardOwnBank(payload) {
    return remote.post('/perEleAcctAddBindCardOwnBank.do', { payload });
  },
  //我的账户 电子账户解绑卡
  perEleAcctBindAcctDelete(payload) {
    return remote.post('/perEleAcctBindAcctDelete.do', { payload });
  },
  //我的账户 解绑账户第一阶段
  getPerAcctDelConfirm(payload) {
    return remote.postConfirm('/perAcctDel.do', { payload });
  },
  //我的账户 解绑账户第二阶段
  getPerAcctDel(payload) {
    return remote.post('/perAcctDel.do', { payload });
  },
  //我的资产
  perAssetOverview(payload) {
    return remote.post('/perAssetOverview.do', { payload });
  },
  //交易明细 转账记录
  perTransferQry(payload) {
    return remote.post('/perTransferQry.do', { payload });
  },
  //交易明细 他行卡交易明细查询
  perOtherCardAcctDetailQry(payload) {
    return remote.post('/perOtherCardAcctDetailQry.do', { payload });
  },
  //添加账户 未加挂卡列表查询
  perUnBindAcctQuery(payload) {
    return remote.post('/perUnBindAcctQuery.do', { payload });
  },
  //添加账户 添加借记卡第一阶段
  perAddAccountCofirm(payload) {
    return remote.postConfirm('/perAddAccount.do', { payload });
  },
  //添加账户 添加借记卡第二阶段
  perAddAccount(payload) {
    return remote.post('/perAddAccount.do', { payload });
  },
  //添加账户 添加信用卡第一阶段
  perAddCreditAcctCofirm(payload) {
    return remote.postConfirm('/perAddCreditAcct.do', { payload });
  },
  //添加账户 添加信用卡第二阶段
  perAddCreditAcct(payload) {
    return remote.post('/perAddCreditAcct.do', { payload });
  },
  //在线开户 开通电子账户认证第一阶段
  perOpenEleAccountPreConfirm(payload) {
    return remote.postConfirm('/perOpenEleAccountPre.do', { payload });
  },
  //在线开户 开通电子账户认证第二阶段
  perOpenEleAccountPre(payload) {
    return remote.post('/perOpenEleAccountPre.do', { payload });
  },
  // 已实名用户 开通电子账户证件信息校验
  perCheckInfoForEleAccount(payload) {
    return remote.post('/perCheckInfoForEleAccount.do', { payload });
  },
  // 职业列表查询
  perProfessionListQry(payload) {
    return remote.post('/perProfessionListQry.do', { payload });
  },
  // 客户职业修改-核心
  perProfessionUpdate(payload) {
    return remote.post('/perProfessionUpdate.do', { payload });
  },
  // 客户地址信息修改-核心
  perAddressUpdate(payload) {
    return remote.post('/perAddressUpdate.do', { payload });
  },
  // 在线开户-他行卡-认证一阶段
  perOpenEleAccountOtherConfirm(payload) {
    return remote.postConfirm('/perOpenEleAccountOtherPre.do', { payload });
  },
  // 在线开户-他行卡-认证二阶段
  perOpenEleAccountOtherPre(payload) {
    return remote.post('/perOpenEleAccountOtherPre.do', { payload });
  },
  // 在线开户-开户（他行、本行交易）
  perOpenEleAccount(payload) {
    return remote.post('/perOpenEleAccount.do', { payload });
  },
};
