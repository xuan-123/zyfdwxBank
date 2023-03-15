/**
 * 多模块入口配置
 */
const businessArray = [
  // { chunk: 'calculator', chunkName: 'calculator' }, // 金融工具
  // { chunk: 'common', chunkName: 'common' }, // 公共模块: 微信通知，app下载
  // { chunk: 'credit-card', chunkName: 'credit-card' }, // 信用卡 *
  // { chunk: 'finance-deposit', chunkName: 'finance-deposit' }, // 投资理财、存款
  // { chunk: 'life', chunkName: 'life' }, // 缴费服务 *
  // { chunk: 'loan', chunkName: 'loan' }, // 贷款
  // { chunk: 'more', chunkName: 'more' }, // 更多
  // { chunk: 'my-account', chunkName: 'my-account' }, // 账户服务、在线开户 *
  // { chunk: 'reservation-service', chunkName: 'reservation-service' }, // 预约服务
  // { chunk: 'fund', chunkName: 'fund' }, // 基金
  // { chunk: 'sign', chunkName: 'sign' }, // 登录注册
  // { chunk: 'my-loan', chunkName: 'my-loan' }, //测试我的贷款
  { chunk: 'bind-card', chunkName: 'bind-card' }, //测试我的贷款

];

/** 以下的配置若看不懂请勿修改 **/
const modules = {};

if (process.env.NODE_ENV === 'production') {
  const pagesArr = businessArray.map((i) => i.chunk);
  if (pagesArr.includes(process.env.PROJECT_NAME)) {
    compile(businessArray[pagesArr.indexOf(process.env.PROJECT_NAME)]);
  }
} else {
  businessArray.forEach((v) => {
    // eslint-disable-next-line no-prototype-builtins
    if (modules.hasOwnProperty(v.chunk)) {
      throw new Error('modules配置存在同名模块，请修改');
    }
    compile(v);
  });
}

function compile(v) {
  modules[v.chunk] = {
    // page 的入口
    entry: `src/modules/${v.chunk}/main.js`,
    // 模板来源 默认为包template属性，没有设置则使用通用模版
    template: v.template || 'public/template.html',
    // 在 dist/index.html 的输出
    filename: process.env.NODE_ENV === 'production' ? 'index.html' : v.root ? 'index.html' : `${v.chunk}/index.html`,
    // 当使用 title 选项时，
    // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    title: v.chunkName || '',
    // 在这个页面中包含的块，默认情况下会包含
    // 提取出来的通用 chunk 和 vendor chunk。
    chunks: ['chunk-vendors', 'chunk-common', v.chunk],
    favicon: 'public/favicon.ico',
  };
}

module.exports = {
  businessArray,
  modules,
};
