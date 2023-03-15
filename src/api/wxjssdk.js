import remote from '@/services/remote';
export default {
  // 获取微信签名
  getWxJsApiSignature(payload) {
    return remote.post('/wxJsApiSignature.do', { payload });
  },
};
