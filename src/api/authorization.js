import remote from '@/services/remote';
export default {
  // 检查微信网页授权
  perCheckWxOpenId(payload) {
    return remote.post('/perCheckWxOpenId.do', { payload });
  },
  // 微信网页授权
  perWxWebAuth(payload) {
    return remote.post('/perWxWebAuth.do', { payload });
  },
  // 检查微信id绑定关系
  perCheckWxBind(payload) {
    return remote.post('/perCheckWxBind.do', { payload });
  },
  // 更新微信id绑定
  perUpdateWxBind(payload) {
    return remote.post('/perUpdateWxBind.do', { payload });
  },

  // 支付宝授权
  perThirdLogin(payload) {
    return remote.post('/perThirdLogin.do', { payload });
  },
};
