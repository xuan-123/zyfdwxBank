import Vue from 'vue';
import VueRouter from 'vue-router';
import { routerFun, shareFun } from '@/common/auth';
Vue.use(VueRouter);
//首页
const home = () => import('../views/index');
const SignPre = () => import('../views/SignPre/SignPre');
const SignRes = () => import('../views/SignPre/SignRes');
//存款

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    meta: { title: '绑卡' },
    component: home,
  },
  {
    path: '/SignPre',
    name: 'SignPre',
    meta: { title: '' },
    component: SignPre,
  },
  {
    path: '/SignRes',
    name: 'SignRes',
    meta: { title: '' },
    component: SignRes,
  },
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  routerFun('card-bind-homeRoute', to, from, next);
});
router.afterEach((to, from) => {
  shareFun(to, from);
});

export default router;
