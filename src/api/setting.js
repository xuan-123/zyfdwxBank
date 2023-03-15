import remote from '@/services/remote';
export default {
  // 个人信息设置 第三方绑定信息查询
  perUserThirdAuthQry(payload, handleError) {
    return remote.post('/perUserThirdAuthQry.do', { payload, handleError });
  },
  // 个人信息设置 第三方绑定解除绑定
  perUserThirdAuthDel(payload) {
    return remote.post('/perUserThirdAuthDel.do', { payload });
  },
  // 个人信息设置 第三方绑定新增
  perUserThirdAuthAdd(payload) {
    return remote.post('/perUserThirdAuthAdd.do', { payload });
  },
  // 限额设置 限额查询
  perAcLimitQuery(payload) {
    return remote.post('/perAcLimitQuery.do', { payload });
  },
  // 限额查询-剩余额度
  perAcRunLeftLmtQuery(payload) {
    return remote.post('/perAcRunLeftLmtQuery.do', { payload });
  },
  // 限额设置 限额修改
  perAcLimitModify(payload) {
    return remote.post('/perAcLimitModify.do', { payload });
  },
  // 限额设置 限额修改
  perAcLimitModifyConfirm(payload) {
    return remote.postConfirm('/perAcLimitModify.do', { payload });
  },
  // 小额免密设置 卡列表查询
  perSmallAmtNoSecretQry(payload) {
    return remote.post('/perSmallAmtNoSecretQry.do', { payload });
  },
  // 小额免密设置 小额免密签约
  perSmallAmtNoSecretConfirm(payload) {
    return remote.postConfirm('/perSmallAmtNoSecretOpenSet.do', { payload });
  },
  // 小额免密设置 小额免密签约
  perSmallAmtNoSecretOpenSet(payload) {
    return remote.post('/perSmallAmtNoSecretOpenSet.do', { payload });
  },
  // 小额免密设置 小额免密解除
  perSmallAmtNoSecretCloseSet(payload) {
    return remote.post('/perSmallAmtNoSecretCloseSet.do', { payload });
  },
  // 设备绑定管理 设备绑定查询
  perUserDeviceQryByClient(payload) {
    return remote.post('/perUserDeviceQryByClient.do', { payload });
  },
  // 设备绑定管理 解除绑定
  perUserDeviceUnBindByClient(payload) {
    return remote.post('/perUserDeviceUnBindByClient.do', { payload });
  },
  // 设备绑定管理 解除绑定
  perUserDeviceUnBindByConfirm(payload) {
    return remote.postConfirm('/perUserDeviceUnBindByClient.do', { payload });
  },
  // 动账设置 卡列表
  perMovingAccountNoticeQry(payload) {
    return remote.post('/perMovingAccountNoticeQry.do', { payload });
  },
  // 动账设置 开关
  perMovingAccountNoticeSwitchSet(payload) {
    return remote.post('/perMovingAccountNoticeSwitchSet.do', { payload });
  },
  // 账户安全锁 境内外情况查询
  perTrsLockStateQry(payload) {
    return remote.post('/perTrsLockStateQry.do', { payload });
  },
  // 账户安全锁 交易加解锁
  perAccountSafeLockSet(payload) {
    return remote.post('/perAccountSafeLockSet.do', { payload });
  },
  // 账户安全锁 交易加解锁
  perAccountSafeLockSetConfirm(payload) {
    return remote.postConfirm('/perAccountSafeLockSet.do', { payload });
  },

  // 安全证书  开通信息查询
  perUserAuthentic(payload) {
    return remote.post('/perUserAuthentic.do', { payload });
  },
  // 安全证书  向服务端更新证书信息
  perCloudCertClientCertUpload(payload) {
    return remote.post('/perCloudCertClientCertUpload.do', { payload });
  },
  // 常见问题查看
  perCommonProblemQry(payload) {
    return remote.post('/perCommonProblemQry.do', { payload });
  },
  // 云证通 关闭接口
  perClouduserPwdAuthClose(payload) {
    return remote.post('/perCZUserPwdAuthClose.do', { payload });
  },
  // 云证通 关闭接口 ===测试完删除
  perClouduserPwdAuthCloseConfirm(payload) {
    return remote.postConfirm('/perCZUserPwdAuthClose.do', { payload });
  },
  // 云证通 关闭接口 ===测试完删除
  perCloudCertClientCertUploadConfirm(payload) {
    return remote.postConfirm('/perCloudCertClientCertUpload.do', { payload });
  },
  // 云证通 查看证书情况
  perClientCertQry(payload) {
    return remote.post('/perClientCertQry.do', { payload });
  },
};
