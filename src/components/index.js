import Vue from 'vue';
import { components } from '@csii/pmobilebase';
const {
  TitleBar,
  InputValidate,
  VXVerifyCode,
  VxSelect,
  VxSelector,
  VxPrompt,
  VxInputAmount,
  VxLoadMore,
  VxResult,
  VxLetterList,
  // VxFilterPopup,
  VxInputSearch,
  VxFilterTitle,
  VxDetailItem,
  VxMenuItem,
  VxFoldable,
  VxCommonTitle,
} = components;

let Toast = Vue.prototype.$toast.component;
Vue.component('ui-toast', Toast);

Vue.component('title-bar', TitleBar); //标题
Vue.component('verify-code', VXVerifyCode); //验证码
Vue.component('vx-select', VxSelect); //联动
Vue.component('vx-selector', VxSelector); //下拉框
Vue.component('input-validate', InputValidate); //输入框
Vue.component('vx-prompt', VxPrompt); //温馨提示
Vue.component('vx-input-amount', VxInputAmount); //转账金额
Vue.component('vx-load-more', VxLoadMore); //加载更多
Vue.component('vx-result', VxResult); //结果页
// Vue.component('vx-filter-popup', VxFilterPopup); //popup弹出过滤
Vue.component('vx-input-search', VxInputSearch); //搜索
Vue.component('vx-filter-title', VxFilterTitle); //转账记录-头部筛选
Vue.component('vx-detail-item', VxDetailItem); //转账记录-item
Vue.component('vx-menu-item', VxMenuItem); //理财菜单
Vue.component('vx-foldable-info', VxFoldable); // 可折叠的信息展示
Vue.component('vx-letter-list', VxLetterList); //字母列表
Vue.component('vx-common-title', VxCommonTitle); //左侧有小图标的一集标题
import darg from '@/components/darg';
Vue.component('darg', darg);
