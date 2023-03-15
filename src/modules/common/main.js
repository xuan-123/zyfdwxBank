import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import common from '@/common';

Vue.config.productionTip = false;

Vue.config.ignoredElements = ['wx-open-launch-app'];

common.ready(() => {
  new Vue({
    name: 'transfer',
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
});
