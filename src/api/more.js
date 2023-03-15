import remote from '@/services/remote';
export default {
  // 公告
  perMessageNotifyQry(payload) {
    return remote.post('/perMessageNotifyQry.do', { payload });
  },
  // 常见问题
  perCommonProblemQry(payload) {
    return remote.post('/perCommonProblemQry.do', { payload });
  },
};
