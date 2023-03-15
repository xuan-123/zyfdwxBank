/**
 * 小程序独有方法封装
 */
// eslint-disable-next-line
const prefix = (typeof wx === 'object' && wx.miniProgram) || (typeof my === 'object' && my);

/**
 * @description h5 页面跳转到小程序内相应页面
 */
const navigateTo = (pages, params) => {
  if (params) {
    prefix.navigateTo({
      url: `/pages/${pages}/index?data=${params}`,
    });
  } else {
    prefix.navigateTo({
      url: `/pages/${pages}/index`,
    });
  }
};
/**
 * @description h5 页面跳转到小程序相应页面，关闭其他所有页面
 */
const redirectTo = (stage) => {
  let menulist = JSON.parse(localStorage.getItem('setStages')).stages;
  if (stage.indexOf('?') !== -1) {
    const urlsplits = stage.split('?');
    prefix.reLaunch({
      url: `/pages/webView/index?src=${menulist[urlsplits[0].split('.')[1]].path}&${urlsplits[1]}`,
    });
  } else {
    const urlsplits = stage.split('.');
    prefix.reLaunch({
      url: `/pages/webView/index?src=${menulist[urlsplits[1]].path}`,
    });
  }
};

/**
 * 微信/支付宝小程序的 switchTab 方法
 * @param {Object} options
 */
const switchTab = (options) => {
  prefix.switchTab(options);
};

/**
 * 微信/支付宝小程序的 navigateBack 方法
 * @param {Object} options
 */
const navigateBack = (options) => {
  prefix.navigateBack(options);
};

export { navigateTo, redirectTo, switchTab, navigateBack };
