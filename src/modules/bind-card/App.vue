<template>
  <div id="app">
    <!-- <keep-alive> -->
    <darg></darg>
    <router-view />

    <!-- <router-view v-if="$route.meta.keepAlive && isRouterAlive" /> -->
    <!-- </keep-alive> -->
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      isRouterAlive: true,
    };
  },
  created() {
    window.APP_PAGE_ROOT = this;
    // 配置微信公众号 js-jdk 内的方法
    this.wxConfig(['onMenuShareAppMessage', 'hideMenuItems']);
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    },
  },
};
</script>
<style>
#app {
  width: 100%;
  height: 100%;
}

.bg {
  background-color: #f7f8fb;
  height: auto;
  padding-bottom: 20px;
  min-height: 100%;
}

.mt24 {
  margin-top: 24px;
}

.plr24 {
  padding-left: 24px;
  padding-right: 24px;
}

.two-bt {
  display: flex;
  flex-direction: row;
  background-size: 100%;
  margin: 48px 24px 0;
}
</style>