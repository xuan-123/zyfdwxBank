import remote from '../services/remote';
export default {
  //无密登录
  perNoPassLogintic(payload) {
    return remote.post('/perNoPassLogintic.do', { payload });
  },
  //获取token
  getToken(payload) {
    return remote.post('/perGetToken.do', { payload });
  },
  // 省市列表
  perProvAndCityQry(payload, handleError) {
    return remote.post('/perProvAndCityQry.do', { payload, handleError });
  },
  //获取城市列表
  getPerGdCityQry(payload) {
    return remote.post('/perAgentCityQuery.do', { payload });
  },
  // 短信验证码获取(绑定他行账户专用)
  perSendSmsCode(payload) {
    return remote.post('/perSendSmsCode.do', { payload });
  },
  // 校验短信 登录外 分步
  pubPerSAuthStep(payload) {
    return remote.post('/pubPerSAuthStep.do', { payload });
  },
  //获取短信验证码(登录内)
  perSendSms(payload) {
    return remote.post('/perSendSms.do', { payload });
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
  // 验证手机号是否注册
  perMobilePhoneCheck(payload) {
    return remote.post('/perMobilePhoneCheck.do', { payload });
  },
  // 认证短信
  perSAuthStep(payload) {
    return remote.postMultiAuth('/perSAuthStep.do', { payload });
  },
  //卡密校验
  perTAuthStep(payload) {
    return remote.post('/perTAuthStep.do', { payload });
  },
  //信用卡查询密码
  perQAuthStep(payload) {
    return remote.post('/perQAuthStep.do', { payload });
  },
  //卡密认证
  perCardPwdCheck(payload) {
    return remote.post('/perCardPwdCheck.do', { payload });
  },
  // 身份证OCR识别
  perOcrIdCardIdentify(payload) {
    return remote.post('/perOcrIdCardIdentify.do', { payload });
  },
  // 银行卡OCR识别
  perOcrBankCardIdentify(payload) {
    return remote.post('/perOcrBankCardIdentify.do', { payload });
  },
  // 文件上传
  perFileUpLoad(payload) {
    return remote.postForm('/perFileUpLoad.do', { payload });
  },
  // 实名认证
  perAddIdentity(payload) {
    return remote.post('/perAddIdentity.do', { payload });
  },
  // 人脸认证
  perEidPhotoCheck(payload) {
    return remote.post('/perEidPhotoCheck.do', { payload });
  },
  // 微信通知查询
  perWxNoticeQry(payload) {
    return remote.post('/perWxNoticeQry.do', { payload });
  },

  // 安全退出
  perLogout(payload) {
    return remote.post('/perLogout.do', { payload });
  },
  // 解除绑定
  perUnBindUserThird(payload) {
    return remote.post('/perUnBindUserThird.do', { payload });
  },
  // 页面温馨提示查询
  perPageTipsQuery(payload) {
    return remote.post('/perPageTipsQuery.do', { payload });
  },
};
