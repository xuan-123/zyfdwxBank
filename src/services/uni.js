const ENV_TYPE = {
  weixin: 'weixin',
  app: 'app',
  public: 'public',
  browser: 'browser',
  alipay: 'alipay',
};
let weixin = /MicroMessenger/i.test(window.navigator.userAgent);
let isWEAPP = window.__wxjs_environment === 'miniprogram';
function istype() {
  if (typeof wx !== 'undefined' && isWEAPP && weixin) {
    return ENV_TYPE.weixin; // 小程序
  } else if (typeof wx !== 'undefined' && !isWEAPP && weixin) {
    return ENV_TYPE.public; // 公众号
  } else if (typeof my !== 'undefined' && my.getEnv) {
    return ENV_TYPE.alipay; // 支付宝
  } else if (typeof context !== 'undefined' && context.getParam) {
    return ENV_TYPE.app; // MADP
  } else {
    return ENV_TYPE.browser; // 浏览器
  }
}
const platform = istype();

const sessionSetString = (key, val) => {
  if (platform == 'app') {
    return context.sessionSetString(key, val);
  } else {
    sessionStorage.setItem(key, val);
  }
};
const sessionGetString = (options) => {
  if (platform == 'app') {
    return context.sessionGetString(options);
  } else {
    return new Promise(function (reslove, reject) {
      reslove(sessionStorage.getItem(options));
    });
  }
};
const sessionGetStringAsync = (options) => {
  if (platform == 'app') {
    return context.sessionGetStringAsync(options);
  } else {
    return sessionStorage.getItem(options);
  }
};
const secureGetString = (options) => {
  if (platform == 'app') {
    return context.secureGetString(options);
  } else {
    return new Promise(function (reslove, reject) {
      if (platform == 'public' || platform == 'browser') {
        localStorage.getItem('publicKeys')
          ? reslove(localStorage.getItem(localStorage.getItem('publicKeys') + options))
          : reslove(localStorage.getItem(options));
      } else if (platform == 'weixin') {
        localStorage.getItem('weixinKeys')
          ? reslove(localStorage.getItem(localStorage.getItem('weixinKeys') + options))
          : reslove(localStorage.getItem(options));
      } else {

        (localStorage.getItem(options));
      }
    });
  }
};
const secureGetStringAsync = (options) => {
  if (platform == 'app') {
    return context.secureGetStringAsync(options);
  } else {
    if (platform == 'public' || platform == 'browser') {
      return localStorage.getItem('publicKeys') ? localStorage.getItem(localStorage.getItem('publicKeys') + options) : localStorage.getItem(options);
    } else if (platform == 'weixin') {
      return localStorage.getItem('weixinKeys') ? localStorage.getItem(localStorage.getItem('weixinKeys') + options) : localStorage.getItem(options);
    } else {
      return localStorage.getItem(options);
    }
  }
};
const secureSetString = (key, val) => {
  if (platform == 'app') {
    return context.secureSetString(key, val);
  } else {
    if (platform == 'public' || platform == 'browser') {
      localStorage.getItem('publicKeys')
        ? localStorage.setItem(localStorage.getItem('publicKeys') + key, JSON.stringify(val))
        : localStorage.setItem(key, JSON.stringify(val));
    } else if (platform == 'weixin') {
      localStorage.getItem('weixinKeys')
        ? localStorage.setItem(localStorage.getItem('weixinKeys') + key, JSON.stringify(val))
        : localStorage.setItem(key, JSON.stringify(val));
    } else {
      localStorage.setItem(key, JSON.stringify(val));
    }
  }
};
const setSession = (key, val) => {
  if (platform == 'app') {
    return context.sessionSetString(key, val);
  } else {
    sessionStorage.setItem(key, JSON.stringify(val));
  }
};
const getSessionAsync = (options) => {
  if (platform == 'app') {
    return context.sessionGetStringAsync(options);
  } else {
    return sessionStorage.getItem(options);
  }
};
const getSession = (options) => {
  if (platform == 'app') {
    return context.sessionGetStringAsync(option);
  } else {
    return new Promise(function (reslove, reject) {
      reslove(sessionStorage.getItem(options));
    });
  }
};
const setSecure = (key, val) => {
  if (platform == 'app') {
    return context.secureSetString(key, val);
  } else {
    if (platform == 'public' || platform == 'browser') {
      localStorage.getItem('publicKeys')
        ? localStorage.setItem(localStorage.getItem('publicKeys') + key, JSON.stringify(val))
        : localStorage.setItem(key, JSON.stringify(val));
    } else if (platform == 'weixin') {
      localStorage.getItem('weixinKeys')
        ? localStorage.setItem(localStorage.getItem('weixinKeys') + key, JSON.stringify(val))
        : localStorage.setItem(key, JSON.stringify(val));
    } else {
      localStorage.setItem(key, JSON.stringify(val));
    }
  }
};
const getSecureAsync = (options) => {
  if (platform == 'app') {
    return context.secureGetStringAsync(options);
  } else {
    if (platform == 'public' || platform == 'browser') {
      return localStorage.getItem('publicKeys') ? localStorage.getItem(localStorage.getItem('publicKeys') + options) : localStorage.getItem(options);
    } else if (platform == 'weixin') {
      return localStorage.getItem('weixinKeys') ? localStorage.getItem(localStorage.getItem('weixinKeys') + options) : localStorage.getItem(options);
    } else {
      return localStorage.getItem(options);
    }
  }
};
const getSecure = (options) => {
  if (platform == 'app') {
    return context.secureSetString(key, val);
  } else {
    return new Promise(function (reslove, reject) {
      if (platform == 'public' || platform == 'browser') {
        localStorage.getItem('publicKeys')
          ? reslove(localStorage.getItem(localStorage.getItem('publicKeys') + options))
          : reslove(localStorage.getItem(options));
      } else if (platform == 'weixin') {
        localStorage.getItem('weixinKeys')
          ? reslove(localStorage.getItem(localStorage.getItem('weixinKeys') + options))
          : reslove(localStorage.getItem(options));
      } else {
        reslove(localStorage.getItem(options));
      }
    });
  }
};
const removeSecure = (options) => {
  if (platform == 'app') {
    return context.secureSetString(option, '');
  } else {
    if (platform == 'public' || platform == 'browser') {
      localStorage.getItem('publicKeys') ? localStorage.removeItem(localStorage.getItem('publicKeys') + options) : localStorage.removeItem(options);
    } else if (platform == 'weixin') {
      localStorage.getItem('weixinKeys') ? localStorage.removeItem(localStorage.getItem('weixinKeys') + options) : localStorage.removeItem(options);
    } else {
      localStorage.removeItem(options);
    }
  }
};
const removeSession = (options) => {
  if (platform == 'app') {
    return context.sessionSetString(option, '');
  } else {
    return sessionStorage.removeItem(options);
  }
};
const setKeys = (options) => {
  if (platform == 'public' || platform == 'browser') {
    localStorage.setItem('publicKeys', options);
  } else if (platform == 'weixin') {
    localStorage.setItem('weixinKeys', options);
  } else {
    return;
  }
};
var storage = {
  sessionSetString,
  sessionGetString,
  sessionGetStringAsync,
  secureGetString,
  secureGetStringAsync,
  secureSetString,
  setSession,
  getSession,
  getSessionAsync,
  getSecure,
  getSecureAsync,
  setSecure,
  removeSecure,
  removeSession,
  setKeys,
};

