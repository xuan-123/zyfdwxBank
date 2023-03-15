<template>
  <div class="wx-message">
    <title-bar />
    <div class="container" v-if="isShow">
      <!-- 银行卡号 -->
      <vx-card-select class="content-item" :card-list="cardList" @change-card="selectCard" :detault="detaultIndex"></vx-card-select>
      <ui-cell-item title="微信通知" class="content-item switch">
        <ui-switch slot="right" v-model="isOpen" @change="updateStatus" />
      </ui-cell-item>
      <div class="tips">
        <span>
          开启微信提醒：<br />
          若开通借记卡微信通知，则可接收借记卡余额变动通知；<br />
          若开通信用卡微信通知，则可接收信用卡消费、账单、还款提醒通知。<br />
          关闭通知或未关注“XX银行”公众号均无法接受余额变动消息！
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import vxCardSelect from '@/modules/common/components/vx-card-select';
import settingApi from '@/api/setting';
import commonApi from '@/api/common';
import accountApi from '@/api/account';
export default {
  name: 'wxMessage',
  components: {
    vxCardSelect,
  },
  data() {
    return {
      acNo: '',
      // 开关值
      isOpen: false,
      cardList: [],
      isShow: false,
      detaultIndex: 0,
      formRouteName: '',
      backName: ['accountPCRCDetail', 'accountDetail'],
    };
  },
  mounted() {
    this.formRouteName = JSON.parse(context.getSecureAsync('toMsgFromRoute')) || '';
    if (!this.formRouteName || !this.backName.includes(this.formRouteName)) {
      history.pushState(null, null, document.URL);
    }
    context.removeSecure('toMsgFromRoute');
    window.addEventListener('popstate', this.physicaReturn, false); // false阻止默认事件
    let loading = document.getElementById('loading');
    if (!JSON.parse(context.getSecureAsync('isLogin'))) {
      loading.style.display = 'block';
      this.goToLogin();
      return;
    }
    let param = { acType: 'PSAV,PCRC,PEA2,PEA3', balanceFlag: '0', handleError: true };
    accountApi
      .perAcOverview(param)
      .then((res) => {
        this.cardList = res.acctList;
        if (!res.acctList || res.acctList.length === 0) {
          context.setSecure('resultType', 'message');
          throw this.thorwErrow('no.account', '您还没有加挂账户，请先开户或加挂账户');
        }
        // 判断是否从其它模块传入
        else if (JSON.parse(context.getSecureAsync('messageAcNo'))) {
          this.isShow = true;
          this.cardList.forEach((item, index) => {
            if (item.acNo === JSON.parse(context.getSecureAsync('messageAcNo'))) {
              this.detaultIndex = index;
              this.acNo = res.acctList[index].acNo;
              this.getStatus(this.acNo);
              context.removeSecure('messageAcNo');
            }
          });
        } else {
          this.isShow = true;
          this.acNo = res.acctList[0].acNo;
          this.getStatus(this.acNo);
        }
      })
      .catch((err) => {
        this.remoteAlert(err);
      });
  },
  // 在组件生命周期结束的时候销毁
  beforeDestroy() {
    window.removeEventListener('popstate', this.physicaReturn, false);
  },
  methods: {
    physicaReturn() {
      if (this.formRouteName && this.backName.includes(this.formRouteName)) {
        this.goto({ name: this.formRouteName, query: { close: true } });
      } else {
        history.pushState(null, null, document.URL);
        // 其它页面进入（菜单），结束场景，返回主页
        context.returnHome();
      }
    },
    selectCard(index, val) {
      this.getStatus(val.acNo);
    },
    getStatus(acNo) {
      let param = { acNo };
      commonApi.perWxNoticeQry(param).then((res) => {
        this.isOpen = res.signStatus === '1' ? true : false;
      });
    },
    updateStatus() {
      let param = {
        acNo: this.acNo,
        operType: this.isOpen ? '0' : '1',
      };
      settingApi
        .perMovingAccountNoticeSwitchSet(param)
        .then()
        .catch(() => {
          // 更改不成功，还原开关状态
          this.isOpen = !this.isOpen;
        });
    },
  },
};
</script>
<style lang="scss">
.wx-message {
  .container {
    margin-top: 24.24px;
    .content-item {
      background-color: #fff;
      padding: 0 24px;
    }
    .switch {
      margin-top: 24px;
    }
    .tips {
      padding: 24px;
      font-size: 24px;
      color: var(--color-text-placeholder);
      line-height: 36px;
    }
  }
}
</style>
