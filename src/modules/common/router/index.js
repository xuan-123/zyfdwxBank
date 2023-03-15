import Vue from 'vue';
import VueRouter from 'vue-router';
import { shareFun } from '@/common/auth';
Vue.use(VueRouter);

const download = () => import('../views/app-download'); // app下载
const message = () => import('../views/wx-message'); // 消息通知

const routes = [
  {
    path: '/download',
    name: 'download',
    component: download,
    meta: {
      title: 'APP下载',
    },
  },
  {
    path: '/message',
    name: 'message',
    component: message,
    meta: {
      title: '微信通知',
    },
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior() {
    if (document.querySelector('#app')) {
      document.querySelector('#app').scrollTop = 0;
    }
  },
});

let flag = false;
router.beforeEach((to, from, next) => {
  if (!flag) {
    flag = true;
    Vue.prototype.homeRoute = to.path;
  }
  window.scrollTo(0, 0);
  next();
});

router.afterEach((to, from) => {
  shareFun(to, from);
});

export default router;
