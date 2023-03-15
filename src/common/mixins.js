import Vue from 'vue';
import $locale from '@/config/locale';
import tokenSvc from '@/services/token';
import { Dialog } from '@csii/vx-mobile';
import wxjssdkApi from '@/api/wxjssdk';

Vue.mixin({
  name: 'mixin',
  data() {
    return {
      imgUrl: `${process.env.VUE_APP_API}perFilePreview.do?_bankId=${localStorage.getItem('_bankId')}&filePath=`,
    };
  },
  methods: {
    // 相当于定义全局方法
    $field: function(key) {
      return $locale.FIELDS[key];
    },
    $msg: function(key) {
      return $locale.MESSAGES[key];
    },
    $filter: function(key) {
      return this.$options.filters[key];
    },
    goto(path) {
      this.$router.push(path);
    },
    // 同一模块内，返回上一页
    goback() {
      this.$router.back();
    },
    // 中间有模块跳转的，返回上一页
    homeBack() {
      // 公众号 浏览器
      context.particularEnvFun(['public', 'browser'], () => {
        window.history.back();
      });
      // 支付宝/微信小程序
      context.particularEnvFun(['weixin', 'alipay'], () => {
        if (window.history.length === 1) {
          context.navigateBack();
        } else {
          window.history.back();
        }
      });
    },
    // 获得防重复提交token
    getToken(apikey) {
      tokenSvc.refreshToken(apikey);
    },
    $confirm(options, onConfirm, onCancel) {
      let title = '温馨提示';
      let content = '';
      let confirmText = '确定';
      let cancelText = '取消';
      let closable = false;
      if (typeof options === 'object') {
        title = options.title || '温馨提示';
        confirmText = options.confirmText || '确定';
        content = options.content;
        cancelText = options.cancelText || '取消';
        closable = options.closable || false;
      } else if (typeof options === 'string') {
        content = options;
      }
      return Dialog.confirm({
        title: title,
        content: content,
        confirmText: confirmText,
        cancelText: cancelText,
        closable: closable,
        onConfirm: () => {
          onConfirm && onConfirm();
        },
        onCancel: () => {
          onCancel && onCancel();
        },
      });
    },
    $alert(options, cb) {
      let title = '';
      let content = '';
      let confirmText = '确定';
      if (typeof options === 'object') {
        title = options.title || '';
        confirmText = options.confirmText || '确定';
        content = options.content;
      } else if (typeof options === 'string') {
        content = options;
      }
      return Dialog.alert({
        title: title,
        content: content,
        confirmText: confirmText,
        onConfirm: () => {
          cb && cb();
        },
      });
    },
    // 跳转到登录
    goToLogin() {
      // 公众号 浏览器，跳转到微信的授权页
      context.particularEnvFun(['public'], () => {
        context.launchStage(`main.auth?route=${document.URL}`);
      });
      // 浏览器 无需授权，跳转到登录页
      context.particularEnvFun(['browser'], () => {
        context.launchStage(`main.login?route=${document.URL}`);
      });
      // 支付宝/微信小程序 需要先跳转到小程序壳子授权
      context.particularEnvFun(['weixin', 'alipay'], () => {
        context.setSecure('fromRouter', document.URL);
        context.navigateTo('login');
      });
    },
    /**
     * @description 跳转前往APP下载
     */
    downloadApp() {
      context.launchStage('main.download');
    },
    /**
     * @description 请求错误处理
     * @param {Object} 错误提示
     * @param {callback} 未登录状态，登录成功后执行的回调方法
     */
    remoteAlert(err, callback) {
      let confirm = null;
      // 返回上一页时，关闭弹窗
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
        return;
      }

      // 登录超时、未登录
      if (err.code === 'forceout.user' || err.code === '10200023') {
        // 登录超时 清除登录状态 触发 小程序事件
        context.postMessage({ login: { isLogin: false } });
        context.setSecure('isLogin', false);
        context.removeSecure('identity');
        context.removeSecure('userName');
        context.removeSecure('cifLevel');
        context.removeSecure('gender');
        context.removeSecure('certificateValidity');
        context.removeSecure('elcContinue');
        // 公众号 浏览器
        context.particularEnvFun(['public', 'browser'], () => {
          context.launchStagePlus(`main.auth?route=${document.URL}`, () => {
            callback();
          });
        });
        // 支付宝/微信小程序
        context.particularEnvFun(['weixin', 'alipay'], () => {
          // 小程序内需要存到 local 内
          context.setSecure('fromRouter', document.URL);
          context.navigateTo('login');
        });
        return;
      }
      // 未实名 及 未加挂或未开户
      if (err.code === 'no.account' || err.code === '30101107') {
        let level = JSON.parse(context.getSecureAsync('cifLevel'));
        if (Number(level) === 1) {
          // 未实名认证
          confirm = this.$confirm(
            { content: '您未实名认证，请下载app进行实名操作' },
            () => {
              context.launchStage('main.download');
            },
            () => {
              this.homeBack();
            },
          );
        } else {
          // 未加挂或未开户账号处理
          confirm = this.$confirm(
            { content: err.message, confirmText: '去开户', cancelText: '去加挂', closable: false },
            () => {
              // 需要走授权页  再跳转至相应模块页面
              // 公众号 浏览器
              context.particularEnvFun(['public', 'browser'], () => {
                context.launchStage('main.elcAccountOpen');
              });
              // 支付宝/微信小程序
              context.particularEnvFun(['weixin', 'alipay'], () => {
                context.navigateTo('login', 'elcAccountOpen');
              });
            },
            () => {
              context.launchStage('main.addAccountPre');
            },
          );
        }
        return;
      }
      // 未实名认证
      if (err.code === '211110' || err.code === '30100061') {
        confirm = this.$confirm(
          { content: '您未实名认证，请下载app进行实名操作' },
          () => {
            context.launchStage('main.download');
          },
          () => {
            this.homeBack();
          },
        );
        return;
      }
      // 信息不一致
      if (err.code === '30101698') {
        // 注册实名认证时，个人信息与预留信息不一致
        confirm = this.$confirm({ content: '您填写的个人信息与预留信息不一致，是否重新注册' }, () => {
          context.launchStage('main.register');
        });
        return;
      }
      confirm = Dialog.alert({
        title: '温馨提示',
        content: err.message,
        // onConfirm: () => {
        //   this.homeBack();
        // },
      });
    },

    /**
     * @description 抛出错误
     * @param {String} 错误码值
     * @param {String} 错误提示
     * @example
     * throw this.thorwErrow('no.account', '您还没有加挂账户，请先开户或加挂账户');
     */
    thorwErrow(code, message) {
      const _this = Error.call(this, message) || this;
      _this.code = code;
      return _this;
    },
    /**
     * @description 微信 wx.config 环境准备
     * @param {Array} 需要调用的方法数组
     * @example
     * this.wxConfig(['chooseImage'])
     */
    wxConfig(list = [], tagList = []) {
      // 加载 wx 配置
      let isWeiXin = /MicroMessenger/i.test(window.navigator.userAgent);
      isWeiXin &&
        wxjssdkApi.getWxJsApiSignature({ url: window.location.href.split('#')[0] }).then((res) => {
          let configInfo = [
            {},
            {
              // debug: true,
              appId: res.appId,
              timestamp: res.timestamp,
              nonceStr: res.nonceStr,
              signature: res.signature,
              jsApiList: list,
              openTagList: tagList,
            },
            {},
            {},
          ];
          context.createClient(configInfo);
        });
    },
  },
});
