<template>
  <div
    class="mobile"
    @click="goWeb2('common#/Download')"
    @touchstart="starts($event)"
    @touchmove.prevent="move($event)"
    @touchend="moveup($event)"
    :style="currentBtnStyle"
    v-if="showBtnStore.key != 'false'"
  >
    <div class="imgContain">
      <div class="zhanwei">1</div>
      <img class="img" src="@/assets/images/common/logo.png" />
      <div @click.stop="closeBtn()" class="btn">x</div>
    </div>
    <div>手机银行{{ showBtnStore.key }}</div>
  </div>
</template>
<script>
export default {
  name: 'darg',
  data() {
    return {
      // moveDiv: null,
      // defaultY: null
      currentTop: null,
      showBtnStore: {
        key: null,
      },
      currentBtnStyle: '',
    };
  },
  watch: {},

  // onShow() {
  // console.log('onshow子')
  // Taro.getStorage({
  //   key: "offsetTop",
  //   success: function (res) {
  //     console.log(res.data);
  //     this.positionY = res.data;
  //   },
  // });
  // },

  created() {
    //记录本地存储的其他页面最后滑动后的高度
    let topBtnSecure = JSON.parse(context.getSecureAsync('currentBtnTop'));
    this.currentBtnStyle = topBtnSecure;
    //取本地存储有没有关闭此悬浮按钮
    let showBtn = JSON.parse(context.getSecureAsync('showBtn'));
    let a = showBtn === null ? 'true' : showBtn;
    this.$set(this.showBtnStore, 'key', a);
  },
  mounted() {},
  methods: {
    starts() {},
    move(e) {
      //鼠标按下并移动的事件
      this.currentTop = e.touches[0].clientY - 20;
      this.currentBtnStyle = 'top:' + this.currentTop + 'px';
    },
    moveup() {
      //记录放开时距屏幕的高度
      context.setSecure('currentBtnTop', this.currentBtnStyle);
      //h5的高度传给小程序

      // login: { isLogin: false }
      context.postMessage({ h5CurrentBtnTop: this.currentBtnStyle });
    },
    //关闭悬浮按钮
    closeBtn() {
      this.showBtnStore.key = 'false';
      //本地存一个悬浮按钮展示隐藏的标志
      context.setSecure('showBtn', 'false');
      //h5关闭悬浮按钮时传给小程序
      context.postMessage({ h5CloseBtn: false });
    },
    goWeb2(url) {
      console.log(url);
      //使用场景的方式来跳转其他功能模块
      context.launchStage('main.download');
      // window.location.href = "http://localhost:8080/common#/download"
    },
  },
  // setup(props, context) {
  //   let store = useStore()
  //   let defaultY = ref(200); //高度
  //   let moves = ref(null); //悬浮dom
  //   let positionY = ref(0); //初始化top为0\
  //   let computedStyle = ref("");
  //   onMounted(() => {
  //     //设置默认高度或者从h5跳回来赋到这
  //     // positionY.value = store.state.positionComputed
  //   });
  //   //开始的拖拽的触发操作
  //   const starts = (e) => {
  //     // context.emit('sendIsScroll', 'overflow:hidden;max-height:100vh')
  //     defaultY.value = e.target.offsetTop;
  //   };
  //   //拖拽的操作
  //   const move = (e) => {
  //     e.stopPropagation()
  //     positionY.value = e.touches[0].clientY - 20;
  //   };

  //   // watch(
  //   //   () => positionY.value, (newValue, oldValue) => {
  //   //     // computedStyle.value = "transform:translate(0px," + newValue + "px)"
  //   //     computedStyle.value = "top:" + newValue + "px";
  //   //     //从父组件发送到子组件这个动态的高度
  //   //     context.emit('sendBtnTop', computedStyle.value)
  //   //     // context.emit('sendIsScroll', 'overflow:hidden;max-height:100vh')
  //   //   }
  //   // );
  //   const moveup = (e) => {
  //     // context.emit('sendIsScroll', '')
  //     //记录放开时距屏幕的高度
  //     Taro.setStorage({
  //       key: "offsetTop",
  //       data: positionY.value,
  //     });
  //   };
  //   //关闭悬浮按钮
  //   const closeBtn = () => {
  //     store.commit('showBtnStore', { data: false })
  //   };

  //   return {
  //     defaultY,
  //     moves,
  //     positionY,
  //     computedStyle,
  //     starts,
  //     move,
  //     moveup,
  //     // getStyle,
  //     closeBtn,
  //   };
  // },
};
</script>
<style>
.mobile {
  width: 220px;
  /* height: 100px; */
  /* text-align: center; */
  /* line-height: 100px; */
  border-radius: 60px 0 0 60px;
  border: 1px solid #999;
  border-left: none;
  background-color: #fff;
  position: fixed;
  z-index: 999;
  top: 40%;
  right: 0;
  font-size: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* // justify-content: space-around; */
  padding: 10px 0;
}

.imgContain {
  width: 100%;
  box-sizing: border-box;
  padding: 0 10px 0 30px;
  display: flex;
  justify-content: space-between;
}

.zhanwei {
  opacity: 0;
}

.img {
  width: 50px;
  height: 50px;
}

.btn {
  text-align: center;
  width: 50px;
  height: 50px;
}
</style>
