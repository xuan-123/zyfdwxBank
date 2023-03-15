<template>
  <div class="signpre">
    <title-bar />
    <div class="contain">
      <p class="p">账户绑定</p>
      <img class="img" src="@/assets/images/bind-card/topbg.jpg" />
      <div class="table">
        <div class="item">
          <div class="left">
            <img src="@/assets/images/bind-card/kah.png" alt="" />
          </div>
          <div class="right">
            <input type="text" placeholder="请输入卡号" v-model="CardNo" maxlength="19" oninput="value=value.replace(/^(0+)|[^\d]+/g,'')" />
          </div>
        </div>
        <div class="item">
          <div class="left">
            <img src="@/assets/images/bind-card/mm.png" alt="" />
          </div>
          <div class="right">
            <input type="hidden" id="serverRandom" name="serverRandom" class="sip" v-model="serverRandom" />
            <input type="hidden" value="" name="encryptedClientRandom" id="encryptedClientRandom" />
            <span class="cursor" id="SIPBox2Cursor"></span>
            <input placeholder="请输入取款密码" class="DeInfo_text" type="text" id="SIPBox2" name="SIPBox2" readonly="true" />
            <input type="hidden" id="encryptedResult" />
          </div>
        </div>
        <div class="item" v-show="showImgVer">
          <div class="left">
            <img src="@/assets/images/bind-card/tpyz.png" alt="" />
          </div>
          <div class="right vter">
            <input type="text" placeholder="点击验证码刷新" v-model="ImgCode" maxlength="4" />
            <div id="v_container" style="width: 100px"></div>
          </div>
        </div>
        <div class="item">
          <div class="left">
            <img src="@/assets/images/bind-card/sjh.png" alt="" />
          </div>
          <div class="right">
            <input type="text" placeholder="请输入柜台预留手机号后四位" v-model="LastFourNum" maxlength="4" />
          </div>
        </div>
        <div class="item">
          <div class="left">
            <img src="@/assets/images/bind-card/yzm.png" alt="" />
          </div>
          <div class="rightphone">
            <input type="text" placeholder="请输入手机验证码" v-model="MsgVali" maxlength="6" />
            <button class="sms" :class="{ smsdisable: msgDisable }" @click="getMsg('msgFlag')" :disabled="msgDisable">
              {{ MsgMessage }}
            </button>
          </div>
        </div>
      </div>
      <div class="text">
        <div class="textItem">
          <input type="checkbox" v-model="oneCheckbox" />
          <span
            >我已阅读并同意<span class="doc">《中银富登村镇银行微信金融服务账户绑定协议》</span>和<span class="doc"
              >《中银富登村镇银行微银行隐私政策》</span
            ></span
          >
        </div>
        <div class="textItem">
          <input type="checkbox" v-model="twoCheckbox" />
          <span>同时开通微银行消息通知服务</span>
        </div>
      </div>
      <button class="btns" :class="{ binddisable: oneCheckbox && twoCheckbox }" @click="bindCard('bindFlag')" :disabled="isBindDisable">绑定</button>
    </div>
  </div>
