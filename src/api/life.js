import remote from '@/services/remote';
export default {
  //查询缴费账单信息
  getperAgentUserInfoQuery(payload) {
    return remote.post('/perAgentUserInfoQuery.do', { payload });
  },
  //获取城市下支持的缴费类别
  getperAgentTypeQuery(payload) {
    return remote.post('/perAgentTypeQuery.do', { payload });
  },
  //获取缴费类别下的缴费机构查询
  getPerPayProjectQry(payload) {
    return remote.post('/perAgentProjectQuery.do', { payload });
  },
  //获取Confirm
  getPerTypePayConfirm(payload) {
    return remote.postConfirm('/perAgentPayment.do', { payload });
  },
  //水电煤供暖煤气提交
  getPerTypePay(payload) {
    return remote.post('/perAgentPayment.do', { payload });
  },
  //查看历史缴费的列表
  getPerQryPayRecordss(payload) {
    return remote.post('/perAgentRecordQuery.do', { payload });
  },
  // 获取常用缴费列表
  getPerQryCommonPay(payload) {
    return remote.post('/perAgentBookQueryList.do', { payload });
  },
  // 常用缴费列表删除
  getPerDelCommonPay(payload) {
    return remote.post('/perAgentBookDelete.do', { payload });
  },
  //常用缴费名册修改分组
  perTypePayGroupEdit(payload) {
    return remote.post('/perAgentBookUpdate.do', { payload });
  },
  // 余额查询
  perCardBalance(payload) {
    return remote.post('/perActBalanceQry.do', { payload });
  },
  // 缴费实时记录查询
  perRealTimeAgentRecordQuery(payload) {
    return remote.post('/perRealTimeAgentRecordQuery.do', { payload });
  },
  // 缴费记录详情接口
  perAgentRecordDtlQuery(payload) {
    return remote.post('/perAgentRecordDtlQuery.do', { payload });
  },
};
