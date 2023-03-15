import Vue from 'vue';
import App from './App.vue';
import router from './router';

import common from '@/common';
Vue.config.productionTip = false;

common.ready(() => {
  new Vue({
    name: 'band-card',
    router,
    render: (h) => h(App),
  }).$mount('#app');
});
