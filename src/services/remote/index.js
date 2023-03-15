import axios from 'axios';
import { transformResponse, catchError, requestInterceptor, apiObj, errorDispose } from './common';
import { beforeSend, afterSend } from './hook';
import tokenSvc from '../token';
import { Dialog } from '@csii/vx-mobile';

if (process.env.VUE_APP_HAS_MOCK === 'true') {
  require('./../../../mock/index');
}

const instance = axios.create({
  baseURL: apiObj[context.platform], // 微信银行 根据环境判断 请求参数
  timeout: 30 * 1000,
  headers: {
    'Content-Type': 'application/json',
    loginType: 'C',
    moduleId: '',
  },
  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // 默认值
  // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  // responseType: 'json', // 默认值 使用报文加密时 不能用json
});
// 请求拦截 参数处理（加密等）
instance.interceptors.request.use(requestInterceptor, Promise.reject);

async function axiosCall(options, type) {
  // 检查是否是确认交易
  const isSubmit = tokenSvc.isConfirApi(options.url);
  try {
    beforeSend(options); //遮罩
    // .scene接口 交易阶段需要往请求头里放_scenecode信息(因perLoanProgressQryScene.scene接口不需要获取token,故放外边)
    // if (options.url.endsWith('.scene') && type !== 'confirm') {
    //   let sceneCode = localStorage.getItem('_scenecode');
    //   if (sceneCode) {
    //     options.headers = Object.assign(options.headers || {}, { _sceneCode: sceneCode });
    //     options.data = Object.assign(options.data || {}, { _trsType: 'submit' });
    //     localStorage.removeItem('_scenecode');
    //   }
    // }
    // 判断是否需要添加 tokenName
    // if (isSubmit && type !== 'confirm') {
    //   const tokenName = await tokenSvc.resolveToken(options.url);
    //   options.data = Object.assign(options.data || {}, { _tokenName: tokenName });
    // }
    // prettier-ignore
    return await instance(options).then(transformResponse).catch(catchError);
  } catch (err) {
    // 确认交易需要重新刷新token
    if (isSubmit && err.code !== 'validation.resubmit_same_token') {
      await tokenSvc.refreshToken(options.url);
    }
    // 显示提示
    if (!options.handleError) {
      // 统一拦截的错误处理
      let isUnifyDispose = errorDispose(err);
      // 统一报错
      if (isUnifyDispose) {
        Dialog.alert({
          title: '温馨提示',
          content: err.message,
          // onConfirm: () => {
          //   if (window.history.length === 1 && ['weixin', 'alipay'].includes(context.platform)) {
          //     context.navigateBack();
          //   } else {
          //     window.history.back();
          //   }
          // },
        });
      }
    }
    throw err;
  } finally {
    afterSend(options);
  }
}
export default {
  get: async function(url, options = {}) {
    options.method = 'GET';
    options.url = url;
    options.params = options.query;
    options.handleError = options.query ? options.query.handleError : false;
    return axiosCall(options);
  },
  post: async function(url, options = {}) {
    options.method = 'POST';
    options.url = url;
    options.data = options.payload;
    options.handleError = options.payload ? options.payload.handleError : false;
    return axiosCall(options);
  },
  postConfirm: async function(url, options) {
    options.method = 'POST';
    options.url = url;
    options.data = options.payload;
    options.type = 'confirm';
    options.handleError = options.payload ? options.payload.handleError : false;
    return axiosCall(options, 'confirm');
  },
  postMultiAuth: async function(url, options) {
    options.method = 'POST';
    options.url = url;
    options.data = options.payload;
    options.handleError = options.payload ? options.payload.handleError : false;
    return axiosCall(options);
  },
  postMultiTrans: async function(url, options) {
    options.method = 'POST';
    options.url = url;
    options.data = options.payload;
    options.handleError = options.payload ? options.payload.handleError : false;
    return axiosCall(options, 'confirm');
  },
  postForm: async function(url, options) {
    options.method = 'POST';
    options.data = options.payload;
    options.headers = Object.assign({}, options.headers || {}, {
      'Content-Type': 'multipart/form-data',
    });
    options.url = url;
    return axiosCall(options, 'confirm');
  },
};
