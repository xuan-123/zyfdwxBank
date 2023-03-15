/**
 * @file 公共方法
 */

/**
 * @description 获取 Url 参数
 * @param {String} url路径
 * @returns {Object} 返回参数对象
 * @example
 * getUrlParams('http://www.csii.com.cn?id=123&no=456') => {id: 123, no: 456}
 */

function getUrlParams(url) {
  let str;
  let newStr;
  let params = Object.create(null);
  // 判断链接后 是否有参数
  if (url.indexOf('?') !== -1) {
    str = url.split('?')[1];
    // 判断参数 是否为 多个
    if (str.indexOf('&') !== -1) {
      newStr = str.split('&');
      newStr.forEach((value) => {
        if (value.split('=').length > 2) {
          let pos = value.indexOf('=');
          let val = value.substring(0, pos);
          params[val] = value.substring(pos + 1);
        } else {
          let Value = value.split('=')[0];
          params[Value] = value.split('=')[1];
        }
      });
    } else {
      newStr = str.toString().split('=');
      if (newStr.toString().split('=').length > 2) {
        let pos = newStr.indexOf('=');
        let val = newStr.substring(0, pos);
        params[val] = newStr.substring(pos + 1);
      } else {
        let Value = newStr[0];
        params[Value] = newStr[1];
      }
    }
  }
  return params;
}

/**
 * @description 获取 url 固定参数
 * @param {String} url路径
 * @param {String} 参数名
 * @returns {String} 参数名对应内容
 * @example
 * getQueryVariable('http://www.csii.com.cn?id=123&no=456','id') => 123
 */
function getQueryVariable(url, variable) {
  return getUrlParams(url)[variable] || null;
}

/**
 * @description 文件压缩
 * @param {file} file 文件，event.target.files[0]
 * @param {String|Number} 压缩系数
 * @param {Boolean} 是否返回base64文件
 * @returns {file} 压缩后文件
 */
// function compressorFiles(files = {}, quality = 1, base64 = false) {
//   return new Promise((resolve, reject) => {
//     if (!files) {
//       return reject();
//     }
//     new Compressor(files, {
//       quality, //压缩系数
//       success(resultFiles) {
//         if (base64) {
//           let render = new FileReader();
//           render.readAsDataURL(resultFiles);
//           render.onload = (event) => {
//             resolve(event.target.result);
//           };
//         } else {
//           resolve(resultFiles);
//         }
//       },
//     });
//   });
// }

/**
 * @description url转bolb
 * @param {String} 路径
 * @returns {String} 转为bolb后的路径
 */
function urlToBlob(url) {
  return new Promise((resolve) => {
    let xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'blob';
    xhr.onload = function() {
      if (this.status === 200) {
        let data = URL.createObjectURL(this.response);
        resolve(data);
      }
    };
    xhr.send();
  });
}

/**
 * @description 引入本地图片F
 */
function requireImage(location = '', image = '') {
  let localImage = require(`../assets/${location}/${image}`);
  return new Promise((resolve) => {
    urlToBlob(localImage).then((res) => {
      resolve(res);
    });
  });
}

/**
 * @description 复制 text
 * @param {String} 需要复制的内容
 */
function copyText(text) {
  return new Promise((resolve, reject) => {
    // 数字没有 .length 不能执行selectText 需要转化成字符串
    const textString = text.toString();
    let input = document.querySelector('#copy-input');
    if (!input) {
      input = document.createElement('input');
      input.id = 'copy-input';
      input.readOnly = 'readOnly'; // 防止ios聚焦触发键盘事件
      input.style.position = 'fixed';
      input.style.left = '0';
      input.style.top = '0';
      input.style.zIndex = '-1000';
      document.body.appendChild(input);
    }

    input.value = textString;
    // ios必须先选中文字且不支持 input.select();
    selectText(input, 0, textString.length);
    if (document.execCommand('copy')) {
      document.execCommand('copy');
      resolve(input.remove());
    } else {
      reject(console.log('不兼容'));
    }
    input.blur();

    // input自带的select()方法在苹果端无法进行选择，所以需要自己去写一个类似的方法
    // 选择文本。createTextRange(setSelectionRange)是input方法
    function selectText(textbox, startIndex, stopIndex) {
      if (textbox.createTextRange) {
        //ie
        const range = textbox.createTextRange();
        range.collapse(true);
        range.moveStart('character', startIndex); //起始光标
        range.moveEnd('character', stopIndex - startIndex); //结束光标
        range.select(); //不兼容苹果
      } else {
        //firefox/chrome
        textbox.setSelectionRange(startIndex, stopIndex);
        textbox.focus();
      }
    }
  });
}

