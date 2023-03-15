import remote from '@/services/remote';
export default {
  // 储蓄产品 整存整取 、 定活两便 、通知存款、大额存单列表查询
  perDepositPrdListQry(payload) {
    return remote.post('/perDepositPrdListQry.do', { payload });
  },
  //储蓄产品 大额存单柜面签约状态查询
  perLargeDepositIsOpened(payload) {
    return remote.post('/perLargeDepositIsOpened.do', { payload });
  },
  //储蓄产品  大额存单单条详情查询
  certificateDetails(payload) {
    return remote.post('/perLargeDepositDetail.do', { payload });
  },
  ///我的存款  获取产品说明书详情
  perPrdFileQry(payload) {
    return remote.post('/perPrdFileQry.do', { payload });
  },
  //我的存款  轮播图数据账号查询
  totalAmount(payload) {
    return remote.post('/perDepositAcctListQry.do', { payload });
  },
  //我的存款  存款持有列表查询
  depositHoldingList(payload) {
    return remote.post('/perLumpSumTimeDepositOwnQry.do', { payload });
  },
  // 我的存款通知查询
  perNoticeDepositNoticeQry(payload) {
    return remote.post('/perNoticeDepositNoticeQry.do', { payload });
  },
  // 我的存款取消/通知认证接口
  perNoticeDepositNoticeConfirm(payload) {
    return remote.postConfirm('/perNoticeDepositNotice.do', { payload });
  },
  // 我的存款取消/通知认证接口
  perNoticeDepositNotice(payload) {
    return remote.post('/perNoticeDepositNotice.do', { payload });
  },
};
