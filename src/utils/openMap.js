export default function openMap(detail) {
  // 判断是否是微信环境 且 加载了 wxjdk
  context.particularEnvFun(['weixin', 'public'], () => {
    /* eslint-disable */
    wx.openLocation({
      // 后台返回的是String，必须转成Number在IOS上才不会报错
      latitude: Number(detail.lat), // 纬度，浮点数，范围为90 ~ -90
      longitude: Number(detail.lon), // 经度，浮点数，范围为180 ~ -180。
      name: detail.deptName || detail.mapNodeName, // 位置名
      address: detail.addr || detail.nodeAddr, // 地址详情说明
      scale: 14, // 地图缩放级别,整型值,范围从1~28。默认为最大
      infoUrl: '', // 在查看位置界面底部显示的超链接,可点击跳转
      fail: (err) => {
        if (err.errMsg === 'openLocation:permission denied') {
          throw Error('openLocation 未在 wxConfig 内配置');
        }
      },
    });
    /* eslint-disable */
  });

  // 支付宝小程序内调用
  context.particularEnvFun(['alipay'], () => {
    my.openLocation({
      longitude: Number(detail.lon),
      latitude: Number(detail.lat),
      name: detail.deptName || detail.mapNodeName,
      address: detail.addr || detail.nodeAddr,
      scale: 14,
      fail: (err) => {
        throw Error(err);
      },
    });
  });

  // h5 环境执行
  context.particularEnvFun(['browser'], () => {
    // H5通过url打开高德地图 https://lbs.amap.com/api/uri-api/guide/mobile-web/point
    window.location.href = `https://uri.amap.com/marker?position=${detail.lon},${detail.lat}&name=${detail.deptName ||
      detail.mapNodeName}&src=wgs84&coordinate=gaode&callnative=1`;
  });
}
