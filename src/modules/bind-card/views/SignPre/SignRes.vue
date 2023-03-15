<template>
  <div class="bandres">
    <title-bar />
    <div class="contain">
      <img class="img" src="@/assets/images/bind-card/bind-success.png" />
      <p class="twoP">您尾号为{{}}的借记卡绑定成功</p>
      <div class="btn" @click="doClose()">关闭</div>
    </div>
  </div>
</template>
<script>
// import scrollMixin from '@/services/scroll-mixin';
import myloanApi from '@/api/myloan';
export default {
  name: 'my-loan',
  // mixins: [scrollMixin({ ref: 'productView', height: 152, bottom: 71 })],
  data() {
    return {
      FunctionType: '',
      smsMassage: {
        Sm2value: '',
        Sm2hmac: '',
      },
    };
  },
  created() {
    this.init(); //初始化
    // 物理返回键 拦截
    window.history.pushState(null, null, document.URL);
    window.addEventListener('popstate', this.physicalReturn, false);
  },
  beforeDestroy() {
    window.removeEventListener('popstate', this.physicalReturn, false);
  },
  methods: {
    /**
     * @description 物理返回键 方法，在首页返回时统一拦截 并关闭页面
     */
    physicalReturn() {
      window.history.pushState(null, null, document.URL);
      context.returnHome();
    },
    /**
     * @description: 初始化
     */
    init() {
      // window.location.replace(
      //   `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx83d089c06771cabf&redirect_uri=${encodeURIComponent(
      //     'http://localhost:8080/band-card/#/band-card',
      //   )}&response_type=code&scope=snsapi_login&state=Auditing#wechat_redirect`,
      // );
      // myloanApi.QueryImg({ qryType: '1', investType: '1', handleError: true, pageSize: 2, pageNo: 1 }).then((res) => {
      //   console.log(res);
      // });
      // myloanApi.QueryPiKey({ Key: 'Sm2value' }).then((res) => {
      //   this.smsMassage.Sm2value = res.Value;
      //   console.log(res);
      // });
      // myloanApi.QueryPiKey({ Key: 'Sm2hmac' }).then((res) => {
      //   this.smsMassage.Sm2hmac = res.Value;
      // });
      //   window.smsMassage.Sm2hmac = data.Sm2hmac;
    },
    /**
     * @description: 轮播图产品跳转详情页
     */

    /**
     * @description: 理财产品跳转详情页
     * @param {String} 产品收益分类 0-净值型 1-非净值型
     */

    /**
     * @description: 存款产品跳转详情页
     * @param {Object} item 存款产品详情
     */
    goDepositDetail() {
      myloanApi.QueryImg().then((res) => {
        console.log(res);
      });
    },
    goDepositDetail2() {
      myloanApi.WarmPrompt({ FunctionType: '登录' }).then((res) => {
        this.FunctionType = res.FunctionType;
      });
    },
    /**
     * @description: 点击跳转到理财/存款首页
     * @param {String} path 点击更多跳转路径
     */
    doClose() {
      // this.goto({ path: 'loan#/loan' });

      //小程序点击某功能未绑卡后进来的，要在关闭进进入到对应功能
      // let bindCardFlag = JSON.parse(context.getSecureAsync('bindCardFlag'));
      let UserInfoData = JSON.parse(context.getSecureAsync('UserInfoData'));
      context.postMessage({
        loginMessage: { ...UserInfoData, bindCardFlag: true },
      }); //传用户信息与绑卡标识 ，
      context.finish(); //关闭页面回到小程序时，会被@massage监听，也可以回到指定小程序页面再取。

      // bindcardApi
      //   .BindAndUnBind({
      //     key: this.key,
      //   })
      //   .then((res) => {
      //     if (res.result === 'success') {
      //     } else {
      //     }
      //   });
    },
    /**
     * @description:加载更多事件
     */
    // onLoadMore() {
    //   this.isFinished = false;
    //   this.$refs.productView.finishLoadMore();
    // },
  },
};
</script>
<style lang="scss">
.bandres {
  height: 100vh;
  width: 100vw;
  background-color: #fff;
  position: relative;
  .contain {
    text-align: center;
    .img {
      width: 50%;
      height: 50%;
    }
    .oneP {
      font-size: 40px;
      margin: 20px 0;
    }
    .twoP {
      font-size: 36px;
      line-height: 56px;
      padding: 0 20px;
    }

    .btn {
      width: 80%;
      height: 80px;
      line-height: 80px;
      background: #f37522;
      font-size: 36px;
      color: #fff;
      border-radius: 10px;
      position: absolute;
      left: 50%;
      margin-top: 40px;
      margin-left: -40%;
    }
  }
}
</style>
