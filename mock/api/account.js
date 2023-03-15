// 引入 mockjs
import Mock from 'mockjs';
export default [
  {
    path: '/perPayeeQry.do',
    method: 'post',
    handle() {
      return {
        respCode: '00000000',
        respMessage: '交易成功',
      };
    },
  },
  {
    path: '/QueryPayeeBankList.do',
    method: 'get',
    handle() {
      let list = [
        {
          bankCode: '100000002',
          bankName: '富滇银行',
        },
        {
          bankCode: '100000003',
          bankName: '工商银行',
        },
        {
          bankCode: '100000004',
          bankName: '光大银行',
        },
        {
          bankCode: '100000005',
          bankName: '广发银行',
        },
        {
          bankCode: '100000006',
          bankName: '恒丰银行',
        },
        {
          bankCode: '100000007',
          bankName: '华夏银行',
        },
        {
          bankCode: '100000008',
          bankName: '中国建设银行',
        },
        {
          bankCode: '100000009',
          bankName: '中国交通银行',
        },
        {
          bankCode: '100000010',
          bankName: '民生银行',
        },
        {
          bankCode: '100000011',
          bankName: '农信社',
        },
        {
          bankCode: '100000012',
          bankName: '中国农业银行',
        },
        {
          bankCode: '100000013',
          bankName: '平安银行',
        },
        {
          bankCode: '100000014',
          bankName: '上海浦发银行',
        },
        {
          bankCode: 100000015,
          bankName: '兴业银行',
        },
        {
          bankCode: 100000016,
          bankName: '中国邮政储蓄银行',
        },
        {
          bankCode: 100000017,
          bankName: '招商银行',
        },
        {
          bankCode: 100000018,
          bankName: '中国银行',
        },
        {
          bankCode: 100000019,
          bankName: '中信银行',
        },
      ];

      return {
        _RejCode: '000000',
        state: 'SUCCESS',
        msg: '查询成功',
        data: list,
      };
    },
  },
  {
    path: '/QueryPayeeBankQueryBalance.do',
    method: 'get',
    handle() {
      let list = Mock.mock({
        detailID: '@id', //流水号
        'number|+1': '@integer(60000,90000000)', //余额
        'money|1': ['10', '100', '1999'],
      });
      // 属性 list 的值是一个数组，其中含有 1 到 10 个元素

      return {
        _RejCode: '000000',
        state: 'SUCCESS',
        msg: '查询成功',
        data: list,
      };
    },
  },
  {
    path: '/QueryPayerList.do',
    method: 'post',
    handle() {
      let list = Mock.mock([
        {
          value: '01',
          icon: 'boc',
          accBank: '中国银行',
          'alias|1': ['0', '1'],
          'accName|1': ['张三', '李四', '王五', '赵六'],
          'accNo|1': ['6217309874838393', '6217309874838394', '6217309874838396', '6217309874838397'],
        },
        {
          value: '02',
          icon: 'ccb',
          accBank: '中国建设银行',
          'accName|1': ['张三', '李四', '王五', '赵六'],
          'alias|1': ['0', '1'],
          'accNo|1': ['6217309874838393', '6217309874838394', '6217309874838396', '6217309874838397'],
        },
        {
          value: '03',
          icon: 'boc',
          accBank: '中国银行',
          'accName|1': ['张三', '李四', '王五', '赵六'],
          'alias|1': ['0', '1'],
          'accNo|1': ['6217309874838393', '6217309874838394', '6217309874838396', '6217309874838397'],
        },
      ]);

      return {
        _RejCode: '000000',
        state: 'SUCCESS',
        msg: '查询成功',
        data: list,
      };
    },
  },
];
