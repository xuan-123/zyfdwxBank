import utils from '@/utils';
export default {
  theme: '',
  // 获取当前使用主题
  getCurrent() {
    return this.theme;
  },
  // 获取可设置主题
  getThemeList() {
    return [
      { name: 'skin-red', desc: '激情红' },
      { name: 'skin-default', desc: '默认蓝' },
    ];
  },
  // 获取设置主题（数据在本地保存或远程保存)
  fetchTheme() {
    let themeName = utils.localCache.getItem('theme');
    this.theme = themeName || 'skin-default';
    return this.theme;
  },
  // 保存主题到本地或服务器
  saveTheme(themeName) {
    utils.localCache.setItem('theme', themeName);
    this.theme = themeName;
  },
  // 应用主题
  applyTheme() {
    let themeName = this.theme;
    const classStr = document.body.classList.value;
    let cls = classStr.replace(/skin-[a-z]+/g, '');
    document.body.className = cls + ' ' + themeName;
  },
};
