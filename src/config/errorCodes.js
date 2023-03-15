const networkCodes = {
  505: '505HTTP版本不受支持',
  504: '504网关超时',
  502: '502网关错误',
  501: '501服务未实现',
  500: '500服务器内部错误',
  404: '404请求不存在',
  403: '403请求被禁止',
  401: '401请求未认证',
  400: '400糟糕的请求',
};

const businessCodes = {
  400000: '糟糕的请求',
};
export default { network: networkCodes, business: businessCodes };
