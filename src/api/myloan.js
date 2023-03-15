import remote from '@/services/remote';
export default {
  // 理财产品查询
  QueryImg(payload) {
    return remote.get('/eweb-query.QueryImg.do', { payload });
  },
  WarmPrompt(payload) {
    return remote.post('/eweb-transfer.WarmPrompt.do', { payload });
  },
  QueryPiKey(payload) {
    return remote.post('/eweb-common.QueryPiKey.do', { payload });
  },

  // $gr_httpRequestpost("QueryPiKey.do", { Key: "Sm2value" }, function(data) {

  //   //console.log('getSmsValue by gr')
  //   window.smsMassage.Sm2value = data.Sm2value;
  //   window.smsMassage.Sm2hmac = data.Sm2hmac;
  // });
};
