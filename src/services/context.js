// 以下代码不会在原生运行 web
import utils from '@/utils';
function defaultMockFn() {
  // 浏览器模拟context
}
let context = {};
// 浏览器模拟context
if (process.env.NODE_ENV === 'development' && process.env.VUE_APP_TARGE === 'MADP') {
  const contextMockApi = {
    next: defaultMockFn,
    finish: defaultMockFn, // 完成场景
    launchStage: defaultMockFn, // 启动另一个场景
    replaceStage: defaultMockFn, // 替换当前场景
    getParam: defaultMockFn,
    setToken: defaultMockFn,
    clearToken: defaultMockFn,
    checkToken: defaultMockFn,
    getTokenClaimString: defaultMockFn,
    getTokenClaimKeys: defaultMockFn,
    sessionSetString: function(key, value) {
      //  保存数据
      const savelabel = 'context.session';
      const saveSessionObj = utils.localCache.getItem(savelabel) || {};
      saveSessionObj[key] = value;
      utils.localCache.setItem(savelabel, saveSessionObj);
    },
    sessionGetString: function(key) {
      const savelabel = 'context.session';
      const saveSessionObj = utils.localCache.getItem(savelabel) || {};
      return saveSessionObj[key];
    }, //  获取数据
    secureSetString: function(key, value) {
      //  保存数据
      const savelabel = 'context.secure';
      const saveSessionObj = utils.localCache.getItem(savelabel) || {};
      saveSessionObj[key] = value;
      utils.localCache.setItem(savelabel, saveSessionObj);
    },
    secureGetString: function(key) {
      const savelabel = 'context.secure';
      const saveSessionObj = utils.localCache.getItem(savelabel) || {};
      return saveSessionObj[key];
    },
    setTimestamp: function(time) {
      window.__timestamp = time;
    },
    getTimestamp: function() {
      return window.__timestamp || Date.now();
    },
    envGet: function() {
      return {
        isNative: false,
      };
    },
    isNative: false,
    getMappedFileUrl: defaultMockFn,
    getMappedUrl: defaultMockFn,
    handleQRCode: defaultMockFn,
    hashSHA256: defaultMockFn,
    deviceSignature: defaultMockFn,
    isStageAvailable: defaultMockFn,
    refreshRepo: defaultMockFn,
    getEnvKeys: defaultMockFn,
    switchEnv: defaultMockFn,
    getRegistryString: defaultMockFn,
    handleBack: defaultMockFn,
    getDeviceInfo: defaultMockFn,
    getTabbarHeight: defaultMockFn,
    statusBarDarkFont: defaultMockFn,
    proxyGetAddress: defaultMockFn,
    proxyGetHost: defaultMockFn,
    proxyGetPort: defaultMockFn,
  };

  context = new Proxy(contextMockApi, {
    get: function(obj, prop) {
      console.log(`use mock api:  context.${prop}`);
      // 默认行为是返回属性值
      return obj[prop];
    },
  });
}
if (process.env.VUE_APP_TARGE === 'MADP') {
  context = window.context ? window.context : context;
  context.handleBack('true');

  // ----------------监听场景结束，----------------
  let handlesMap = {};
  /*
    扩展context.launchStage方法，支持回调函数
    @stage:启动的场景名字以及参数
    @callback：场景结束的回调
  */
  context.launchStagePlus = function(stage, callback) {
    // 如果没有回调，则直接启动场景
    if (!callback) {
      return context.launchStage(stage);
    }
    // 根据？进行分割。
    const urlsplits = stage.split('?');
    let stageId = urlsplits[0];
    let url = '';
    let params = '';
    // 获取到传递的参数
    if (urlsplits.length > 1) {
      params = urlsplits[1];
      params += '&';
    }
    // 在参数中增加callbackId
    let callbackId = 'cid_' + Date.now();
    params += 'callbackId=' + callbackId;
    handlesMap[callbackId] = callback;
    if (params) {
      url = stageId + '?' + params;
    } else {
      url = stageId;
    }
    context.launchStage(url);
  };
  // 监听场景结束
  let listenViewappear = function() {
    // weex传递的数据都在stageRespData中，且会把传递的callbackId传回来
    let stageRespText = context.sessionGetString('stageRespData') || '';
    console.log('stageRespText', stageRespText);
    context.sessionSetString('stageRespData', '');
    if (stageRespText) {
      let stageRespData = JSON.parse(stageRespText);
      let callbackId = stageRespData.callbackId;
      let data = stageRespData.data;
      let handler = handlesMap[callbackId];
      // 回调
      if (callbackId && callbackId !== 'null' && handler) {
        console.log('data1', data);
        handler(data);
        delete handlesMap[callbackId];
      }
    }
  };
  window.addEventListener('viewappear', listenViewappear);
  // 设计思想：weex可以调用该方法返回数据
  // function weexStageResp(data) {
  //   const callbackId = context.getParam('callbackId');
  //   const respData = {
  //     data,
  //     callbackId,
  //   };
  //   context.sessionSetString('stageRespData', JSON.stringify(respData));
  // }
}