</template>
<script>
// import scrollMixin from '@/services/scroll-mixin';
import bindcardApi from '@/api/bindcard';
export default {
  name: 'my-loan',
  // mixins: [scrollMixin({ ref: 'productView', height: 152, bottom: 71 })],
  data() {
    return {
      FunctionType: '',
      MsgMessage: '获取验证码',
      ImgCode: '',
      verifyCode: '',
      showImgVer: false,
      oneCheckbox: false,
      twoCheckbox: false,
      isBindDisable: false,
      msgDisable: false,
      msgCount: 5,
      classObject: { oneCheckbox: true, twoCheckbox: true },
      // 要上送的
      CardNo: '', //卡号
      LastFourNum: '', //手机号后四位
      MsgVali: '', //验证码
      SJJG: '',
      key: '',
      PhoneNo: '',
      serverRandom: 'MTIzNDU2Nzg5MDk4NzY1NA', //服务器随机数
      keyboard: {}, //密码控件
      QKPassword: '', //控件输入加密后的值
      encryptedClientRandom: '', //控件输入加密后的随机数
    };
  },
  created() {
    console.log(this.serverRandom);
    let a = '123';
    console.log(a);
    // 物理返回键 拦截
    window.history.pushState(null, null, document.URL);
    window.addEventListener('popstate', this.physicalReturn, false);
  },
  mounted() {
    this.init(); //初始化
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
      //初始化密码控件
      this.$nextTick(() => {
        //初始化密码控件
        initInput();
        this.keyboard = getKeyboard('SIPBox2');
        // 初始化图形验证码
        this.verifyCode = new GVerify('v_container');
      });
      // 获取地址上的参数
      // let URI = window.location.href;
      // console.log(URI, 'URI');
      // window.location.replace(
      //   `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0eb86e54392bda9a&redirect_uri=${encodeURIComponent(
      //     URI,
      //   )}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`,
      // );
    },
    //获取手机验证码
    getMsg(flag) {
      //判断输入数据是否正确
      let dataFlag = this.checkDataVail(flag);
      if (dataFlag) {
        //数据验证通过，下边进行调用接口
        bindcardApi
          .GetMsg({
            key: this.key,
            CardNo: this.CardNo,
            QKPassword: this.QKPassword,
            encryptedClientRandom: this.encryptedClientRandom,
            serverRandom: this.serverRandom,
            PhoneNo: this.PhoneNo,
            LastFourNum: this.LastFourNum,
            transName: 'CardBinding',
            MessageType: '1',
          })
          .then((res) => {
            if (res.result === 'success') {
              //倒计时开始
              this.settime();
              //展示成功提示
              if (res.showMsg != null) {
                this.$alert('验证码已发送至尾号:' + res.LastFourNum + '验证码:' + res.showMsg);
              } else {
                this.$alert('验证码已发送至尾号:' + res.LastFourNum + '的手机');
              }
            } else {
              this.$alert(res.msg);
            }
          });
      }
    },
    //验证码倒计时
    settime() {
      this.msgDisable = true;
      this.MsgMessage = '重新发送' + '(' + this.msgCount + ')';
      let time = setInterval(() => {
        this.msgCount--;
        this.MsgMessage = '重新发送' + '(' + this.msgCount + ')';
        if (this.msgCount === 0) {
          clearInterval(time);
          this.MsgMessage = '获取验证码';
          this.msgCount = 6;
          this.msgDisable = false;
        }
      }, 1000);
    },
    /**
     * @description: 绑卡
     * @param {String}
     */
    //
    bindCard(flag) {
      let sendDage = {
        key: this.key,
        CardNo: this.CardNo,
        QKPassword: this.QKPassword,
        encryptedClientRandom: this.encryptedClientRandom,
        serverRandom: this.serverRandom,
        PhoneNo: this.PhoneNo,
        LastFourNum: this.LastFourNum,
        transName: 'ActSign',
        MessageType: '1',
        userName: 'xuanxiang',
        amount: '20003450.88',
      };
      context.setSecure('UserInfoData', sendDage);
      this.goto({ name: 'SignRes' });
      //判断输入数据是否正确
      let dataFlag = this.checkDataVail(flag);
      if (dataFlag) {
        //数据验证通过，下边进行调用接口
        bindcardApi
          .ActSign({
            key: this.key,
            CardNo: this.CardNo,
            QKPassword: this.QKPassword,
            encryptedClientRandom: this.encryptedClientRandom,
            serverRandom: this.serverRandom,
            PhoneNo: this.PhoneNo,
            LastFourNum: this.LastFourNum,
            transName: 'ActSign',
            MessageType: '1',
          })
          .then((res) => {
            if (res.result === 'success') {
              //跳转到 结果页
              this.goto({ name: 'SignRes' });
            } else {
              console.log('reject');
            }
          });
      }
    },
    //页面校验公共方法（获取验证码与绑定）
    checkDataVail(flag) {
      if (!this.CardNo) {
        this.$alert('请输入卡号');
        this.showImgVer = true; //报错弹出图形验证码
        return false;
      }
      if (this.CardNo.length !== 19) {
        this.$alert('卡号只能输入19位数字');
        this.showImgVer = true; //报错弹出图形验证码
        return false;
      }
      this.getQKPassword();
      if (this.QKPassword === '') {
        this.$alert('请输入6位数字取款密码');
        this.showImgVer = true; //报错弹出图形验证码
        return false;
      }
      //触发图形验证码出现进行验证图形验证码
      if (this.showImgVer) {
        if (!this.ImgCode) {
          this.$alert('图形验证码不能为空');
          return false;
        }
        if (!this.verifyCode.validate(this.ImgCode)) {
          this.$alert('图片验证码错误');
          this.ImgCode = '';
          return false;
        }
      }
      if (this.LastFourNum === '') {
        this.$alert('请输入预留手机号后四位');
        this.showImgVer = true; //报错弹出图形验证码
        return false;
      }
      if (flag === 'bindFlag') {
        if (!this.MsgVali) {
          this.$alert('短信验证码不能为空');
          this.showImgVer = true; //报错弹出图形验证码
          return false;
        } else {
          if (this.MsgVali.length < 6) {
            this.$alert('请输入6位短信验证码');
            this.showImgVer = true; //报错弹出图形验证码
            return false;
          }
        }

        if (this.oneCheckbox && this.twoCheckbox) {
          this.getQKPassword();
          console.log(this.QKPassword);
        } else {
          this.$alert('请先同意协议');
          return false;
        }
      }
      return true;
    },
    //获取密码控件值
    getQKPassword() {
      this.keyboard = getKeyboard('SIPBox2');
      this.QKPassword = this.keyboard.getEncryptedInputValue('SIPBox2'); //获取加密后的值
      this.encryptedClientRandom = this.keyboard.getEncryptedClientRandom('SIPBox2'); //获取加密随机数
      //   let errorCode = this.keyboard.getErrorCode('SIPBox2').toString(16);
      //   if (errorCode != CFCA_OK) {
      //     this.$alert('服务端错误，请联系管理员');
      //   }
    },
  },
  /**
   * @description:加载更多事件
   */
  onLoadMore() {
    this.isFinished = false;
    this.$refs.productView.finishLoadMore();
  },
};
</script>
<style lang="scss">
.signpre {
  background: #fff;
  height: 100vh;
  .contain {
    .p {
      font-size: 40px;
      text-align: center;
      height: 100px;
      line-height: 100px;
    }
    .img {
      width: 100vw;
      height: 200px;
    }
    .table {
      background: #f5f5f5;
      height: 100%;
      .item {
        background: #fff;
        margin-bottom: 10px;
        height: 100px;
        display: flex;
        align-items: center;
        padding: 0 30px;
        .left {
          margin-right: 20px;
          img {
            width: 60px;
            height: 60px;
          }
        }
        .right {
          input {
            height: 60px;
            width: 410px;
            padding: 0 20px;
            border: none;
            border-left: 1px solid #e3e3e3;
          }
        }
        .vter {
          display: flex;
          padding-right: 20px;
        }
        .rightphone {
          display: flex;
          // justify-content: space-between;
          input {
            height: 60px;
            width: 400px;
            padding: 0 20px;
            border: none;
            border-left: 1px solid #e3e3e3;
          }
          .sms {
            height: 60px;
            line-height: 60px;
            text-align: center;
            width: 180px;
            color: #f37522;
            border: 1px solid #f37522;
            border-radius: 10px;
            background-color: #fff;
          }
          .smsdisable {
            background-color: #ccc;
            border: 1px solid #ccc;
            color: #fff;
          }
        }
      }
    }

    .text {
      height: 180px;
      // background:red;
      padding: 20px 30px;

      .textItem {
        margin-bottom: 20px;
        font-size: 28px;
        line-height: 40px;

        input {
          width: 30px;
          height: 30px;
          vertical-align: middle;
          margin-right: 10px;
        }

        .doc {
          color: blue;
        }
      }
    }

    .btns {
      width: 80%;
      height: 80px;
      line-height: 80px;
      background-color: #ccc;

      font-size: 36px;
      color: #fff;
      border-radius: 10px;
      position: relative;
      left: 50%;
      margin-top: 40px;
      margin-left: -40%;
      text-align: center;
      border: none;
    }

    .binddisable {
      background: #f37522;
      color: #fff;
    }
  }
}
</style>
