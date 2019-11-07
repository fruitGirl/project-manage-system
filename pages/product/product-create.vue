/*
 * @Description: 产品-新增产品页
 * @Author: xiaojian
 * @Date: 2019-06-18 10:25:57
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 11:00:39
 */
<template>
  <div class="page-container">
    <ProductConfigForm :submit="handleCreate"></ProductConfigForm>
  </div>
</template>

<script>
import ProductConfigForm from '@/components/business/product/product-config-form.vue';
import { createNamespacedHelpers } from 'vuex';

const { mapActions } = createNamespacedHelpers('product/product-create');
const { mapMutations: layoutMutations } = createNamespacedHelpers('layout');
const { mapActions: commonActions } = createNamespacedHelpers('common-config');

export default {
  head() {
    return {
      title: '产品_新增产品'
    };
  },
  components: {
    ProductConfigForm
  },
  computed: {},
  methods: {
    ...mapActions(['handleProductCreate']),
    ...layoutMutations(['changeSelectedDependenceId']),
    ...commonActions(['getProducts']),
    handleCreate(params) {
      return this.handleProductCreate(params);
    }
  }
};
</script>
