import loadjs from 'loadjs';
const baseurl = process.env.VUE_APP_APIURL;

const depMaps = {
  echarts: [`${baseurl}/echarts.min.js`],
  smcrypto: [`${baseurl}/encrypt/smcrypto.min.js`],
  CWMediaCollector: [`${baseurl}/CWMediaCollector.js`],
  zepto: [`${baseurl}/zepto.min.js`],
};

const depStatus = {};

/**
 * echarts
 */
async function loadEcharts() {
  const label = 'echarts';
  if (!depStatus[label]) {
    await loadjs(depMaps[label], { returnPromise: true });
    depStatus[label] = true;
  }
}
/**
 * 密码加密
 */
async function loadSmcrypto() {
  const label = 'smcrypto';
  if (!depStatus[label]) {
    await loadjs(depMaps[label], { returnPromise: true });
    depStatus[label] = true;
  }
}

/**
 * 人脸相关依赖
 */
async function loadZepto() {
  const label = 'zepto';
  if (!depStatus[label]) {
    await loadjs(depMaps[label], { returnPromise: true });
    depStatus[label] = true;
  }
}
async function loadCWMediaCollector() {
  const label = 'CWMediaCollector';
  if (!depStatus[label]) {
    await loadjs(depMaps[label], { returnPromise: true });
    depStatus[label] = true;
  }
}

export { loadEcharts, loadSmcrypto, loadZepto, loadCWMediaCollector };
