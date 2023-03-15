import Vue from 'vue';
import VueRouter from 'vue-router';

import '@/filter';
import 'normalize.css/normalize.css';

import '@/validate';
import ready from './ready';
import '@csii/vx-debugger';

// 引入组件库
import VXMobile from '@csii/vx-mobile';
Vue.use(VXMobile);
// 引入全局组件
import '@/components';

// 引入 jsApi 用于抹平不同端的差异
import '@/services/context';

// 全局过滤器、服务、自定义指令、枚举值
import '@/common/mixins';

// 引入 weixin 环境处理内容
import './weixin.js';

import utils from '@/utils';
Vue.prototype.$utils = utils;

Vue.config.productionTip = false;

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
VueRouter.prototype.beforeEach = function beforeEach(location) {
  return originalPush.call(this, location).catch((err) => err);
};
Vue.use(VueRouter);

export default { ready };
