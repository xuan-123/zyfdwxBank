import remote from '@/services/remote';
export default {
  // 密码登录
  perLogintic(payload) {
    return remote.post('/perLogintic.do', { payload });
  },
  // 密码登录(无密登录)
  perNoPassLogintic(payload) {
    return remote.post('/perNoPassLogintic.do', { payload });
  },
  // 获取图形验证码
  getImg(payload) {
    return remote.post('/perGenTokenImgForBase64.do', { payload });
  },
};
