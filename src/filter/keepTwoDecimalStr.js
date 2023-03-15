/**
 * @description: 精确显示小数点后2位，没有时补0
 * @param {number} num
 * @returns {number}
 */
const keepTwoDecimalStr = (num) => {
  const result = Number(num.toString().match(/^\d+(?:\.\d{0,2})?/));
  let s = result.toString();
  let rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return s;
};

let filterObj = {};
filterObj.keepTwoDecimalStr = keepTwoDecimalStr;

export default filterObj;
