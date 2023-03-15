import remote from '@/services/remote';
export default {
  // 网点列表查询
  perMapNodeListQry(payload) {
    return remote.post('/perMapNodeListQry.do', { payload });
  },
  // 根据机构编号查询网点
  perMapNodeListQryByDeptId(payload) {
    return remote.post('/perMapNodeListQryByDeptId.do', { payload });
  },
  //获取营业厅排队人数和服务窗口数
  perMapNodeTrsWindowQry(payload) {
    return remote.post('/perMapNodeTrsWindowQry.do', { payload });
  },
  // 个人线上填单录入检查
  perOpenAccountCheck(payload) {
    return remote.post('/perOpenAccountCheck.do', { payload });
  },
  // 个人线上填单录入
  perOpenAccount(payload) {
    return remote.post('/perOpenAccount.do', { payload });
  },
  // 网点预约
  perMapNodeOrder(payload) {
    return remote.post('/perMapNodeOrder.do', { payload });
  },
  // 网点预约取消预约
  perMapNodeOrderCancel(payload) {
    return remote.post('/perMapNodeOrderCancel.do', { payload });
  },
  // 大额预约取现
  perLargeBookCash(payload) {
    return remote.post('/perLargeBookCash.do', { payload });
  },
  // 大额预约取现取消预约
  perLargeBookCashCancel(payload) {
    return remote.post('/perLargeBookCashCancel.do', { payload });
  },
  // 无卡预约取款录入
  perNoCardWithdrawal(payload) {
    return remote.post('/perNoCardWithdrawal.do', { payload });
  },
  // 预约无卡取款取消预约
  perNoCardWithdrawalCancel(payload) {
    return remote.post('/perNoCardWithdrawalCancel.do', { payload });
  },
  // 获取支取账户
  perAcOverview(payload) {
    return remote.post('/perAcOverview.do', { payload });
  },
  // 预约记录查询
  perBookRecordQry(payload) {
    return remote.post('/perBookRecordQry.do', { payload });
  },
  // 网点预约记录详情查询
  perBookBranchQry(payload) {
    return remote.post('/perBookBranchQry.do', { payload });
  },
  // 大额取现预约记录详情查询
  perBookLargeCashQry(payload) {
    return remote.post('/perBookLargeCashQry.do', { payload });
  },
  // 无卡取款预约记录详情查询
  perBookNoCardWithdrawalDetailQry(payload) {
    return remote.post('/perBookNoCardWithdrawalDetailQry.do', { payload });
  },
  // 个人线上开户预约记录详情查询
  perBookOpenAccountQry(payload) {
    return remote.post('/perBookOpenAccountQry.do', { payload });
  },
  // 预约记录查询
  perBookRecordQrySceneConfirm(payload) {
    return remote.postConfirm('/perBookRecordQryScene.scene', { payload });
  },
  // 预约记录查询
  perBookRecordQryScene(payload) {
    return remote.post('/perBookRecordQryScene.scene', { payload });
  },
};
