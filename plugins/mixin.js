import Vue from 'vue';

Vue.mixin({
  // 当存在head标题，且isKeepAlive为false时，组件/页面被销毁
  deactivated() {
    this.$options.head
      && !this.$options.isKeepAlive
      && this.$destroy();
  }
});