const name = () => {
  let userAgent = navigator.userAgent.toLocaleLowerCase();
  var system = {
    win: false,
    mac: false,
    xll: false,
  };
  system.win = userAgent.indexOf('Win') == 0;
  system.mac = userAgent.indexOf('Mac') == 0;
  system.x11 = userAgent == 'X11' || userAgent.indexOf('Linux') == 0;
  let name = 'unKnow';
  if (userAgent.indexOf('win') > -1) {
    name = 'windows';
  } else if (userAgent.indexOf('iphone') > -1) {
    name = 'ios';
  } else if (userAgent.indexOf('mac') > -1) {
    if (/ipad/i.test(userAgent)) {
      name = 'ipad';
    } else {
      name = 'macos';
    }
  } else if (userAgent.indexOf('linux') > -1) {
    if (userAgent.indexOf('android') > -1) {
      if (system.win || system.mac || system.xll) {
        name = 'apad';
      } else {
        name = 'android';
      }
    } else {
      name = 'linux';
    }
  } else {
    name = 'unKnow';
  }
  return name;
};
const os = name();
const environment = () => {
  if (platform == 'public') {
    return 'wx_browser';
  } else if (platform == 'weixin') {
    return 'wx_webview';
  } else if (platform == 'app') {
    return 'madp_webview';
  } else if (platform == 'alipay') {
    return 'alipay_webview';
  } else if (platform == 'public') {
    return 'pmui_webview';
  } else {
    return 'browser ';
  }
};
const DeviceSignature = () => {
  if (platform == 'app') {
    return context.deviceSignature();
  } else {
    return getDeviceID;
  }
};

