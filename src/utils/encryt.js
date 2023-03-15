import ignoreCryList from '@/config/ignoreEncry.js';
import { packageEncrypt, packageDecrypt } from './csii.encrypt';

export default {
  Key: '3DC6D3597DF36CB2D6CE0C5FB5B6423361A94F2C3CA406592A17CEC3911AC7F64187F77AAAE22D4E085A67774FF28DB58A7A548A2F4E03971A0303C7CD11A343',
  ApiIgnore: ignoreCryList, // 自定义不加密的API
  PlainFieldArr: ['_bankId', '_locale', '_accessJnlNo', '_channelId', '_transAuthType', '_trsType', 'requestEncData'],
  /**
   * 判断是否需要加密
   * post 请求，非 form-data 格式数据，不在 ignoreCryList 列表中
   */
  needEncryt(option) {
    const ignoreMethod = option.method !== 'post';
    const ignoreCotentType = option.headers['Content-Type'] === 'multipart/form-data';
    const ignoreUrl = this.ApiIgnore.indexOf(option.url) > -1;
    return !(ignoreMethod || ignoreCotentType || ignoreUrl);
  },
  // formdata 类型上送参数，除文件字段、只允许_bankId,_locale等公共字段明文上送（需添加字段的话，和服务端确认后修改），其他字段以json形式进行加密，随requestEncData上送
  resolveFormDataRequest(options) {
    // 过滤需要加密的字段
    let encFields = {};
    for (let [key, value] of options.data) {
      if (!this.PlainFieldArr.includes(key) && !(value instanceof File)) {
        encFields[key] = value;
      }
    }
    // 删除加密后的字段
    Object.keys(encFields).forEach((key) => options.data.delete(key));

    // 追加其他字段加密字段
    let encryptData = packageEncrypt(JSON.stringify(encFields), this.Key, 'hmac');
    if (options.data.has('requestEncData')) {
      options.data.set('requestEncData', encryptData);
    } else {
      options.data.append('requestEncData', encryptData);
    }
  },
  /**
   * 加密
   */
  encrytSM(option) {
    if (!this.needEncryt(option)) return;
    if (option.headers['Content-Type'] === 'multipart/form-data') {
      // formdata类型处理
      this.resolveFormDataRequest(option);
    } else {
      const originData = option.data || {};
      const encryptData = packageEncrypt(JSON.stringify(originData), this.Key);
      option.data = encryptData;
    }
  },
  /**
   * 解密
   */
  decreptSM(resoponse) {
    return this.needEncryt(resoponse.config) && typeof resoponse.data === 'string' && resoponse.config.responseType !== 'blob'
      ? JSON.parse(packageDecrypt(resoponse.data, this.Key))
      : resoponse.data;
  },
};
