<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive && isRouterAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive && isRouterAlive" />
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
    this.wxConfig(['onMenuShareAppMessage', 'hideMenuItems'], ['wx-open-launch-app']);
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    },
  },
};
</script>

<style lang="scss">
#app {
  overflow-y: auto;
  background-color: #f7f8fb;
}
.view {
  padding-top: 0;
}
body {
  background-color: var(--color-bg-default);
}
</style>