const getDeviceID = getDeviceIDfun();
function getDeviceIDfun() {
  let getDeviceID = '';
  if (localStorage.getItem('getDeviceID') && localStorage.getItem('getDeviceID').indexOf('-') !== -1) {
    getDeviceID = localStorage.getItem('getDeviceID');
  } else {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    getDeviceID = S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
    localStorage.setItem('getDeviceID', JSON.stringify(getDeviceID));
  }
  return getDeviceID;
}
var equipment = { os, environment, DeviceSignature, getDeviceID };

// 页面/场景调度
const launchStage = (stage) => {
  if (platform == 'app') {
    return context.launchStage(stage);
  } else {
    let menulist = JSON.parse(localStorage.getItem('setStages')).stages;
    if (stage.indexOf('?') !== -1) {
      const urlsplits = stage.split('?');
      if (platform == 'public' || platform == 'browser') {
        let routerParam = {};
        if (sessionStorage.getItem('routerParam')) {
          routerParam = JSON.parse(sessionStorage.getItem('routerParam'));
          routerParam[urlsplits[0].split('.')[1]] = JSON.stringify(urlsplits[1].split('=')[1]);
        } else {
          routerParam[urlsplits[0].split('.')[1]] = JSON.stringify(urlsplits[1].split('=')[1]);
        }
        sessionStorage.setItem('routerParam', JSON.stringify(routerParam));
        window.open(`${window.location.origin}${menulist[urlsplits[0].split('.')[1]].path}`, '_self');
        // window.open(menulist[urlsplits[0].split(".")[1]].path, "_self")
      } else if (platform == 'weixin') {
        wx.miniProgram.navigateTo({
          url: `/pages/webView/index?src=${menulist[urlsplits[0].split('.')[1]].path}&${urlsplits[1]}`,
        });
      } else {
        my.navigateTo({
          url: `/pages/webView/index?src=${menulist[urlsplits[0].split('.')[1]].path}&${urlsplits[1]}`,
        });
      }
    } else {
      const urlsplits = stage.split('.');
      if (platform == 'public' || platform == 'browser') {
        // window.open(menulist[urlsplits[1]].path, "_self")
        window.open(`${window.location.origin}${menulist[urlsplits[1]].path}`, '_self');
      } else if (platform == 'weixin') {
        wx.miniProgram.navigateTo({
          url: `/pages/webView/index?src=${menulist[urlsplits[1]].path}`,
        });
      } else {
        my.navigateTo({
          url: `/pages/webView/index?src=${menulist[urlsplits[1]].path}`,
        });
      }
    }
  }
};
const handlesMap = {};
const launchStagePlus = (stage, callback) => {
  if (platform == 'app') {
    if (stage.indexOf('?') !== -1) {
      // 有参数情况
      let params = '';
      let url = '';
      const callbackId = 'cid_' + Date.now();
      params += 'callbackId=' + callbackId;
      handlesMap[callbackId] = callback;
      if (params) {
        url = stage + '?' + params;
      } else {
        url = stage;
      }
      context.launchStage(url);
    } else {
      // 没有参数情况
      let params = '';
      let url = '';
      const callbackId = 'cid_' + Date.now();
      params += 'callbackId=' + callbackId;
      handlesMap[callbackId] = callback;
      if (params) {
        url = stage + '?' + params;
      } else {
        url = stage;
      }
      context.launchStage(url);
    }
  } else {
    if (Object.prototype.toString.call(JSON.parse(localStorage.getItem('setStages'))) == '[object Object]') {
      let menulist = JSON.parse(localStorage.getItem('setStages')).stages;
      const urlsplits = stage.split('?');
      if (menulist[urlsplits[0].split('.')[1]].module == 'web') {
        launchStage(stage);
      } else {
        if (urlsplits[0].split('.')[1] == 'convertBase64') {
          let image = new Image();
          image.crossOrigin = 'anonymous';
          image.src = window.atob(urlsplits[1].split('=')[1]);
          image.onload = function () {
            let canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            let ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0, image.width, image.height);
            let ext = image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase();
            let dataURL = canvas.toDataURL('image/' + ext);
            callback(dataURL);
          };
        }
        // 公众号和小程序
        if (platform == 'weixin' || platform == 'public') {
          // 保存相册
          if (urlsplits[0].split('.')[1] == 'savePhoto') {
            wx.downloadImage({
              serverId: JSON.parse(urlsplits[1].serverId), // 需要下载的图片的服务器端ID，由uploadImage接口获得
              isShowProgressTips: 1, // 默认为1，显示进度提示
              success: function (res) {
                callback(res);
              },
              fail: (err) => {
                if (err.errMsg === 'downloadImage:permission denied') {
                  throw Error('downloadImage 未在 wxConfig 内配置');
                }
                callback(res);
              },
            });
          }
          // 获取当前地理位置
          if (urlsplits[0].split('.')[1] == 'locServiceSetting') {
            wx.getLocation({
              type: urlsplits[1].split('=')[1] === 'gcj02' ? 'gcj02' : 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
              success: function (res) {
                callback(res);
              },
              fail: function (err) {
                callback(err);
              },
            });
          }
          // 打开内置地图显示
          if (urlsplits[0].split('.')[1] == 'openMap') {
            let mapOptions = JSON.parse(urlsplits[1].split('=')[1]);
            wx.openLocation({
              longitude: mapOptions.longitude,
              latitude: mapOptions.latitude,
              name: mapOptions.name,
              address: mapOptions.address,
              scale: mapOptions.scale,
            });
          }
        }
        // 支付宝小程序
        if (platform == 'alipay') {
          if (urlsplits[0].split('.')[1] == 'locServiceSetting') {
            my.getLocation({
              success(res) {
                callback(res);
              },
              fail(err) {
                callback(err);
              },
            });
          }
          // 打开内置地图显示
          if (urlsplits[0].split('.')[1] == 'openMap') {
            let mapOptions = JSON.parse(urlsplits[1].split('=')[1]);
            my.openLocation({
              longitude: mapOptions.longitude,
              latitude: mapOptions.latitude,
              name: mapOptions.name,
              address: mapOptions.address,
              scale: mapOptions.scale,
            });
          }
        }
      }
    } else {
      throw Error('配置文件未加载');
    }
  }
};
const listenViewappear = function () {
  const stageRespText = context.sessionGetString('stageRespData') || '';
  context.sessionSetString('stageRespData', '');
  if (stageRespText) {
    const stageRespData = JSON.parse(stageRespText);
    const callbackId = stageRespData.callbackId;
    const data = stageRespData.data;
    const handler = handlesMap[callbackId];
    if (callbackId && callbackId !== 'null' && handler) {
      handler(data);
      delete handlesMap[callbackId];
    }
  }
};
window.addEventListener('viewappear', listenViewappear);
const setStages = (options) => {
  localStorage.setItem('setStages', JSON.stringify(options));
};

