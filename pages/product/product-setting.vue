/*
 * @Description: 产品-产品设置
 * @Author: xiaojian
 * @Date: 2019-06-17 16:00:28
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 11:01:26
 */
<template>
  <div class="main-wrap page-container">
    <ProductConfigForm
      :is-edit="true"
      :form-data="productInitData"
      :submit="handleProductModify"
    >
      <template v-slot:extraBtn>
        <el-button
          v-if="productInitData.status && productInitData.status.name === 'RUN'"
          type="primary"
          @click="handleShowStopRun"
          >停止运营</el-button
        >
        <el-button
          v-if="
            productInitData.status && productInitData.status.name === 'STOP'
          "
          type="primary"
          @click="handleShowReRun"
          >重新运营</el-button
        >
      </template>
    </ProductConfigForm>
    <RunDialog
      :show.sync="runDialogVisible"
      :type="runDialogType"
      :product-name="productInitData.name"
      :product-id="productId"
      @success-callback="successHandler"
    ></RunDialog>
  </div>
</template>
<script>
import ProductConfigForm from '@/components/business/product/product-config-form.vue';
import RunDialog from '@/components/business/product/run-dialog.vue';
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapState } = createNamespacedHelpers(
  'product/product-setting'
);

export default {
  head() {
    return {
      title: '产品设置'
    };
  },
  components: {
    ProductConfigForm,
    RunDialog
  },
  data() {
    return {
      runDialogType: 'isRun', //   isRun   isStop
      runDialogVisible: false,
      productId: this.$route.query.dependenceId
    };
  },
  computed: {
    ...mapState(['productInitData'])
  },
  mounted() {
    this.handleProductModifyInit({
      data: { productId: this.productId }
    });
  },
  methods: {
    ...mapActions(['handleProductModifyInit', 'handleProductModify']),
    handleShowReRun(data) {
      this.runDialogVisible = true;
      this.runDialogType = 'isRun';
    },
    handleShowStopRun(data) {
      this.runDialogVisible = true;
      this.runDialogType = 'isStop';
    },
    successHandler() {
      this.handleProductModifyInit({
        data: { productId: this.productId }
      });
    }
  }
};
</script>
