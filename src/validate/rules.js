// 校验身份证号
const idCard = {
  getMessage: (field) => field + '格式错误，请重新输入！',
  validate: (value) => {
    return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
      value,
    );
  },
};

// 校验港澳通行证
const HKCard = {
  getMessage: (field) => field + '格式错误，请重新输入！',
  validate: (value) => {
    return /^([A-Z]\d{6,10}(\(\w{1}\))?)$/.test(value);
  },
};

// 校验台湾通行证
const TWCard = {
  getMessage: (field) => field + '格式错误，请重新输入！',
  validate: (value) => {
    return /^\d{8}|^[a-zA-Z0-9]{10}|^\d{18}$/.test(value);
  },
};

// 校验护照
const passPortCard = {
  getMessage: (field) => field + '格式错误，请重新输入！',
  validate: (value) => {
    return /^([a-zA-z]|[0-9]){5,17}$/.test(value);
  },
};

// 校验军官证
const officerCard = {
  getMessage: (field) => field + '格式错误，请重新输入！',
  validate: (value) => {
    return /^[\u4E00-\u9FA5](字第)([0-9a-zA-Z]{4,8})(号?)$/.test(value);
  },
};

// 校验户口本
const accountCard = {
  getMessage: (field) => field + '格式错误，请重新输入！',
  validate: (value) => {
    return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value);
  },
};

// 校验手机号
const phone = {
  getMessage: () => '您输入的手机号码格式不正确，请重新输入！',
  validate: (value) => {
    return /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(value);
  },
};

// 校验固定电话
const telephone = {
  getMessage: () => '您输入的固定电话格式不正确，请重新输入！',
  validate: (value) => {
    return /^\d{3,5}-\d{7,8}$/.test(value);
  },
};
// 校验手机号和座机
const allPhone = {
  getMessage: (field) => field + '格式错误，请重新输入！',
  validate: (value) => {
    return /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(value) || /^[0][0-9]{2,3}-[0-9]{5,10}$/.test(value);
  },
};

// 校验用户名
const userName = {
  getMessage: (field) => {
    return field + '格式不正确，请重新输入！';
  },
  validate: (value) => {
    return /^(([a-zA-Z]+([.·][a-zA-Z]+)?)|([\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)?))$/.test(value);
  },
};

// 校验金额
const amount = {
  getMessage: (field) => {
    return field + '格式不正确，请重新输入！';
  },
  validate: (value) => {
    return /^\d+(\.\d{1,2})?$/.test(value);
  },
};
// 校验利率(利率小于30，并最最多保留两位小数)
const rate = {
  getMessage: (field) => {
    return field + '格式不正确，请重新输入！';
  },
  validate: (value) => {
    return /^(([1-9]|[12][0-9]|30)|(([1-9]|[12][0-9])\.[0-9][0-9]{0,1})|(0\.(0[1-9]|[1-9][0-9]{0,1}))|(30\.0{1,2}))$/.test(value);
  },
};

// 校验账号
const account = {
  getMessage: (field) => {
    return field + '格式不正确，请重新输入！';
  },
  validate: (value) => {
    return /^\d{16,}$/.test(value);
  },
};

// 校验6位数字
const verCode = {
  getMessage: (field) => {
    return '请输入6位' + field;
  },
  validate: (value) => {
    return /^\d{6}$/.test(value);
  },
};

// 校验贷款期限
const loanDate = {
  getMessage: (field) => {
    return field + '超出范围(1≤贷款期限≤360)';
  },
  validate: (value) => {
    return value >= 1 && value <= 360;
  },
};

// 校验浮动比率
const loanRate = {
  getMessage: (field) => {
    return field + '超出范围(0≤比率≤100)';
  },
  validate: (value) => {
    return /^100$|^(\d|[1-9]\d)$/.test(value);
  },
};

//校验姓名
const name = {
  getMessage: (field) => {
    return field + '格式不正确，请重新输入！';
  },
  validate: (value) => {
    return /^[\u4E00-\u9FA5]{2,4}$/.test(value);
  },
};

// 校验手机号
const mobile = {
  getMessage: () => '手机号码格式不正确',
  validate: (value) => {
    return value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value);
  },
};

// 校验邮政编码
const postCode = {
  getMessage: (field) => {
    return field + '格式不正确';
  },
  validate: (value) => {
    return /^[0-9]{6}$/.test(value);
  },
};

//校验缴费号码  -----  新增
const rentNumber = {
  getMessage: () => '缴费号码错误',
  validate: (value) => {
    return /^\d{1,30}$/.test(value);
  },
};

// 校验登录密码8-20位
const loginPwd = {
  getMessage: () => '密码格式不正确，请重新输入！',
  validate: (value) => {
    return /(?![0-9A-Z]+$)(?![0-9a-z]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(value);
  },
};
// 校验登录密码6-20位
const loginPwdS = {
  getMessage: () => '密码格式不正确，请重新输入！',
  validate: (value) => {
    return /(?![0-9A-Z]+$)(?![0-9a-z]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(value);
  },
};
// 校验拼音
const pinyin = {
  getMessage: (field) => {
    return '请输入正确的' + field;
  },
  validate: (value) => {
    return /^[a-zA-Z]{2,15}$/.test(value);
  },
};

// 校验CVV2
const isCVV2 = {
  getMessage: (field) => {
    return field + '格式不正确';
  },
  validate: (value) => {
    return /^[0-9]{3}$/.test(value);
  },
};

// 输入金额不能为0
const notZore = {
  getMessage: (field) => {
    return field + '不可为0';
  },
  validate: (value) => {
    return parseFloat(value) !== 0;
  },
};

export default [
  {
    name: 'notZore',
    content: notZore,
  },
  {
    name: 'idCard',
    content: idCard,
  },
  {
    name: 'HKCard',
    content: HKCard,
  },
  {
    name: 'TWCard',
    content: TWCard,
  },
  {
    name: 'passPortCard',
    content: passPortCard,
  },

  {
    name: 'officerCard',
    content: officerCard,
  },
  {
    name: 'accountCard',
    content: accountCard,
  },
  {
    name: 'phone',
    content: phone,
  },
  {
    name: 'telephone',
    content: telephone,
  },
  {
    name: 'allPhone',
    content: allPhone,
  },
  {
    name: 'userName',
    content: userName,
  },
  {
    name: 'amount',
    content: amount,
  },
  {
    name: 'account',
    content: account,
  },
  {
    name: 'verCode',
    content: verCode,
  },
  {
    name: 'loanDate',
    content: loanDate,
  },
  {
    name: 'loanRate',
    content: loanRate,
  },
  {
    name: 'name',
    content: name,
  },
  {
    name: 'mobile',
    content: mobile,
  },
  {
    name: 'postCode',
    content: postCode,
  },
  {
    name: 'rentNumber',
    content: rentNumber,
  },
  {
    name: 'loginPwd',
    content: loginPwd,
  },
  {
    name: 'loginPwdS',
    content: loginPwdS,
  },
  {
    name: 'pinyin',
    content: pinyin,
  },
  {
    name: 'isCVV2',
    content: isCVV2,
  },
  {
    name: 'rate',
    content: rate,
  },
];
