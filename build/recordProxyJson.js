const fileSave = require('file-save');
const path = require('path');
const resolve = (relativepath) => path.join(__dirname, relativepath);
const smcrypto = require('@csii/smcrypto');
const { sm4, b64tohex } = smcrypto;
let tempSM4Key = '00067546047522054708867915934653';
// process.exit(1);

/**
 * 根据返回数据生成JSON文件s
 * @param {Object} proxyRes
 * @param {Object} req
 */
function recordProxyJson(proxyRes, req) {
  const { statusCode, headers } = proxyRes;
  const reg = /application\/json/i;
  if (statusCode === 200 && reg.test(headers['content-type'])) {
    let body = '';
    proxyRes.on('data', (data) => {
      body += data.toString();
    });
    proxyRes.on('end', () => {
      try {
        // 文件保存路径
        const url = req.url.split('/');
        const action = url[url.length - 1];
        const filename = action.replace('.do', '.json');
        const filepath = resolve(`../mock/data/${filename}`);
        // 文件处理
        const data = process.env.VUE_APP_ENCRYPT === 'true' ? packageDecrypt(body) : body;
        // 格式化文档内容
        const content = JSON.stringify(JSON.parse(data), null, 2);
        fileSave(filepath)
          .write(content)
          .end('\n')
          .finish(() => {
            console.log(`[生成]：${filename} 文件`);
          });
      } catch (err) {
        console.log(`[保存JSON数据失败]${err.message}`);
      }
    });
  }
}
/**
 * @description 文件解密
 */
function packageDecrypt(b64str) {
  try {
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
  } catch (error) {
    return b64str;
  }
}

module.exports = recordProxyJson;
