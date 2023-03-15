import smcrypto from '@csii/smcrypto';
const { sm2, sm3, sm3hamc, sm4, hex2b64, b64tohex, hexToArray } = smcrypto;

let tempSM4Key = '';

function packageEncrypt(data, publicKey, type) {
  if (data === '') {
    return '';
  }
  if (!tempSM4Key) {
    tempSM4Key = RndNum(32);
  }
  // sm2 默认加密支持utf8和字节数组，不支持直接使用hex作为加密数据, 需要处理
  let keybytes = hexToArray(tempSM4Key);
  let s1 = sm2.doEncrypt(keybytes, publicKey, 1); // 对sm4的key使用sm2加密
  let s2 = sm4.encrypt(data, tempSM4Key); // 使用sm4key 对数据使用sm4对称加密
  let s3 = '';
  if (type === 'hmac') {
    s3 = sm3hamc(data, tempSM4Key); // sm3  数据摘要, 支持utf8字符串和bytes, sm4 的 key
  } else {
    s3 = sm3(data); // sm3  数据摘要, 支持utf8字符串和bytes
  }

  // console.log('===>use sm4key:', sm4Key);
  return `${hex2b64(s1.toUpperCase())}|${hex2b64(s2)}|${hex2b64(s3.toUpperCase())}`;
}
function packageDecrypt(b64str) {
  if (b64str === '') {
    return '';
  }
  if (tempSM4Key === '') {
    console.log('tempSM4Key is invalid.');
    return '';
  }
  let hexdata = b64tohex(b64str);
  let e = sm4.decrypt(hexdata, tempSM4Key);
  return e;
}
function RndNum(t) {
  let e = '';
  for (let r = 0; r < t; r++) {
    e += Math.floor(Math.random() * 10);
  }
  return e;
}

export { packageEncrypt, packageDecrypt };
