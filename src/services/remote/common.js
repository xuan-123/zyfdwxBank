import errorCodes from '../../config/errorCodes';
import errors from './errors';
import encryt from '@/utils/encryt.js';
// import { packageEncrypt, packageDecrypt } from '../../../static/gm/csiiPackageEnc.min.js'

import utils from '@/utils';
import { Dialog } from '@csii/vx-mobile';

// 根据环境加载 api
export const apiObj = {
  browser: process.env.VUE_APP_WX_API, // 浏览器
  weixin: process.env.VUE_APP_MINI_API, // 小程序
  public: process.env.VUE_APP_WX_API, // 公众号
  alipay: process.env.VUE_APP_AliApp_API, // 支付宝小程序
};

// 统一拦截 错误处理
export const errorDispose = function(err) {
  let confirm = null;
  // 物理键返回上一层时，关闭弹窗
  window.addEventListener('popstate', () => {
    confirm && confirm.close();
  });
  // 密码控件超时 刷新页面
  if (err.code === 'h5.password.keyboard.timeout') {
    Dialog.alert({
      title: '温馨提示',
      content: err.message,
      onConfirm: () => {
        location.reload();
      },
    });
  }
  // 登录超时
  if (err.code === 'forceout.user' || err.code === 'invalid.user') {
    // 登录超时 清除登录状态 触发 小程序事件
    context.postMessage({ login: { isLogin: false } });
    context.setSecure('isLogin', false);
    context.removeSecure('identity');
    context.removeSecure('userName');
    context.removeSecure('cifLevel');
    context.removeSecure('gender');
    context.removeSecure('certificateValidity');
    context.removeSecure('elcContinue');
    // 判断是否登陆成功
    // 公众号 浏览器
    context.particularEnvFun(['public', 'browser'], () => {
      context.launchStagePlus(`main.auth?route=${document.URL}`, () => {
        window.APP_PAGE_ROOT.reload();
      });
    });
    // 支付宝/微信小程序
    context.particularEnvFun(['weixin', 'alipay'], () => {
      context.setSecure('fromRouter', document.URL);
      context.navigateTo('login');
    });
    return false;
  }
  // 未实名认证
  let level = JSON.parse(context.getSecureAsync('cifLevel'));
  if (err.code === '211110' || err.code === '30100061' || (err.code === '30101107' && Number(level) === 1)) {
    confirm = Dialog.confirm({
      title: '温馨提示',
      content: '您未实名认证，请下载app进行实名操作',
      onConfirm: () => {
        window.context.launchStage('main.download');
      },
      onCancel: () => {
        if (window.history.length === 1 && ['weixin', 'alipay'].includes(context.platform)) {
          context.navigateBack();
        } else {
          window.history.back();
        }
      },
    });
    return false;
  }
  // 未加挂账户
  if (err.code === '30101107' && Number(level) !== 1) {
    confirm = Dialog.confirm({
      title: '温馨提示',
      content: '您还没有加挂账户，请先开户或加挂账户',
      confirmText: '去开户',
      cancelText: '去加挂',
      closable: false,
      onConfirm: () => {
        // 公众号 浏览器
        context.particularEnvFun(['public', 'browser'], () => {
          context.launchStage('main.elcAccountOpen');
        });
        // 支付宝/微信小程序
        context.particularEnvFun(['weixin', 'alipay'], () => {
          context.navigateTo('login', 'elcAccountOpen');
        });
      },
      onCancel: () => {
        context.launchStage('main.addAccountPre');
      },
    });
    return false;
  }
  // 注册实名认证时，个人信息与预留信息不一致
  if (err.code === '30101698') {
    confirm = Dialog.confirm({
      title: '温馨提示',
      content: '您填写的个人信息与预留信息不一致，是否重新注册',
      onConfirm: () => {
        context.launchStage('main.register');
      },
    });
    return false;
  }

  return true;
};

