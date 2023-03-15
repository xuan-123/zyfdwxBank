# 项目开发注意事项

- 1、分页，筛选条件代码里面要加上
- 2、repo_main.json

# mobile-standard-vx-base

## 该工程需要 vue cli 3.3+

```js
npm install -g @vue/cli
```

## 安装依赖

```sh
npm install
```

### 开发模式下编译并热更新

```sh
npm start
```

or

```sh
npm run serve
```

### 生产模式下编译并压缩

```sh
npm run build
```

### 执行 ESLint 检查，并修复

```sh
npm run lint
```

### 若 node 出现内存溢出

1、判断是否安装相关依赖包（cross-env、increase-memory-limit），若没有请执行，
若已经安装请跳过

```js
npm install cross-env increase-memory-limit -D
```

or 重新安装所有依赖

```js
npm install
```

2、安装完依赖后，请执行

```js
npm run fix-memory-limit
```

3、若是 mac 电脑，安装完后，运行 npm run build 可能会报错，请按照提醒进行修改

例如：node_modules/.bin/vue-cli-service 文件中有错误

```js
const requiredVersion = require('../package.json').engines.node --max-old-space-size=4096
```

改为

```js
const requiredVersion = require('../package.json').engines.node;
```

## 反馈问题

若需要反馈 bug 或提交建议请在[gitlab](http://172.16.60.132/vx-issues/toolchain-issues) 中创建一个 [issue](http://172.16.60.132/vx-issues/toolchain-issues/issues)，选择对应的模板，提交 bug 请选择 bug_template 模板，提交新需求请选择 feature_template 模板，按照提示添加内容。
   
## 资源文件

| 文件名称          | 链接地址                                                       |
| ----------------- | -------------------------------------------------------------- |
| 前端开发规范      | [地址](http://vx.csii.com.cn/norm/vx-dev-specification/#/)     |
| WX 标准版开发文档 | [地址](https://vx.csii.com.cn/prototype/weixin-standard-vx/#/) |
| utils 工具库      | [地址](https://vx.csii.com.cn/tool/v3UtilDocs)                 |