import uni from '@/services/uni';
import { navigateTo, redirectTo, switchTab, navigateBack } from '@/utils/miniProgram';

if (process.env.VUE_APP_TARGE === 'WX') {
  const contextMockApi = {
    platform: uni.platform, // 环境参数
    // 数据存储 start
    setSession: uni.setSession,
    getSession: uni.getSession,
    getSessionAsync: uni.getSessionAsync,
    getSecure: uni.getSecure,
    getSecureAsync: uni.getSecureAsync,
    setSecure: uni.setSecure,
    removeSession: uni.removeSession, // wx
    removeSecure: uni.removeSecure, // wx
    setKeys: uni.setKeys, // 配置存储前缀 wx
    // 数据存储 end
    os: uni.os,
    environment: uni.environment,
    getDeviceID: uni.getDeviceID, // 随机数，设备ID
    DeviceSignature: uni.DeviceSignature, // 随机数，设备ID
    // 页面跳转相关，
    setStages: uni.setStages, // 配置各个模块需要跳转的路径
    launchStage: uni.launchStage,
    replaceStage: uni.replaceStage,
    launchStagePlus: uni.launchStagePlus, // 小程序和公众号同launchStage，不会执行回调
    getParam: uni.getParam,
    finish: uni.finish, // 小程序回到首页，公众号回到3*5菜单页 app关闭web-view
    // finishTo: uni.finishTo, // 多余的方法
    returnHome: uni.returnHome, // 小程序回到首页，公众号回到3*5菜单页
    // 微信环境独有
    createClient: uni.createClient, // wx.config
    setReady: uni.setReady, // wx.ready
    setError: uni.setError, // wx.error
    checkAPI: uni.checkAPI, // wx.checkJsApi 检查当前环境是否支持，并非wx.comfig是否配置
    postMessage: uni.postMessage, // wx.miniProgram.postMessage
    updateClient: uni.updateClient, // wx.config
    // vx团队添加 start
    isWeixinEnv: /MicroMessenger/i.test(window.navigator.userAgent), // 微信小程序及微信公众号
    navigateTo: navigateTo, // 小程序环境特有
    redirectTo: redirectTo, // 小程序环境特有
    switchTab: switchTab, // 小程序环境特有
    navigateBack: navigateBack, // 小程序环境特有
    /**
     * @description 特定环境执行的方法
     * @param {Array} env 环境参数 eg: ['public', 'weixin','alipay','browser']
     * @param {@function} fun 需要执行的方法
     * @example context.particularEnvFun(['public','browser'], () => { console.log('123') })
     */
    /**
     * 
      // 公众号 浏览器
      context.particularEnvFun(['public', 'browser'], () => {
        context.launchStage(`main.auth?route=${document.URL}`);
      });
      // 支付宝/微信小程序
      context.particularEnvFun(['weixin', 'alipay'], () => {
        context.setSecure('fromRouter', document.URL);
        context.navigateTo('login');
      });
    */
    particularEnvFun: (env = [], fun) => {
      if (!(env instanceof Array)) {
        throw Error('first parameter is array');
      }
      if (typeof fun !== 'function') {
        throw Error('second parameter should be function');
      }
      if (typeof fun === 'function' && env.includes(context.platform)) {
        fun();
      }
    },
    // vx团队添加 end
  };
  context = new Proxy(contextMockApi, {
    get: function(obj, prop) {
      // 默认行为是返回属性值
      return obj[prop];
    },
  });
}

window.context = context;
