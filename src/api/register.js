import remote from '@/services/remote';
export default {
  // 简单注册
  perSimpCifSign(payload) {
    return remote.post('/perSimpCifSign.do', { payload });
  },
  // 实名认证和本行卡绑定接口(借记卡)
  perAddAcctWxConfirm(payload) {
    return remote.postConfirm('/perAddAcctWx.do', { payload });
  },
  // 实名认证和本行卡绑定接口(借记卡)
  perAddAcctWx(payload) {
    return remote.post('/perAddAcctWx.do', { payload });
  },
  // 实名认证和本行卡绑定接口(信用卡)
  perAddCreditAcctWxConfirm(payload) {
    return remote.postConfirm('/perAddCreditAcctWx.do', { payload });
  },
  // 实名认证和本行卡绑定接口(信用卡)
  perAddCreditAcctWx(payload) {
    return remote.post('/perAddCreditAcctWx.do', { payload });
  },
};