const getParam = (options) => {
  if (platform == 'app') {
    return context.getParam(options);
  } else if (platform == 'weixin' || platform == 'alipay') {
    if (location.href.indexOf('?') !== -1) {
      return decodeURIComponent(location.href.split('?')[1])
        .split('&')[0]
        .split('=')[1];
    } else {
      return null;
    }
  } else if (platform == 'public' || platform == 'browser') {
    if (sessionStorage.getItem('routerParam')) {
      return JSON.parse(sessionStorage.getItem('routerParam'))[options] || null;
    } else {
      return null;
    }
  }
};
const finish = () => {
  if (platform == 'app') {
    return context.finish();
  } else if (platform == 'weixin') {
    return wx.miniProgram.navigateBack();
  } else if (platform == 'alipay') {
    return my.navigateBack();
  } else if (platform == 'public') {
    return wx.closeWindow();
  } else {
    var userAgent = navigator.userAgent;
    if (userAgent.indexOf('Firefox') != -1 || userAgent.indexOf('Chrome') != -1) {
      window.history.back();
      window.close();
    } else if (userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1) {
      window.history.back();
      window.close();
    } else {
      window.opener = null;
      window.close();
    }
  }
};
const finishTo = (options) => {
  if (platform == 'app') {
    return context.finishTo(options);
  } else if (platform == 'weixin') {
    return wx.miniProgram.navigateBack({
      delta: options,
    });
  } else if (platform == 'alipay') {
    return my.navigateBack({ delta: options });
  } else {
    return '暂不支持这个api';
  }
};
const returnHome = (options) => {
  if (platform == 'weixin') {
    return wx.miniProgram.navigateBack({
      delta: 99,
    });
  } else if (platform == 'public') {
    return wx.closeWindow();
  } else if (platform == 'alipay') {
    my.navigateBack({ delta: 99 });
  } else if (platform == 'browser') {
    var userAgent = navigator.userAgent;
    if (userAgent.indexOf('Firefox') != -1 || userAgent.indexOf('Chrome') != -1) {
      window.history.back();
      window.close();
    } else if (userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1) {
      window.history.back();
      window.close();
    } else {
      window.opener = null;
      window.close();
    }
  } else {
    return console.log('暂不支持这个api');
  }
};
const replaceStage = (options) => {
  if (platform == 'app') {
    return context.replaceStage(options);
  } else if (platform == 'weixin') {
    let menulist = JSON.parse(localStorage.getItem('setStages')).stages;
    if (options.indexOf('?') !== -1) {
      const urlsplits = stage.split('?');
      wx.miniProgram.redirectTo({
        url: `/pages/webView/index?src=${menulist[urlsplits[0].split('.')[1]].path}&${urlsplits[1]}`,
      });
    } else {
      const urlsplits = options.split('.');
      wx.miniProgram.redirectTo({
        url: `/pages/webView/index?src=${menulist[urlsplits[0].split('.')[1]].path}`,
      });
    }
  } else if (platform == 'public' || platform == 'browser') {
    let routerParam = {};
    if (sessionStorage.getItem('routerParam')) {
      routerParam = JSON.parse(sessionStorage.getItem('routerParam'));
      routerParam[urlsplits[0].split('.')[1]] = JSON.stringify(urlsplits[1].split('=')[1]);
    } else {
      routerParam[urlsplits[0].split('.')[1]] = JSON.stringify(urlsplits[1].split('=')[1]);
    }
    sessionStorage.setItem('routerParam', JSON.stringify(routerParam));
    window.location.replace(menulist[urlsplits[0].split('.')[1]].path);
  } else {
    // my.redirectTo()
    let menulist = JSON.parse(localStorage.getItem('setStages')).stages;
    if (options.indexOf('?') !== -1) {
      const urlsplits = options.split('?');
      my.redirectTo({
        url: `/pages/webView/index?src=${menulist[urlsplits[0].split('.')[1]].path}&${urlsplits[1]}`,
      });
    } else {
      console.log('jinnlaile ');
      const urlsplits = options.split('.');
      my.redirectTo({
        url: `/pages/webView/index?src=${menulist[urlsplits[0].split('.')[1]].path}`,
      });
    }
  }
};

