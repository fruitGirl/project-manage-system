/*
 * @Description:项目-项目列表页
 * @Author: danding
 * @Date: 2019-06-20 17:08:10
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 15:04:57
 */

<template>
  <div class="page-container project-list-wrap">
    <search-header @handleSubmit="handleSubmit" />
    <project-table />
    <team-drawer />
    <pm-drawer
      :visible="showRelateProduct"
      :title="`${curSelectedProject.name} · 关联产品`"
      @onCancel="displayRelateProductDrawer(false)"
      @onSubmit="handleSaveRelateProduct"
    >
      <relate-product
        ref="relateProductRef"
        :products="allProducts"
        :default-selected-keys="relateProductData"
        :title="curSelectedProject.name"
      />
    </pm-drawer>
    <pm-drawer
      :visible="showProjectMsgDrawer"
      :title="`${curEditProject.name} · 编辑项目`"
      @onCancel="displayProjectMsgDrawer(false)"
      @onSubmit="handleSaveProductMsg"
    >
      <project-template
        ref="projectTemplateRef"
        :has-default-time-range="false"
      />
    </pm-drawer>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import SearchHeader from '@/components/business/project/project-list/search-header.vue';
import TeamDrawer from '@/components/business/project/project-list/team-drawer.vue';
import RelateProduct from '@/components/business/project/project-list/relate-product.vue';
import PmDrawer from '@/components/common/pm-drawer.vue';
import ProjectTable from '@/components/business/project/project-list/project-table.vue';
import ProjectTemplate from '@/components/business/project/project-template.vue';

const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  'project/project-list'
);

export default {
  head: {
    title: '项目列表'
  },
  components: {
    SearchHeader,
    TeamDrawer,
    RelateProduct,
    PmDrawer,
    ProjectTable,
    ProjectTemplate
  },
  data() {
    return {};
  },
  computed: {
    ...mapState([
      'showRelateProduct',
      'savedSearchVals',
      'relateProductData',
      'allProducts',
      'curSelectedProject',
      'showProjectMsgDrawer',
      'curEditProject'
    ])
  },
  watch: {
    curEditProject(newVal) {
      // 项目抽屉组件赋值
      this.$refs.projectTemplateRef.setValue(newVal);
    }
  },
  created() {
    if (process.client) {
      this.handleSubmit(); // 初始化请求
    }
  },
  methods: {
    ...mapActions(['handleSubmit', 'saveRelateProduct', 'saveProjectMsg']),
    ...mapMutations(['displayRelateProductDrawer', 'displayProjectMsgDrawer']),
    handleSaveRelateProduct() {
      // 保存关联产品信息
      const productIds = this.$refs.relateProductRef.getSelectedKeys();
      const { id } = this.curSelectedProject;
      this.saveRelateProduct({ productIds, projectId: id });
    },
    handleSaveProductMsg() {
      // 保存项目信息
      this.$refs.projectTemplateRef.getValue(data => {
        const { id } = this.curEditProject;
        this.saveProjectMsg({ projectId: id, ...data });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.project-list-wrap {
  padding: 15px;
  background-color: #fff;
  .search-form {
    font-size: 14px;
    color: #000;
    float: right;
    .el-form-item {
      margin-right: 20px;
    }
  }
  .el-checkbox {
    color: #000;
  }
  .more-filter {
    float: right;
    margin: 5px 0 0 10px;
    font-size: 14px;
  }
}
</style>
