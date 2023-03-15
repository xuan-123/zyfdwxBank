const proxyConfig = require('./build/proxy.config');

const path = require('path');

const { modules } = require('./build/modules.config');
// 覆盖默认配置，或添加一些新的配置

module.exports = {
  pages: modules,
  // publicPath: process.env.NODE_ENV === 'production' ? `/${process.env.PROJECT_NAME}/` : './', // 根据你的实际情况更改这里
  publicPath: './', // 根据你的实际情况更改这里
  outputDir: `dist/web/${process.env.PROJECT_NAME}`,
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    proxy: {
      ...proxyConfig,
    },
    contentBase: path.join(__dirname, 'static'),
    contentBasePublicPath: '/static',
    // disableHostCheck: true,
  },

  // lintOnSave: false,//保存时不检测eslint
  configureWebpack: (config) => {
    // 移除不需要打包分析的库，加速编译
    config.externals = {
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      axios: 'axios',
      lodash: '_',
      'chart.js': 'Chart',
      'vue-i18n': 'VueI18n',
      'crypto-js': 'CryptoJS',
      'core-js': 'core-js',
      'vee-validate': 'VeeValidate',
      '@csii/vx-mobile': 'VxMobile',
      '@csii/pmobilebase': 'pmobilebase',
    };
  },
};
