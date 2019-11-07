import Vue from 'vue';
import Element from 'element-ui';
import PmLink from '@/components/common/pm-link.vue';

export default () => {
  Vue.use(Element, { size: 'small' });
  Vue.component('pm-link', PmLink);
};
