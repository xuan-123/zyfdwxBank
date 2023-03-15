import remote from '../services/remote';
export default {
  // 银行卡转账提交-确认
  perBankTransferConfirm(payload) {
    return remote.postConfirm('/perBankTransfer.do', { payload });
  },
  // 银行卡转账提交
  perBankTransfer(payload) {
    return remote.post('/perBankTransfer.do', { payload });
  },
  // 网点查询
  perRtgsNodeListQry(payload) {
    return remote.post('/perRtgsNodeListQry.do', { payload });
  },
  // 新增收款人
  perPayeeAdd(payload) {
    return remote.post('/perPayeeAdd.do', { payload });
  },
  // 通过卡号查询卡bin
  perCardBinIdentify(payload) {
    return remote.post('/perCardBinIdentify.do', { payload });
  },
  // 收款人删除
  perPayeeDeleteConfirm(payload) {
    return remote.postConfirm('/perPayeeDel.do', { payload });
  },
  perPayeeDelete(payload) {
    return remote.post('/perPayeeDel.do', { payload });
  },
  // 是否支持超网
  perGetTransferChannel(payload) {
    return remote.post('/perIbpsBankListQry.do', { payload });
  },
  // 收款人修改
  perPayeeUpdateConfirm(payload) {
    return remote.postConfirm('/perPayeeUpdate.do', { payload });
  },
  perPayeeUpdate(payload) {
    return remote.post('/perPayeeUpdate.do', { payload });
  },
  //转账记录查询
  perTransferQry(payload) {
    return remote.post('/perTransferQry.do', { payload });
  },
  //预约转账记录查询
  perNextDayTransferQry(payload) {
    return remote.post('/perNextDayTransferQry.do', { payload });
  },
  //预约交易取消
  perNextDayTransferCancelConfirm(payload) {
    return remote.postConfirm('/perNextDayTransferCancel.do', { payload });
  },
  //预约交易取消提交
  perNextDayTransferCancel(payload) {
    return remote.post('/perNextDayTransferCancel.do', { payload });
  },
  // 手机号转账-confirm
  perPhoneNumTransferConfirm(payload) {
    return remote.postConfirm('/perPhoneNumTransfer.do', { payload });
  },
  // 手机号转账
  perPhoneNumTransfer(payload) {
    return remote.post('/perPhoneNumTransfer.do', { payload });
  },
  // 手机号签约账号查询
  perMobileTransferSignListQry(payload) {
    return remote.post('/perMobileTransferSignListQry.do', { payload });
  },
  // 手机号收款卡设置---签约confirm
  perMobileTransferSignConfirm(payload) {
    return remote.postConfirm('/perMobileTransferSign.do', { payload });
  },
  // 手机号收款卡设置---签约
  perMobileTransferSign(payload) {
    return remote.post('/perMobileTransferSign.do', { payload });
  },
  // 收款卡设置-设置默认卡-confirm
  perMobileTransferSetDefaultCardConfirm(payload) {
    return remote.postConfirm('/perMobileTransferSetDefaultCard.do', { payload });
  },
  // 收款卡设置-设置默认卡
  perMobileTransferSetDefaultCard(payload) {
    return remote.post('/perMobileTransferSetDefaultCard.do', { payload });
  },
  // 收款卡设置-解除关联-confirm
  perMobileTransferCancelConfirm(payload) {
    return remote.postConfirm('/perMobileTransferCancel.do', { payload });
  },
  // 收款卡设置-解除关联
  perMobileTransferCancel(payload) {
    return remote.post('/perMobileTransferCancel.do', { payload });
  },
  // 关闭手机号收款-confirm
  perMobileTransferCloseConfirm(payload) {
    return remote.postConfirm('/perMobileTransferOpenOrClose.do', { payload });
  },
  // 关闭手机号收款
  perMobileTransferClose(payload) {
    return remote.postConfirm('/perMobileTransferOpenOrClose.do', { payload });
  },
  // 收款行
  perBankListQuery(payload) {
    return remote.post('/perBankListQuery.do', { payload });
  },
  // 首页最近转账查询
  perRecentTransferQry(payload) {
    return remote.post('/perRecentTransferQry.do', { payload });
  },
};
