import Vue from 'vue';
import authorizationApi from '@/api/authorization.js';
import { getQueryVariable } from '@/utils/index';

/**
 * @description 路由拦截,取小程序链接传来的悬浮按钮的高度start,
 *  1、取到url
 *  2、转码
 *  3、保存到本地
 * */
//从链接取到从小程序传来的悬浮窗高度，
let miniBtnTop = getQueryVariable(document.URL, 'miniBtnTop');
//将链接的乱码转成正常字符串
let newminiBtnTop = decodeURIComponent(miniBtnTop);
//保存到本地
context.setSecure('currentBtnTop', newminiBtnTop);
/**
 * @description 路由拦截,取小程序链接传来的悬浮按钮的高度end,
 * */

let closeBtnTop = getQueryVariable(document.URL, 'closeBtn');
let closenewBtnTop = decodeURIComponent(closeBtnTop);
context.setSecure('showBtn', closenewBtnTop);

let isFirstEnter = false; // 判断是否首次进入
// 进页面前 需要前授权校验的路由
const Menu = ['accountManagement', 'elcAccountOpen', 'activation', 'fundHome', 'lifeHome'];
/**
 * @description 路由拦截,统一处理,
 *  1、Menu内页面需要走授权
 *  2、未登录拦截，跳转到登录页
 *  3、从登录页返回：未登录且不是模块首页，则跳转到模块首页
 * */
export async function routerFun(name, to, from, next) {
  // 模块主页路径
  let path = JSON.parse(context.getSecureAsync(name)) || to.path;
  if (!isFirstEnter) {
    // 进菜单前需要先登录的菜单
    ['weixin', 'alipay', 'public'].includes(context.platform) && Menu.includes(to.name) && (await wxAuth());
    isFirstEnter = true;
    // 存储模块首页路径
    context.setSecure(name, path);
    Vue.prototype.homeRoute = path;
  }
  // 获取登录状态
  let isLogin = JSON.parse(context.getSecureAsync('isLogin'));
  // 未登录状态 跳转到登录页
  if (!isLogin && to.meta.auth && from.name) {
    // 支付宝/微信小程序
    context.particularEnvFun(['weixin', 'alipay'], () => {
      context.setSecure('fromRouter', document.URL); // fromRouter 登录后返回路由
      context.navigateTo('login');
    });
    // 公众号 浏览器
    context.particularEnvFun(['public', 'browser'], () => {
      context.launchStage(`main.auth?route=${document.URL}`);
    });
    return;
  }
  // 从登录页返回：未登录且不是模块首页，则跳转到模块首页
  if (!isLogin && path !== to.path && to.meta.auth) {
    next(path);
    return;
  }
  next();
}

/**
 * @description 微信授权
 */
async function wxAuth() {
  // 判断有没有code
  let param = null;
  // 传参 page === login 时 跳过校验
  let page = getQueryVariable(window.location.href, 'page');
  if (page === 'login') {
    return;
  }
  // 支付宝和微信小程序环境
  context.particularEnvFun(['weixin', 'alipay'], () => {
    let data = getQueryVariable(document.URL, 'data');
    let newData = JSON.parse(decodeURIComponent(data) || '{}');
    param = newData.code;
  });
  // 浏览器环境 公共号环境
  context.particularEnvFun(['public', 'browser'], () => {
    param = getQueryVariable(document.URL, 'code');
  });

  console.log(param, 'param');
  // 有code，直接调用perWxWebAuth.do
  if (param) {
    await authorizationApi
      .perWxWebAuth({ code: param, loginType: 'R', handleError: true })
      .then((res) => {
        if (res.loginFlag) {
          // 返回登录成功的信息(在15分钟内关掉程序又进入时，不需要输入密码登录)
          context.setSecure('isLogin', true);
          context.setSecure('cifLevel', res.cifLevel);
          context.postMessage({ login: { isLogin: true, ...res } });
          return;
        }
        // 后端有返回手机号情况 更新手机号 未返回，则删除存储的手机号
        if (res.mobilePhone) {
          context.setSecure('mobilePhone', res.mobilePhone);
        } else {
          context.removeSecure('mobilePhone');
        }
        context.setSecure('isLogin', false);
        context.postMessage({ login: { isLogin: false } });
      })
      .catch(async (err) => {
        if (err.repsCode === 'wxpublic40163') {
          await checkWxOpenId();
        }
      });
  } else if (param === null) {
    await checkWxOpenId();
  }
}
// 如果没有获取到code，调用perCheckWxOpenId.do，获取appId
async function checkWxOpenId() {
  // 获取地址上的参数
  console.log(document.URL, '当前页面URI');
  await authorizationApi.perCheckWxOpenId().then((res) => {
    // 授权标识authFlag
    if (res.authFlag === 'false') {
      // 公众号 申请授权
      // window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
      //   URI,
      // )}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
      // 未授权直接跳授权页面
      context.launchStage(`main.auth?route=${window.location.href}`);
    } else if (res.authFlag === 'true') {
      // 退出状态 currentLoginState超时退出，forceOutFlag强制退出
      if (res.currentLoginState === '1' || res.forceOutFlag === '01') {
        context.postMessage({ login: { isLogin: false } });
        context.setSecure('isLogin', false);
      }
      context.setSecure('mobilePhone', res.mobilePhone);
      if (res.bindFlag === false) {
        console.log('weixin.js授权过，已解绑');
        context.postMessage({ login: { isLogin: false } });
        context.setSecure('isLogin', false);
        // 删除 本地存储的手机号
        context.removeSecure('mobilePhone');
        // 删除 绑定的标识
        context.removeSecure('isBindWxId');
      }
    }
  });
}

// 微信分享，仅在微信公众号的需求
export function shareFun(to) {
  // 公众号分享
  context.particularEnvFun(['public'], () => {
    let meta = to.meta;
    context.setReady().then(() => {
      /* eslint-disable */
      wx.hideMenuItems({
        menuList: ['menuItem:share:timeline'], // 要隐藏的菜单项
      });
      wx.onMenuShareAppMessage({
        title: meta.title || '微信银行标准版', // 分享标题
        desc: meta.desc || '自定义描述内容', // 分享描述
        link: `${document.URL.split('#')[0]}#${Vue.prototype.homeRoute}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: `${window.location.origin}${process.env.VUE_APP_PREFIX}static/csii.png`, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        success: function () {
          // 用户点击了分享后执行的回调函数
        },
        fail: function (err) {
          if (err.errMsg === 'onMenuShareAppMessage:permission denied') {
            throw Error('onMenuShareAppMessage 未在 wxConfig 内配置');
          }
        },
      });
      /* eslint-enable */
    });
  });
}