/**
 * @description base64转文件
 * @param {Base64} base64格式的文件
 * @param {String} 文件名称
 * @returns 返回 file 格式文件
 */
function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(',');
  let mime = arr[0].match(/:(.*?);/)[1];
  let bstr = window.atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

/**
 * @description 按需加载
 * @param {String} url 下载地址
 * @param {Function} 回调函数
 * @returns
 * @example
 * */
function loadScript(src, callback) {
  let script = document.createElement('script');
  let loaded = false;
  script.setAttribute('src', src);
  if (callback) {
    script.onload = function() {
      if (!loaded) {
        callback();
      }
      loaded = true;
    };
  }
  document.getElementsByTagName('head')[0].appendChild(script);
}

/**
 * @description 判断是否是iphoneX及以上环境
 * @returns {Boolean} true：是iphone及以上，false：不是
 */
// function getIsIphonex() {
//   let u = navigator.userAgent;
//   let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
//   return isIOS && screen.height === 812 && screen.width === 375;
// }
/**
 * @description 分享文本
 * @param {String} 需要复制的内容
 * @returns {Boolean} 复制是否成功
 */
function shareText(text) {
  const textareaEl = document.createElement('textarea');
  textareaEl.setAttribute('readonly', 'readonly'); // 防止手机上弹出软键盘
  textareaEl.value = text;
  document.body.appendChild(textareaEl);
  textareaEl.select();
  const res = document.execCommand('copy');
  document.body.removeChild(textareaEl);
  return res;
}

/**
 * @description: 判断时间跨度是否为三个月
 * @param {String} dateBeginStr 开始时间 YYYY-MM-DD
 * @param {String} dateEndStr 结束时间 YYYY-MM-DD
 * @return {Boolean} 判断结果
 */
function timeBetween(dateBeginStr, dateEndStr) {
  /**
   * 统计周期不能超过3个月 的验证
   */
  //年
  let startYear = dateBeginStr.substr(0, 4);
  let endYear = dateEndStr.substr(0, 4);

  //月
  let startMonth = dateBeginStr.substr(5, 2);
  let endMonth = dateEndStr.substr(5, 2);
  //日
  let startDay = dateBeginStr.substr(8, 2);
  let endDay = dateEndStr.substr(8, 2);

  let flag = true;
  switch (endYear - startYear) {
    //同年比较时
    case 0:
      if (endMonth - startMonth > 3 || (endMonth - startMonth === 3 && endDay > startDay)) {
        flag = false;
      }
      break;
    //一年范围内时
    case 1:
      //开始年的月份小于10时，不需要跨年 月相隔大于3个月
      //月相隔3个月，比较日 结束日期的日大于开始日期的日
      if (startMonth < 10 || Number(startMonth) + 3 - endMonth < 12 || (Number(startMonth) + 3 - endMonth === 12 && endDay > startDay)) {
        flag = false;
      }
      break;
    //至少超过一年了，直接返回false
    default:
      flag = false;
      break;
  }
  return flag;
}

/**
 * 
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    
  }
*/

export { timeBetween, shareText, getUrlParams, getQueryVariable, urlToBlob, requireImage, copyText, dataURLtoFile, loadScript };
