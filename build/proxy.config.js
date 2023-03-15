/**
 * 导出反向代理配置
 * 仅生效于本地开发环境
 * @param {String} bashHost 目标域名
 */
const recordProxyJson = require('./recordProxyJson');
const saveJSON = process.env.NODE_ENV === 'development' && process.env.VUE_APP_SAVE_JSON === 'true';

// const bashHost = 'http://csiihf.tpddns.cn:9000';
// const bashHost = 'http://192.168.0.91:8020';
const bashHost = 'https://ebank.bocfullertonbank.com/';
// const bashHost = 'http://192.168.0.81:8020';
// const bashHost = 'http://www.csiihf.tech:9001';
// const theHallHost = 'https://test.hf.csii.com.cn';
const theHallHost = 'http://www.csiihf.tech:9000';

module.exports = {
  // 网页
  '/pweweb': {
    target: bashHost, //bashHost是跟着/eweb走的，会在.env和.env.production对应系统配置。
    changeOrigin: true,
    onProxyRes: saveJSON ? recordProxyJson : null,
    pathRewrite: {
      '^/pweweb': '/pweweb',
    },
  }, // 网页
  '/pphall': {
    target: theHallHost,
    changeOrigin: true,
    onProxyRes: saveJSON ? recordProxyJson : null,
    pathRewrite: {
      '^/pphall': '/pphall',
    },
  }, // 微厅
  '/32pminiweb': {
    target: bashHost,
    changeOrigin: true,
    onProxyRes: saveJSON ? recordProxyJson : null,
    pathRewrite: {
      '^/32pminiweb': '/32pminiweb',
    },
  }, // 小程序
  '32zbfpminiweb': {
    target: bashHost,
    changeOrigin: true,
    onProxyRes: saveJSON ? recordProxyJson : null,
    pathRewrite: {
      '^/32zbfpminiweb': '/32zbfpminiweb',
    },
  },
  '/32pwxweb': {
    target: bashHost,
    changeOrigin: true,
    onProxyRes: saveJSON ? recordProxyJson : null,
    pathRewrite: {
      '^/32pwxweb': '/32pwxweb',
    },
  }, // 公众号
  '/pwebs': {
    target: bashHost,
    changeOrigin: true,
    onProxyRes: saveJSON ? recordProxyJson : null,
    pathRewrite: {
      '^/pwebs': '/pwebs',
    },
  },
  '/file': {
    target: bashHost,
    changeOrigin: true,
    onProxyRes: saveJSON ? recordProxyJson : null,
    pathRewrite: {
      '^/pwebs': '/pwebs',
    },
  }, // 文件上传
};
