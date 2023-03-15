<template>
  <div class="app-download">
    <title-bar />
    <div class="messge" id="common-message" v-if="!['browser', 'public'].includes(platform)"></div>
    <div class="container">
      <div class="top">
        <!-- <img src="@/assets/images/settings/logo.png" alt="logo" /> -->
      </div>
      <div class="center">
        <!-- <div class="bank-name">{{ bankName }}</div> -->
        <!-- <div class="bank-size">{{ bankSize }}</div> -->
      </div>
      <div class="bottom">
        <wx-open-launch-app
          v-if="['public', 'weixin'].includes(platform)"
          id="launch-btn"
          appid="wxa0248bfc8734a9db"
          @launch="launchFun"
          @error="errorFun"
          style="width: calc(100vw - 24px)"
        >
          <component :is="'script'" type="text/wxtag-template">
            <button
              class="btn-call"
              style="
                height: 50px;
                width: 100%;
                backgroundimage: linear-gradient(153deg, #7fa5ff 9%, #4e80fe 94%);
                border: 0px;
                border-radius: 6px;
                color: #fff;
                fontsize: 16px;
              "
            >
              App内查看
            </button>
          </component>
        </wx-open-launch-app>
        <!-- <div class="btn-download-box">
          <button class="btn-download" @click="downloadApp">
            <span>下载</span>
          </button>
        </div> -->
        <!-- <span class="author">{{ '开发者：' + author }}</span>
        <span class="version">{{ '版本：' + version }}</span>
        <div class="detail">
          <span class="detail-item">权限详情</span>
          <div class="box-border"></div>
          <span class="detail-item">隐私政策</span>
        </div> -->
      </div>
    </div>
    <!-- <div class="instructions" v-if="platform === 'public'">
      <img src="@/assets/images/common/instructions.png" alt="指示" />
    </div> -->
  </div>
</template>
<script>
import axios from 'axios';
import { shareText } from '@/utils/index';
export default {
  name: 'appDownload',
  data() {
    return {
      bankName: '中银富登村镇银行',
      bankSize: '113.22MB',
      author: '中银富登',
      version: '5.99991',
      // 环境判断 public为公众号 browser为浏览器 weixin为小程序 app为app
      platform: context.platform,
      // 查询app信息URL
      searchURL: '',
    };
  },
  created() {
    // 浏览器
    context.particularEnvFun(['browser'], () => {
      // platId为1时是个人移动ios版，为7时是Android
      if (/iPhone/.test(navigator.userAgent)) {
        this.getApp('1');
      } else if (/Android/.test(navigator.userAgent)) {
        this.getApp('7');
      } else {
        this.$alert('您的设备暂不支持该应用！请在IOS或Android设备上打开该页面！');
      }
    });
  },
  mounted() {
    // 公众号
    context.particularEnvFun(['public'], () => {
      // document.getElementById('common-message').style.top = '45px';
      // document.getElementById('common-message').style.height = 'calc(100vh-45px)';
    });
    // 浏览器
    context.particularEnvFun(['browser'], () => {
      setTimeout(() => {
        // window.location.href = 'bankscheme://mobilebank:8080/mybank';
        // window.location.href = 'https://www.baidu.com';
      }, 3000);
    });
    // 支付宝/微信小程序
    context.particularEnvFun(['weixin', 'alipay'], () => {
      document.getElementById('common-message').style.height = '100vh';
      document.getElementById('common-message').style.top = '0';
      // window.location.href = 'bankscheme://mobilebank:8080/mybank';

      this.$alert({ title: '提示', content: '已将跳转链接复制到手机剪贴板，请打开手机自带浏览器粘贴至地址栏并前往此链接' }, () => {
        this.copyHref();
        //还需要加一层判断 ，如果是从h5的页面跳进来下载页，还要给它返回到原来页面。
        context.switchTab({ url: `/pages/index/index` });
      });
    });
  },
  methods: {
    launchFun(arg) {
      console.log(arg, 'launchFun');
    },
    errorFun(err) {
      this.$alert('您未安装中银富登手机银行app，请下载');
      console.log(err, 'error');
    },
    getApp(platId) {
      console.log(platId);
      // 这儿接口返回安卓或者ios的下载链接
      // this.searchURL = `https://www.csiihf.tech:44444/api/plats/${platId}/latest`;
      // axios.get(this.searchURL).then((res) => {
      //   this.bankName = res.data.name;
      //   this.version = res.data.version;
      //   this.bankSize = res.data.size_mb + 'MB';
      //   this.downloadUrl = res.data.install_url;
      // });
    },
    downloadApp() {
      if (context.platform === 'public') {
        this.$alert('请在浏览器内打开');
        return;
      }
      if (/iPhone/.test(navigator.userAgent) || /Android/.test(navigator.userAgent)) {
        window.location.href = this.downloadUrl;
      } else {
        this.$alert('您的设备暂不支持该应用！请在IOS或Android设备上打开该页面！');
      }
    },
    copyHref() {
      // let text = window.location.href;
      //后边拼的参数要写成动态的，用于在唤醒app时打开对应路由，功能匹配jumptoapp.html的接参操作。
      let text = 'https://zyfdwbnksit.bocfullertonbank.com/clients/useruploads/web/jumptoapp.html?src=/loan#/loan';
      shareText(text);
    },
  },
};
</script>
<style lang="scss">
.app-download {
  .messge {
    position: fixed;
    z-index: 99;
    background: #000;
    top: 90px;
    left: 0;
    opacity: 0.6;
    width: 100vw;
    height: calc(100vh - 90px);
  }

  .container {
    position: relative;
    height: calc(100vh - 90px);
    background-image: url('~@/assets/images/common/download.jpg');
    background-repeat: no-repeat;
    background-size: contain;

    .top {
      width: 100vw;
      height: calc(100vw * 416 / 750);
      // background-image: url('~@/assets/images/common/mask.png');
      background-size: cover;
      display: flex;
      flex-direction: column-reverse;
      align-items: center;

      img {
        width: 240px;
        position: relative;
        top: 30px;
      }
    }

    .center {
      margin-top: 58px;
      text-align: center;

      .bank-name {
        height: 58px;
        font-size: 48px;
        color: #000;
        font-weight: 700;
      }

      .bank-size {
        margin-top: 24px;
        height: 34px;
        font-size: 28px;
        color: #999;
        font-weight: 700;
      }
    }

    .bottom {
      position: absolute;
      bottom: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .bank-name {
        height: 58px;
        font-size: 48px;
        color: #000;
        font-weight: 700;
      }

      .bank-size {
        margin-top: 24px;
        height: 34px;
        font-size: 28px;
        color: #999;
        font-weight: 700;
      }

      .btn-download-box {
        margin-top: 20px;

        .btn-download {
          outline: none;
          margin: 0 24px;
          width: calc(100vw - 48px);
          height: 100px;
          background: #d8d8d8;
          background-image: linear-gradient(153deg, #7fa5ff 9%, #4e80fe 94%);
          border: 0;
          border-radius: 12px;

          span {
            width: 96px;
            height: 40px;
            font-size: 32px;
            color: #fff;
            text-align: center;
            line-height: 40px;
          }
        }

        .btn-download ~ .btn-download {
          margin-top: 20px;
        }
      }

      .author,
      .version {
        font-size: 24px;
        color: #999999;
        font-weight: 700;
      }

      .author {
        margin-top: 122px;
      }

      .version {
        margin-top: 6px;
      }

      .detail {
        margin-top: 56px;
        display: flex;

        .detail-item {
          flex: 1;
          font-size: 24px;
          color: #333333;
          line-height: 28px;
          font-weight: 700;
        }

        .box-border {
          width: 2px;
          height: 28px;
          background-color: #999;
          margin: 0 18px;
        }
      }
    }
  }

  .instructions {
    position: fixed;
    top: 122px;
    right: 0;
    width: 604px;
    height: 166px;
    z-index: 999;

    img {
      width: 100%;
    }
  }
}
</style>
