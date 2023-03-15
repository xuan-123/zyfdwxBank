import '@/services/context';
import confirmApiList from '@/config/confirmApis';
import axios from 'axios';
import utils from '@/utils';
import { apiObj } from './remote/common';
const preventTokenObj = {};

function refreshToken(apiKey) {
  return axios
    .post(`${apiObj[context.platform]}perGetToken.do`, { random: utils.dateUtil.getDate(null, null, 'YYYYMMDDHHmmss') + '12' + utils.uuid() })
    .then((resp) => {
      preventTokenObj[apiKey] = resp.data.data._tokenName;
    })
    .catch((err) => {
      console.log(err);
    });
}

function resolveToken(apiKey) {
  const token = preventTokenObj[apiKey];
  if (!token) {
    console.log(apiKey, 'apiKey');
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('该接口需要token, token不存在，请在业务内部使用refreshToken初始化token');
  } else {
    return Promise.resolve(token);
  }
}

function isConfirApi(apiUrl) {
  const pureUrl = apiUrl.replace(/\?.*$/, '');
  return confirmApiList.find((temp) => pureUrl.endsWith(temp));
}

export default { refreshToken, resolveToken, isConfirApi };