var router = {
  launchStagePlus,
  launchStage,
  getParam,
  finish,
  finishTo,
  replaceStage,
  setStages,
  returnHome,
};

// options ==>   [{小程序配置参数 },{公众号配置参数},{MADP配置参数},{浏览器配置参数}]
const createClient = (options) => {
  if (platform == 'public' || platform == 'weixin') {
    return wx.config(options[1]);
  } else {
    return console.log('暂不支持这个api');
  }
};
const updateClient = (options) => {
  if (platform == 'public') {
    return wx.config(options[1]);
  } else {
    return console.log('暂不支持这个api');
  }
};

var event = document.createEvent('HTMLEvents');
event.initEvent('UniJSBridgeReady', true, true);
const setReady = () => {
  if (platform == 'public' || platform == 'weixin') {
    return new Promise((reslove, reject) => {
      wx.error(function (res) {
        reject(res);
      });
      wx.ready(function () {
        document.dispatchEvent(event);
        reslove();
      });
    });
  } else {
    return console.log('暂不支持这个api');
  }
};
const setError = () => {
  if (platform == 'public') {
    return new Promise(function (reslove, reject) {
      wx.error(function (res) {
        reslove(res);
      });
    });
  } else {
    return console.log('暂不支持这个api');
  }
};
const checkAPI = (options) => {
  if (platform == 'public' || platform == 'weixin') {
    return new Promise(function (reslove, reject) {
      wx.checkJsApi({
        jsApiList: options,
        success: function (res) {
          reslove(res);
        },
      });
    });
  } else {
    return console.log('暂不支持这个api');
  }
};
const postMessage = (options) => {
  if (platform == 'weixin') {
    return wx.miniProgram.postMessage({ data: options });
  } else if (platform == 'alipay') {
    my.postMessage({ data: options });
  } else {
    return console.log('暂不支持这个api');
  }
};
var client = {
  createClient,
  setReady,
  setError,
  checkAPI,
  updateClient,
  postMessage,
};