// 请求拦截
export const requestInterceptor = function(config) {
  // let bankId = localStorage.getItem('_bankId');
  let thirdId = localStorage.getItem('thirdId');
  // let channelId = localStorage.getItem('channelId');

  // 交易随机标识yyyyMMddHHmmss + 两位渠道号(08改成12区别下) + 8位随机数，方便日志跟踪
  // let accessJnlNo = utils.dateUtil.getDate(null, null, 'YYYYMMDDHHmmss') + '12' + utils.uuid();
  const method = config.method;
  // 调用微信的JSSDK都要使用公众号的配置
  if (config.url === '/wxJsApiSignature.do') {
    // thirdId：pocWx; // poc环境
    // thirdId = 'wx31'; // 3.1环境
    thirdId = 'hfcsii'; // 3.2环境
  }
  // 公共字段
  const extendArgs = {
    _locale: 'zh_CN',
    _MChannelId: 'EIBS',
    // _accessJnlNo: accessJnlNo, // 必输
    LoginType: 'C', // 登录外必输
    _channelId: thirdId, // 必输
    // _terminalType: getEnv(), // 必输 类型
  };
  // 上送数据格式为multipart/form-data时，不进行加密处理
  if (config.headers['Content-Type'] === 'multipart/form-data') {
    config.data.append('_locale', 'zh_CN');
    config.data.append('_MChannelId', 'EIBS');
    config.data.append('LoginType', 'C');
    config.data.append('_channelId', channelId);
  } else {
    if (method === 'get' || method === 'put' || method === 'delete') {
      config.params = Object.assign({}, config.params || {}, extendArgs);
    } else {
      config.data = Object.assign({}, config.data || {}, extendArgs);
    }
  }
  // 加密上送参数
  if (process.env.VUE_APP_ENCRYPT === 'true') {
    console.log(config.url, config.data, '上送参数');
    let req = packageEncrypt(
      JSON.stringify(config.data),
      '3DC6D3597DF36CB2D6CE0C5FB5B6423361A94F2C3CA406592A17CEC3911AC7F64187F77AAAE22D4E085A67774FF28DB58A7A548A2F4E03971A0303C7CD11A343',
    ); //加密
    config.data = {};
    config.data.SecretString = req; //企业上送这段
    config.data.SecretHmc = '00067546047522054708867915934653'; //暂时写死
    // encryt.encrytSM(config);
  }

  return config;
};

// 响应拦截
export const transformResponse = function(response) {
  // .scene接口 需要获取_scenecode响应头信息
  // if (response.headers['_scenecode']) {
  //   localStorage.setItem('_scenecode', response.headers['_scenecode']);
  // }
  // text/ailnp 格式数据
  // if (response.headers['content-type'] && response.headers['content-type'].indexOf('text/plain') !== -1) {
  //   return response.data;
  // }
  let respData = null;
  // 判断是否加密
  if (process.env.VUE_APP_ENCRYPT === 'true') {
    console.log(response);
    var response = packageDecrypt(response.data.SecurityData);
    respData = JSON.parse(response);
    console.log(respData, '解密后的数据相应数据');
  } else {
    respData = response;
  }
  // return respData
  if (!respData) {
    return;
  }
  // 登录时手机号未注册过
  // if (respData.respCode === '30100109' && response.config.url === '/pweb/perLogintic.do') {
  //   throw new Error('您的账号密码输入不正确');
  // }
  //假定200是正常成功业务逻辑,respData.code:mock数据的，respData._RejCode：后端的
  if (respData._RejCode === '000000') {
    console.log(respData + '=============');
    return respData;
  } else {
    // 业务逻辑错误
    // const code = respData.respCode;
    // const message = respData.respMessage;
    // throw new errors.BuessinessError(code, message);
  }
};

const validateStatus = (status) => status >= 200 && status < 300;

export const catchError = function(error) {
  // axios 可能抛出的错误是 https://github.com/axios/axios/search?q=createError&unscoped_q=createError
  if (error && error.isAxiosError) {
    let message = error.message;
    let response = error.response;
    // http协议层错误处理 https://github.com/axios/axios/blob/885ada6d9b87801a57fe1d19f57304c315703079/lib/core/settle.js#L17
    if (response && !validateStatus(response.status)) {
      message = errorCodes.network[response.status] || response.statusText;
      throw new errors.NetworkError(response.status, message);
    }
    if (/timeout/.test(message)) {
      //客户端请求超时 https://github.com/axios/axios/blob/dc4bc49673943e35280e5df831f5c3d0347a9393/lib/adapters/xhr.js#L95
      message = '请求超时！';
    } else if (/aborted/.test(message)) {
      //客户端主动取消 https://github.com/axios/axios/blob/dc4bc49673943e35280e5df831f5c3d0347a9393/lib/adapters/xhr.js#L73
      message = '请求被取消！';
    } else if (/^Network/.test(message)) {
      //客户端网络连接失败 https://github.com/axios/axios/blob/dc4bc49673943e35280e5df831f5c3d0347a9393/lib/adapters/xhr.js#L83
      message = '网络连接错误！';
    } else {
      message = '未定义错误!!!';
    }
    throw new errors.ClientError(message);
  } else {
    throw error;
  }
};

/**
 * 判断当前环境 安卓 IOS 或者 PC
 * @returns {String} 返回当前环境
 */
function getEnv() {
  const u = navigator.userAgent;
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // 判断是安卓端
  const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // 判断是IOS端
  if (isAndroid) {
    return 'ANDROID';
  } else if (isIOS) {
    return 'IOS';
  } else {
    return 'PC';
  }
}
