import Vue from 'vue';
// 引入公共样式
import '@/assets/style/common.scss';
import { getQueryVariable } from '@/utils/index';
console.log('**************!!!!!!!!!!!!!*************');
console.log(context.platform, 'platform');
console.log('**************!!!!!!!!!!!!!*************');

// local 存储加前缀，ISO的公众号和小程序的webview内local互通
let prefix = {
  browser: '', // 浏览器
  weixin: 'wx-', // 小程序
  public: '', // 公众号
};
const channelObj = {
  weixin: 'PWBS', // 小程序
  public: 'PPBS', // 公众号
  browser: 'PPBS', // 公众号
  alipay: 'PZBS', // 支付宝
};
context.setKeys(prefix[context.platform]);
// 存储页面配置
const json = require('@/config/repo_main.json');
// 路径上加服务器部署的前缀
for (let index in json.stages) {
  if (Object.hasOwnProperty.call(json.stages[index], 'path')) {
    // 公众号和浏览器的路径加前缀
    context.particularEnvFun(['public', 'browser'], () => {
      json.stages[index].path = `${process.env.VUE_APP_PREFIX}${json.stages[index].path}`;
    });

    if (process.env.NODE_ENV === 'development') {
      json.stages[index].path = json.stages[index].path && json.stages[index].path.replace('/#/', '#/');
    }
  }
}
context.setStages(json);

// 环境判断 并进行相应处理
import { hooks, components } from '@csii/pmobilebase';
const { TitleBar } = components;
// 小程序不加titlebar组件 不需要设置padding-top，false: padding-top 30， true: padding-top 0
hooks.useFlexible(['weixin', 'alipay'].includes(context.platform));
hooks.useFastclick();
// 按需修改 TitleBar 组件，小程序不显示
TitleBar.props.show.default = !['weixin', 'alipay'].includes(context.platform);
Vue.component('title-bar', TitleBar); //标题组件

// 后端在微信入口菜单上配置了 _bankId thirdId，在项目初始化时 可获取 _bankId，thirdId
let _bankId = getQueryVariable(window.location.href, '_bankId') || '1001';
_bankId && localStorage.setItem('_bankId', _bankId);
let thirdId = getQueryVariable(window.location.href, 'thirdId') || 'hfcsii';
thirdId && localStorage.setItem('thirdId', thirdId);
localStorage.setItem('channelId', channelObj[context.platform]);

// 安卓软键盘弹起问题 start
let Height = document.body.clientHeight;
window.addEventListener('resize', function() {
  document.body.style.height = Height + 'px';
});
// 安卓软键盘弹起问题 end

// 苹果缓存 back 页面后 不刷新
window.onpageshow = function(event) {
  if (event.persisted) {
    window.location.reload();
  }
};
