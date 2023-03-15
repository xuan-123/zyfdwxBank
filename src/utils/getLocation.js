/**
 * @description 获取定位方法
 * @returns {Object} {latitude, longitude} 返回位置相关信息
 * latitude 纬度
 * longitude 经度
 * accuracy 位置精度
 * err js获取失败错误
 * code 0 浏览器不支持
 * code 1 地理位置信息的获取失败，因为该页面没有获取地理位置信息的权限
 * code 2 地理位置获取失败，因为至少有一个内部位置源返回一个内部错误。
 * code 3 获取地理位置超时，通过定义PositionOptions.timeout 来设置获取地理位置的超时时长。
 *
 * err.errMsg 微信环境 获取失败错误
 *
 */

export function getLocation() {
  return new Promise((resolve, reject) => {
    // 判断环境，在微信公众号和微信小程序内执行
    context.particularEnvFun(['weixin', 'public'], () => {
      context.launchStagePlus('main.locServiceSetting?data=gcj02', function(res0) {
        if (res0.errMsg && res0.errMsg.indexOf('getLocation:ok') !== -1) {
          resolve(res0);
        } else if (res0.errMsg === 'getLocation:permission denied') {
          throw Error('chooseImage 未在 wxConfig 内配置');
        } else {
          reject(res0);
        }
      });
    });

    // 支付宝小程序环境
    context.particularEnvFun(['alipay'], () => {
      context.launchStagePlus("main.locServiceSetting?data='gcj02'", function(res1) {
        if (res1 && res1.error) {
          reject(res1);
        } else {
          resolve(res1);
        }
      });
    });

    // H5环境下执行H5获取位置信息 且 地理位置服务可用
    context.particularEnvFun(['browser'], () => {
      'geolocation' in window.navigator
        ? window.navigator.geolocation.getCurrentPosition(
            function(pos) {
              let crd = pos.coords;
              let newCrd = wgs84togcj02(crd.longitude, crd.latitude); // WGS84转GCj02
              resolve(newCrd);
            },
            function(err) {
              reject(err);
            },
            {
              enableHighAccuracy: true, // 是否高精度
              maximumAge: 30000, // 等待获取位置信息的最长时间
              timeout: 27000, // 上一次获取位置信息的有效时间
            },
          )
        : reject({ code: 0, message: '您的浏览器不支持获取地理位置' });
    });
  });
}

let PI = 3.1415926535897932384626;
let a = 6378245.0;
let ee = 0.00669342162296594323;

/**
 * 判断是否在国内，不在国内则不做偏移
 * @param lng
 * @param lat
 * @returns {boolean}
 */
function outOfChina(lng, lat) {
  return lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271;
}

function transformlat(lng, lat) {
  let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
  ret += ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0) / 3.0;
  ret += ((20.0 * Math.sin(lat * PI) + 40.0 * Math.sin((lat / 3.0) * PI)) * 2.0) / 3.0;
  ret += ((160.0 * Math.sin((lat / 12.0) * PI) + 320 * Math.sin((lat * PI) / 30.0)) * 2.0) / 3.0;
  return ret;
}

function transformlng(lng, lat) {
  let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
  ret += ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0) / 3.0;
  ret += ((20.0 * Math.sin(lng * PI) + 40.0 * Math.sin((lng / 3.0) * PI)) * 2.0) / 3.0;
  ret += ((150.0 * Math.sin((lng / 12.0) * PI) + 300.0 * Math.sin((lng / 30.0) * PI)) * 2.0) / 3.0;
  return ret;
}

/**
 * WGS84转GCj02
 * @param lng
 * @param lat
 * @returns {*[]}
 */

function wgs84togcj02(lng, lat) {
  if (outOfChina(lng, lat)) {
    return {
      longitude: lng,
      latitude: lat,
    };
  } else {
    let dlat = transformlat(lng - 105.0, lat - 35.0);
    let dlng = transformlng(lng - 105.0, lat - 35.0);
    let radlat = (lat / 180.0) * PI;
    let magic = Math.sin(radlat);
    magic = 1 - ee * magic * magic;
    let sqrtmagic = Math.sqrt(magic);
    dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * PI);
    dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI);
    let mglat = lat + dlat;
    let mglng = lng + dlng;
    return {
      longitude: mglng,
      latitude: mglat,
    };
  }
}
