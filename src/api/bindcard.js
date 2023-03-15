import remote from '@/services/remote';
export default {
  // 发短信
  GetMsg(payload) {
    return remote.post('/GetMsg.do', { payload });
  },
  //绑定
  ActSign(payload) {
    return remote.post('/ActSign.do', { payload });
  },
  BindAndUnBind(payload) {
    return remote.post('/BindAndUnBind.do', { payload });
  },

  // $gr_httpRequestpost("QueryPiKey.do", { Key: "Sm2value" }, function(data) {

  //   //console.log('getSmsValue by gr')
  //   window.smsMassage.Sm2value = data.Sm2value;
  //   window.smsMassage.Sm2hmac = data.Sm2hmac;
  // });
};
