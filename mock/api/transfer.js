import Mock from 'mockjs';
export default [
  {
    path: '/qryAccountBalance.do',
    method: 'post',
    handle() {
      let data = Mock.mock({
        'balance|1': ['6666.66', '8888.88', '9999.99', '1234.56', '2345.67'],
      });
      return {
        _RejCode: '000000',
        state: 'SUCCESS',
        msg: '查询成功',
        data: data,
      };
    },
  },
  // 智能转账-确认
  {
    path: '/transferConfirm.do',
    method: 'post',
    handle() {
      let data = Mock.mock({
        'status|1': ['0', '1'],
        'rateMoney|1': ['0.2', '1', '1.5'],
      });
      return {
        _RejCode: '000000',
        state: 'SUCCESS',
        msg: '查询成功',
        data: data,
      };
    },
  },
  // 智能转账-提交
  {
    path: '/transfer.do',
    method: 'post',
    handle() {
      let res = Mock.mock({
        state: '00',
        msg: '交易提交成功，请等待审核！',
        times: new Date().toLocaleString(),
        'seq|1': ['143723758943574', '143723758943579', '143723758943578', '143723758943577'],
      });

      return {
        _RejCode: '000000',
        state: 'SUCCESS',
        msg: '提交成功',
        data: res,
      };
    },
  },
  // 查询开户网点
  {
    path: '/QryOutlets.do',
    method: 'post',
    handle() {
      let res = Mock.mock({
        list: [
          {
            'name|1': ['北京支行', '朝阳支行', '河北支行', '河南支行', '山东支行', '天津支行', '昌平支行', '海淀支行', '大兴支行', '顺义支行'],
            'code|1': ['123345', '234456', '344567'],
          },
          {
            'name|1': ['北京支行', '朝阳支行', '河北支行', '河南支行', '山东支行', '天津支行', '昌平支行', '海淀支行', '大兴支行', '顺义支行'],
            'code|1': ['123345', '234456', '344567'],
          },
          {
            'name|1': ['北京支行', '朝阳支行', '河北支行', '河南支行', '山东支行', '天津支行', '昌平支行', '海淀支行', '大兴支行', '顺义支行'],
            'code|1': ['123345', '234456', '344567'],
          },
          {
            'name|1': ['北京支行', '朝阳支行', '河北支行', '河南支行', '山东支行', '天津支行', '昌平支行', '海淀支行', '大兴支行', '顺义支行'],
            'code|1': ['123345', '234456', '344567'],
          },
          {
            'name|1': ['北京支行', '朝阳支行', '河北支行', '河南支行', '山东支行', '天津支行', '昌平支行', '海淀支行', '大兴支行', '顺义支行'],
            'code|1': ['123345', '234456', '344567'],
          },
          {
            'name|1': ['北京支行', '朝阳支行', '河北支行', '河南支行', '山东支行', '天津支行', '昌平支行', '海淀支行', '大兴支行', '顺义支行'],
            'code|1': ['123345', '234456', '344567'],
          },
          {
            'name|1': ['北京支行', '朝阳支行', '河北支行', '河南支行', '山东支行', '天津支行', '昌平支行', '海淀支行', '大兴支行', '顺义支行'],
            'code|1': ['123345', '234456', '344567'],
          },
          {
            'name|1': ['北京支行', '朝阳支行', '河北支行', '河南支行', '山东支行', '天津支行', '昌平支行', '海淀支行', '大兴支行', '顺义支行'],
            'code|1': ['123345', '234456', '344567'],
          },
          {
            'name|1': ['北京支行', '朝阳支行', '河北支行', '河南支行', '山东支行', '天津支行', '昌平支行', '海淀支行', '大兴支行', '顺义支行'],
            'code|1': ['123345', '234456', '344567'],
          },
        ],
      });

      return {
        _RejCode: '000000',
        state: 'SUCCESS',
        msg: '提交成功',
        data: res,
      };
    },
  },
  {
    path: '/transferList.do',
    method: 'post',
    handle() {
      let payeeList = Mock.mock({
        total: 10,
        compName: '科蓝数字银行',
        'contList|1-7': [
          {
            'name|1': ['张三一', '李小四', '王小二', '王五五'],
            card: /\d{16}/,
            'icon|1': ['boc', 'ccb'],
            'bankName|1': ['中国银行', '建设银行', '农村信用社', '中旅银行'],
          },
        ],
        'compList|2': [
          {
            'name|1': ['张三一', '李小四', '王小二', '王五五'],
            card: /\d{16}/,
            'icon|1': ['boc', 'ccb'],
            'bankName|1': ['中国银行', '建设银行', '农村信用社', '中旅银行'],
          },
        ],
      });
      return {
        _RejCode: '000000',
        state: 'SUCCESS',
        msg: '查询成功',
        data: payeeList,
      };
    },
  },
  // 扫码转账结果
  {
    path: '/getScanTransRes.do',
    method: 'get',
    handle() {
      let scanTransRes = Mock.mock({
        listObj: {
          name: '北京XX食品有限公司',
          money: '3000',
          routineMoney: '20',
          account: '622362236223437',
          time: '2020-08-16 12:22:21',
        },
      });
      return {
        _RejCode: '000000',
        state: 'SUCCESS',
        msg: '查询成功',
        data: scanTransRes,
      };
    },
  },
  // 汇款回传单获取详情信息
  {
    path: '/transCancelLastNum.do',
    method: 'get',
    handle() {
      let payeeList = Mock.mock({
        titleList: [
          false,
          false,
          {
            title: '账号选择',
            text: '尾号2833',
            list: [
              { key: '0', value: '尾号2833' },
              { key: '1', value: '尾号2902' },
              { key: '2', value: '尾号3232' },
              { key: '3', value: '尾号2323' },
            ],
          },
        ],
        'accList|4': [{ acc: /\d{16}/ }],
      });
      return {
        _RejCode: '000000',
        state: 'SUCCESS',
        msg: '提交成功',
        data: payeeList,
      };
    },
  },
  // 转账撤销详情
  {
    path: '/transCancelDetails.do',
    method: 'get',
    handle() {
      let payeeList = Mock.mock({
        listObj: {
          time: '2020-08-16 12:22:21',
          money: '10000',
          name: '北京XX食品有限公司',
          account: '123234322323323',
          outlets: '北京市朝阳支行',
          putpose: '转账',
          inAccount: '6225780987643234',
          active: '可撤销',
        },
      });
      return {
        _RejCode: '000000',
        state: 'SUCCESS',
        msg: '提交成功',
        data: payeeList,
      };
    },
  },
  // 转账撤销确认撤销
  {
    path: '/sureTransCancel.do',
    method: 'post',
    handle() {
      let payeeList = Mock.mock({
        state: '00',
        msg: '转账撤销成功',
      });

      return {
        _RejCode: '000000',
        state: 'SUCCESS',
        msg: '提交成功',
        data: payeeList,
      };
    },
  },

  // 转账记录相关接口

  // 转账撤销详情
  {
    path: '/transDetails.do',
    method: 'get',
    handle() {
      let payeeList = Mock.mock({
        listObj: {
          money: '10000',
          name: '北京XX食品有限公司',
          account: '123234322323323',
          outlets: '北京市朝阳支行',
          putpose: '转账',
          inName: '广州市贸易有限公司',
          inAccount: '6225780987643234',
          payBank: '广州银行',
          routineMoney: '20',
          inputpose: '实时到账',
          tranDate: '2020-12-12 12:21:43',
          tranStatus: 'OK',
        },
      });
      return {
        _RejCode: '000000',
        state: 'SUCCESS',
        msg: '提交成功',
        data: payeeList,
      };
    },
  },

  {
    path: '/transRecordQry.do',
    method: 'post',
    handle() {
      let payeeList = Mock.mock({
        'list|10': [
          {
            'iconRecord|1': ['abc', 'bcm', 'bjb', 'bjrcb'],
            'name|1': ['张三', '李四', '王五', '赵六'],
            'date|1': ['2020-09-09 18:34:20', '2020-09-10 19:35:30', '2020-10-11 10:20:30'],
            'money|1': ['100', '200', '300', '400', '500'],
            'state|1': ['KCX', 'OK', 'FL'],
          },
        ],
        'total|1': ['20', '30', '40'],
      });
      return {
        _RejCode: '000000',
        state: 'SUCCESS',
        msg: '提交成功',
        data: payeeList,
      };
    },
  },
];
