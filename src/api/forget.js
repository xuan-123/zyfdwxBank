import remote from '@/services/remote';
export default {
  // 忘记密码
  perForgetPwdForAppPer(payload) {
    return remote.post('/perForgetPwdForAppPer.do', { payload });
  },
  // 忘记密码
  perForgetPwdForApp(payload) {
    return remote.post('/perForgetPwdForApp.do', { payload });
  },
  // 忘记密码 comfirm阶段
  perForgetPwdForAppConfirm(payload) {
    return remote.postConfirm('/perForgetPwdForApp.do', { payload });
  },
  // 进行证件信息校验
  perForgetPwdForAppCheckInfo(payload) {
    return remote.post('/perForgetPwdForAppCheckInfo.do', { payload });
  },
  // 账户信息校验
  perForgetPwdForAppCheckAcct(payload) {
    return remote.post('/perForgetPwdForAppCheckAcct.do', { payload });
  },
  // 卡密校验
  pubPerTAuthStep(payload) {
    return remote.post('/pubPerTAuthStep.do', { payload });
  },
  // 信用卡卡密校验
  pubPerQAuthStep(payload) {
    return remote.post('/pubPerQAuthStep.do', { payload });
  },
  // 登录密码修改
  perLoginPwdChange(payload) {
    return remote.post('/perLoginPwdChange.do', { payload });
  },
};
