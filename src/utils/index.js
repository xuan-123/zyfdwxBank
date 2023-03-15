import { utils } from '@csii/pmobilebase';

export default utils;

// import { services } from '@csii/pmobilebase';
// const { ThemeService， StorageService } = services;
// 需要按需求修改
// let themeSer = new ThemeService({
//   theme: '',
//   themeList: [],
// });
// themeSer.fetchTheme(); // 获取设置主题
// themeSer.saveTheme(); // 保存主题
// themeSer.applyTheme(); // 应用主题
// let storageSer = new StorageService({
//   label: '',
//   storageType: '', // sessionStorage/localStorage
// });
// storageSer.setData
// storageSer.getData
// storageSer.removeData
// storageSer.clearData

/**
 * @csii/pmobilebase 内方法统计
 * useFastclick 苹果点击优化
 * useFlexible fontSize设置及 参数为 madp 时，顶部加 padding 30
 * StorageService 数据存储 class 的形式 封装 sessionStorage/localStorage 未导出
 * ThemeService 主题设置
 *
 * 引入vx-util方法，*表示已注入全局过滤器
 * chinese2PY 汉字转拼音
 * dateUtil
 * pinyin
 * isEmpty
 * amount *
 * currency *
 * formatString *
 * number *
 * wordcut *
 * wordencrypt *
 * numberUnit *
 * setContextData
 * getContextData
 * 新增方法
 * dateFormat * 日期格式化
 * limitLen * 删除字符串前几位
 * phoneMask * 手机号隐藏中间四位
 * getTitleHeight 动态设置头部高度（仅madp） context.getParam，context.sessionGetString
 * pxToRem
 * localCache 封装 localStorage，方法名一致
 * uuid 随机字符串
 * dictToMap 列表型映射转字典型映射
 * mapToDict 字典型映射转列表型映射
 */

// utils下 模块重定向
export { timeBetween, shareText, getUrlParams, getQueryVariable, urlToBlob, requireImage, copyText, dataURLtoFile, loadScript } from './commonUtils';

export { regex } from './regex';