let uni = {
  platform: platform,
  sessionSetString: storage.sessionSetString,
  sessionGetString: storage.sessionGetString,
  sessionGetStringAsync: storage.sessionGetStringAsync,
  secureGetString: storage.secureGetString,
  secureGetStringAsync: storage.secureGetStringAsync,
  secureSetString: storage.secureSetString,
  setSession: storage.setSession,
  getSession: storage.getSession,
  getSessionAsync: storage.getSessionAsync,
  getSecure: storage.getSecure,
  getSecureAsync: storage.getSecureAsync,
  setSecure: storage.setSecure,
  removeSession: storage.removeSession,
  setKeys: storage.setKeys,
  removeSecure: storage.removeSecure,
  os: equipment.os,
  environment: equipment.environment,
  getDeviceID: equipment.getDeviceID,
  DeviceSignature: equipment.DeviceSignature,
  launchStage: router.launchStage,
  getParam: router.getParam,
  // redirectTo: router.redirectTo,
  launchStagePlus: router.launchStagePlus,
  finish: router.finish,
  setStages: router.setStages,
  finishTo: router.finishTo,
  returnHome: router.returnHome,
  replaceStage: router.replaceStage,
  createClient: client.createClient,
  setReady: client.setReady,
  setError: client.setError,
  checkAPI: client.checkAPI,
  postMessage: client.postMessage,
  // onShare: router.onShare,
  updateClient: client.updateClient,
};

export default uni;
