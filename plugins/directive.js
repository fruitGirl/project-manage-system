import Vue from 'vue';

Vue.directive('preventReClick', {
  componentUpdated: function(el, binding, vnode) {
    // el.classList.add('is-loading');
    // vnode.context.loading = true;
    // vnode.componentOptions.propsData.loading = true;
    // vnode.componentInstance.loading = true;
    // vnode.child.loading = true;
    // console.log(this);
  }
});
