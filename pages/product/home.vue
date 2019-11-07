/*
 * @Description: 产品-首页
 * @Author: xiaojian
 * @Date: 2019-06-17 11:29:31
 * @Last Modified by: moran
 * @Last Modified time: 2019-10-30 18:13:28
 */
<template>
  <article v-cloak class="product-home-wrap">
    <article class="product-wrap">
      <RequirementCard :data="requirementLists" />
      <ProjectCard :data-source="projectList" />
    </article>
    <article class="info-wrap">
      <BaseInfoCard
        :product-id="productId"
        :data="productData"
      />
      <OperationRecordCard
        :operation-log-list="operationLogsGetter"
      />
    </article>
  </article>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import ProjectCard from '@/components/business/product/home/project.vue';
import BaseInfoCard from '@/components/business/product/home/base-info.vue';
import RequirementCard from '@/components/business/product/home/requirement.vue';
import OperationRecordCard from '@/components/business/product/home/operation-record.vue';

const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  'product/home'
);
const {
  mapActions: mapCommonActions,
  mapGetters: mapCommonGetters
} = createNamespacedHelpers('common-config');

export default {
  head() {
    return {
      title: '产品主页'
    };
  },
  components: {
    BaseInfoCard,
    RequirementCard,
    ProjectCard,
    OperationRecordCard
  },
  data() {
    return {
      productId: this.$route.query.dependenceId
    };
  },
  computed: {
    ...mapState([
      'productData',
      'projectList',
      'requirementLists',
      'userIdNickNameMap'
    ]),
    ...mapCommonGetters(['operationLogsGetter'])
  },
  mounted() {
    this.handleGetHomeData();
    this.setProductId({ payload: this.productId });
    this.getOperationLog({
      operateObjectType: 'PRODUCT',
      operateObjectId: this.productId
    });
  },
  methods: {
    ...mapActions(['getProductHomeData']),
    ...mapCommonActions(['getOperationLog']),
    ...mapMutations(['setProductId']),
    handleGetHomeData() {
      this.getProductHomeData({ productId: this.productId });
    }
  }
};
</script>

<style lang="less">
.product-home-wrap {
  display: flex;
  font-size: 14px;
  padding: 20px;
  .product-wrap,
  .info-wrap {
    display: flex;
    flex-direction: column;
  }
  .product-wrap {
    flex: 1;
    min-width: 0;
  }
  .info-wrap {
    width: 400px;
    margin-left: 15px;
  }
  .card-section {
    padding: 15px;
    margin-bottom: 15px;
    background: #fff;
    border-radius: 3px;
  }
  .content {
    padding: 25px 15px;
  }
  .section-header {
    display: flex;
    justify-content: space-between;
    .title {
      display: inline-block;
      font-size: 14px;
      color: #020202;
      font-weight: normal;
    }
    .extra {
      color: #1687d9;
      cursor: pointer;
    }
  }
}
</style>
