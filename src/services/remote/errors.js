function ClientError(message) {
  const _this = Error.call(this, message) || this;
  _this.name = 'ClientError';
  return _this;
}
function NetworkError(httpCode, message) {
  const _this = Error.call(this, message) || this;
  _this.httpCode = httpCode;
  _this.name = 'NetworkError';
  return _this;
}
function BuessinessError(code, message) {
  const _this = Error.call(this, message) || this;
  _this.code = code;
  _this.name = 'BuessinessError';
  return _this;
}

export { ClientError, NetworkError, BuessinessError };
export default { ClientError, NetworkError, BuessinessError };
