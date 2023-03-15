module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    context: true,
    getKeyboard: true,
    GVerify: true,
    initInput: true,
    packageDecrypt: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 没有debugger
    'no-var': 'error', // 不使用var定义变量
    eqeqeq: ['error', 'smart'], // 使用 === and !==
    'no-unused-vars': ['error', { vars: 'all' }], //禁止未使用v-for指令或作用域属性的变量定义
    camelcase: ['error', { properties: 'always' }], //强制驼峰命名
    'vue/html-quotes': 'warn', //强制HTML属性的引号样式
    'vue/no-unused-vars': 'error', ////禁止未使用v-for指令或作用域属性的变量定义
    'vue/component-tags-order': ['warn', { order: ['template', 'script', 'style'] }], // 强制组件顶级元素的顺序
    'vue/order-in-components': 'warn', //强制组件中属性的顺序
    'vue/attribute-hyphenation': 'warn', //在模板中的自定义组件上强制属性命名样式
    'vue/require-valid-default-prop': 'warn', //强制props默认值有效
    'vue/require-name-property': 'warn', // 在Vue组件中需要一个name属性
  },
};
