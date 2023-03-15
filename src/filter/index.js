import Vue from 'vue';

// 引入 utils 内的自定义 filter
import { utils } from '@csii/pmobilebase';
const { dateFormat, limitLen, phoneMask, amount, currency, formatString, number, wordcut, wordencrypt, numberUnit } = utils;

Vue.filter('dateFilter', dateFormat);
Vue.filter('limitLenFilter', limitLen);
Vue.filter('phoneHideFilter', phoneMask);
Vue.filter('amountFilter', amount);
Vue.filter('currencyFilter', currency);
Vue.filter('formatStringFilter', formatString);
Vue.filter('numberFilter', number);
Vue.filter('wordcutFilter', wordcut);
Vue.filter('wordencryptFilter', wordencrypt);
Vue.filter('numberUnitFilter', numberUnit);

// 自动引入filter目录下自定义的filter
const files = require.context('./', true, /[^index]\.js$/);
files.keys().forEach((key) => {
  let obj = files(key).default;
  let keyObj = Object.keys(obj)[0];
  let value = Object.values(obj)[0];
  Vue.filter(keyObj, value);
});
