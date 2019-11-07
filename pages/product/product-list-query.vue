/*
 * @Description: 产品-产品列表查询页
 * @Author: xiaojian
 * @Date: 2019-06-18 10:25:22
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-04 15:33:41
 */
<template>
  <div class="page-container product-list-query-wrap">
    <div class="header">
      <div class="more-filter">
        <pm-more-filter
          :settings="settings"
          @onSubmit="handleMoreFilterSubmit"
        />
      </div>
      <pm-link to="/product/product-create">
        <el-button type="primary" size="small">
          <i class="el-icon-plus"></i> 新增产品
        </el-button>
      </pm-link>
      <searchForm
        ref="searchForm"
        @real-time-submit="handleRealTimeSubmit"
      ></searchForm>
    </div>
    <div class="content">
      <pm-table
        :column="column"
        :data="dataSource"
        :loading="tableLoading"
        :pagination="pagination"
        @pageChange="handlePageChange"
        @sort="handleSort"
      >
        <template v-slot:name="{ rowData }">
          <a @click="handleJumpToSetting(rowData.id)">{{ rowData.name }}</a>
        </template>
        <template v-slot:status="{ rowData }">{{
          rowData.status.message
        }}</template>
        <template v-slot:operation="{ rowData }">
          <el-button
            v-if="rowData.status.name === 'RUN'"
            type="text"
            @click="handleStop(rowData)"
            >停止运营</el-button
          >
          <el-button
            v-if="rowData.status.name === 'STOP'"
            type="text"
            @click="handleRun(rowData)"
            >重新运营</el-button
          >
        </template>
      </pm-table>
    </div>
    <run-dialog
      :product-name="productName"
      :product-id="productId"
      :show.sync="runDialogVisible"
      :type="runDialogType"
      @success-callback="handleRunDialogSuccess"
    ></run-dialog>
  </div>
</template>
<script>
import {
  FORM_SETTINGS,
  TABLE_COLUMNS,
  SORT_MAP
} from '@/constants/product/product-list-query';
import { createNamespacedHelpers } from 'vuex';
import searchForm from '@/components/business/product/product-list-query/search-form.vue';
import PmMoreFilter from '@/components/common/pm-more-filter.vue';
import pmTable from '@/components/common/pm-table';
import pmLink from '@/components/common/pm-link';
import runDialog from '@/components/business/product/run-dialog.vue';
const { mapState, mapActions } = createNamespacedHelpers(
  'product/product-list-query'
);
const { mapMutations: layoutMutations } = createNamespacedHelpers('layout');
export default {
  head() {
    return {
      title: '产品_列表'
    };
  },
  components: {
    pmTable,
    runDialog,
    PmMoreFilter,
    searchForm,
    pmLink
  },
  data() {
    return {
      settings: FORM_SETTINGS,
      runDialogVisible: false,
      productName: '',
      productId: '',
      runDialogType: 'isRerun', // isRerun isStop
      localMoreFilterFormData: {},
      column: TABLE_COLUMNS,
      tableLoading: false,
      orderBys: undefined
    };
  },
  computed: {
    ...mapState(['dataSource', 'pagination'])
  },
  mounted() {
    this.getProductList();
  },
  methods: {
    ...mapActions(['getProductList']),
    ...layoutMutations(['changeSelectedDependenceId']),
    handleGetProductList(params) {
      this.tableLoading = true;
      this.getProductList(params).then(() => {
        this.tableLoading = false;
      });
    },
    handleSort({ column, prop, order }) {
      this.orderBys = SORT_MAP[`${prop}_${order}`];
      this.handleSubmit();
    },
    handleRealTimeSubmit(data) {
      this.handleSubmit();
    },
    handleMoreFilterSubmit(data) {
      const { date = [] } = data;
      const minGmtCreate = date[0];
      const maxGmtCreate = date[1];
      delete data.date;
      this.localMoreFilterFormData = { ...data, minGmtCreate, maxGmtCreate };
      this.handleSubmit();
    },
    handleSubmit(pageData = this.formatPagination(this.pagination)) {
      this.handleGetProductList({
        ...pageData,
        ...this.localMoreFilterFormData,
        ...this.$refs.searchForm.formData,
        orderBys: this.orderBys
      });
    },
    handlePageChange(values) {
      this.handleSubmit(values);
    },
    formatPagination(pagination) {
      const { page, itemsPerPage } = pagination;
      return {
        page,
        pageSize: itemsPerPage
      };
    },
    handleRun(row) {
      this.productId = row.id;
      this.productName = row.name;
      this.runDialogVisible = true;
      this.runDialogType = 'isRun';
    },
    handleStop(row) {
      this.productId = row.id;
      this.productName = row.name;
      this.runDialogVisible = true;
      this.runDialogType = 'isStop';
    },

    handleRunDialogSuccess() {
      this.handleSubmit();
    },
    handleJumpToSetting(id) {
      this.changeSelectedDependenceId({ payload: id });
      this.$PMRouter.push('/product/product-setting');
    }
  }
};
</script>
<style lang="less" scoped>
.product-list-query-wrap {
  font-size: 14px;
  .more-filter {
    float: right;
    margin: 5px 0 0 10px;
    font-size: 14px;
  }
  .content {
    margin-top: 20px;
  }
}
</style>
