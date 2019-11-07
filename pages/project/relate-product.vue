<template>
  <div class="page-container operate-reserve-wrapper">
    <h5 style="padding:0 16px">已关联</h5>
    <relate-product
      ref="relateProductRef"
      :products="relateProductData"
      :default-selected-keys="relateProductKey"
    />
    <h5 style="padding: 0 16px">未关联</h5>
    <relate-product
      ref="noRelateProductRef"
      :products="allProducts"
      :default-selected-keys="[]"
    />
    <pm-button-group :buttons="buttons" @onSave="save" />
  </div>
</template>

<script>
import RelateProduct from '@/components/business/project/project-list/relate-product.vue';
import { createNamespacedHelpers } from 'vuex';
import PmButtonGroup from '@/components/common/pm-button-group.vue';

const { mapActions, mapState } = createNamespacedHelpers(
  'project/relate-product'
);

export default {
  head() {
    return {
      title: '设置-产品'
    };
  },
  components: {
    RelateProduct,
    PmButtonGroup
  },
  data() {
    return {
      buttons: [{ label: '保存', type: 'primary', func: 'onSave' }]
    };
  },
  computed: {
    ...mapState(['relateProductData', 'allProducts']),
    relateProductKey() {
      return this.relateProductData.map(i => {
        return i.id;
      });
    }
  },
  created() {
    this.query();
  },
  methods: {
    ...mapActions(['getRelateProduct', 'saveRelateProduct']),
    query() {
      const { dependenceId } = this.$route.query;
      this.dependenceId = dependenceId;
      this.getRelateProduct({ projectId: dependenceId });
    },
    async save() {
      const relateId = this.$refs.relateProductRef.getSelectedKeys();
      const noRelateId =  this.$refs.noRelateProductRef.getSelectedKeys();
      const productIds = Array.from(new Set([...relateId, ...noRelateId]));
      if (productIds && productIds.length) {
        await this.saveRelateProduct({ productIds, projectId: this.dependenceId });
        await this.query();
      } else {
        this.$message({
          message: '请选择关联的产品',
          type: 'warning'
        });
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
