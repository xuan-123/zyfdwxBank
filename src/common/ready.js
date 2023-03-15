import themeSvc from '@/services/theme';

async function fetchData() {
  // 获取应用启动前准备数据(如主题)
  if (!themeSvc.theme) {
    await themeSvc.fetchTheme();
    themeSvc.applyTheme();
  }
}

export default async function ready(callback) {
  try {
    await fetchData();
    callback({ userinfo: { name: 'zhangsan' } });
  } catch (err) {
    console.log(err);
  }
}
