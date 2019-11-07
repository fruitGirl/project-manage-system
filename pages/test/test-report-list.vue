/*
 * @Description: 测试-测试报告查询
 * @Author: moran
 * @Date: 2019-06-18 12:23:26
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 15:46:31
 */

<template>
  <div v-loading="loading" class="page-container product-project-list">
    <div class="more-filter">
      <pm-more-filter :settings="settings" @onSubmit="handleSearch" />
    </div>
    <el-checkbox v-model="formDatas.myPublish" @change="handleSubmit"
      >我发布的</el-checkbox
    >
    <el-cascader
      v-model="moduleArr"
      clearable
      filterable
      class="cascader"
      size="small"
      placeholder="请选择模块名称"
      :options="productByModuleTree"
      :props="{
        children: 'subModuleInfo',
        label: 'name',
        value: 'id',
        checkStrictly: true
      }"
      @change="handleCascaderChange"
    />
    <pm-table
      :data="testReportPage"
      :column="column"
      :default-sort="sorts"
      :pagination="paginator"
      :is-operation="false"
      @pageChange="handlePageChange"
      @sort="handleSort"
    >
      <template v-slot:name="{ rowData }">
        <div>
          <pm-link
            :to="{
              path: '/test/test-report-detail',
              query: { id: rowData.id }
            }"
            >{{ rowData.name }}</pm-link
          >
        </div>
      </template>
      <template v-slot:bugNum="{ rowData }">
        <span v-if="!rowData.bugNum">{{ rowData.bugNum }}</span>
        <a
          v-else
          href="javascript:;"
          @click="
            getBugsList({
              sourceId: rowData.testFormId,
              sourceType: 'TEST_FORM_CASE_LINK'
            })
          "
          >{{ rowData.bugNum }}</a
        >
      </template>
      <template v-slot:bugNum_header>
        BUG
        <el-tooltip effect="dark" content="剩余未关闭的BUG" placement="top">
          <i class="el-icon-info"></i>
        </el-tooltip>
      </template>
    </pm-table>
    <bug-list-dialog
      :is-visible="showBugDialog"
      :data="bugList"
      @close="displayBugDialog({ payload: false })"
    />
  </div>
</template>
<script>
import {
  createNamespacedHelpers,
  mapActions as rootMapActions,
  mapState as rootMapState
} from 'vuex';

import PmTable from '@/components/common/pm-table.vue';
import PmMoreFilter from '@/components/common/pm-more-filter.vue';
import BugListDialog from '@/components/business/common/bug-list-dialog.vue';
import {
  SETTINGS,
  COLUMN,
  SORT_CONFIG
} from '@/constants/project/test-report-list';

const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  'test/test-report-list'
);

export default {
  head: {
    title: '报告'
  },
  isKeepAlive: true,
  components: {
    PmTable,
    PmMoreFilter,
    BugListDialog
  },
  data() {
    return {
      column: COLUMN,
      settings: SETTINGS,
      productId: this.$route.query.dependenceId,
      formDatas: {
        myPublish: false,
        productId: this.$route.query.dependenceId
      },
      moduleArr: [],
      pagination: {
        currentPage: 1,
        pageSize: 10
      },
      sorts: {}
    };
  },
  computed: {
    ...mapState([
      'testReportPage',
      'paginator',
      'loading',
      'showBugDialog',
      'bugList'
    ]),
    ...rootMapState('common-config', ['productByModuleTree'])
  },
  activated() {
    this.getProductByModuleTree({ productId: this.productId });
    this.handleSubmit({ currentPage: this.paginator.page });
  },
  methods: {
    ...mapActions(['getTestReportPage', 'getBugsList']),
    ...rootMapActions('common-config', ['getProductByModuleTree']),
    ...mapMutations(['displayBugDialog']),

    // 模块查询
    handleCascaderChange() {
      const len = this.moduleArr.length;
      const moduleId = len >= 1 ? this.moduleArr[len - 1] : undefined;
      this.formDatas = { ...this.formDatas, ...this.pagination, moduleId };
      this.getTestReportPage(this.formDatas);
    },

    // 排序
    handleSort(sortObj) {
      const { prop, order } = sortObj;
      const orderBys = [SORT_CONFIG[`${prop}_${order}`]];
      this.handleSubmit({ orderBys });
      this.sorts = { prop, order };
    },

    // 分页查询
    handlePageChange(val) {
      this.getTestReportPage({ ...this.formDatas, ...this.pagination, ...val });
    },

    // 更多筛选
    handleSearch(item) {
      const { timeFormat } = item;
      this.formDatas = {
        ...this.formDatas,
        ...this.pagination,
        ...item,
        minGmtPublish: timeFormat ? timeFormat[0] : '',
        maxGmtPublish: timeFormat ? timeFormat[1] : ''
      };
      delete this.formDatas.timeFormat;
      this.getTestReportPage(this.formDatas);
    },

    // 实时查询
    handleSubmit(val = {}) {
      this.formDatas = { ...this.formDatas, ...this.pagination, ...val };
      this.getTestReportPage(this.formDatas);
    }
  }
};
</script>

<style lang="less" scoped>
.product-project-list {
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
