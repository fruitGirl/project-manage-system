/*
 * @Description: 项目-测试报告查询
 * @Author: moran
 * @Date: 2019-06-18 12:23:26
 * @Last Modified by: moran
 * @Last Modified time: 2019-08-29 12:27:59
 */

<template>
  <div v-loading="loading" class="page-container product-project-list">
    <div class="more-filter">
      <pm-more-filter :settings="settings" @onSubmit="handleSearch" />
    </div>
    <el-checkbox v-model="formDatas.myPublish" @change="handleSubmit"
      >我发布的</el-checkbox
    >

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
        <pm-link
          :to="{
            path: '/project/test-report-detail',
            query: { id: rowData.id }
          }"
          >{{ rowData.name }}</pm-link
        >
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
import { createNamespacedHelpers } from 'vuex';

import PmTable from '@/components/common/pm-table.vue';
import PmMoreFilter from '@/components/common/pm-more-filter.vue';
import BugListDialog from '@/components/business/common/bug-list-dialog.vue';
import {
  SETTINGS,
  COLUMN,
  SORT_CONFIG
} from '@/constants/project/test-report-list';

const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  'project/test-report-list'
);

export default {
  head() {
    return {
      title: '测试报告列表'
    };
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
      formDatas: {
        myPublish: false,
        projectId: this.$route.query.dependenceId
      },
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
    ])
  },
  activated() {
    this.handleSubmit();
  },
  methods: {
    ...mapActions(['getTestReportPage', 'getBugsList']),
    ...mapMutations(['displayBugDialog']),

    // 排序
    handleSort(sortObj) {
      const { prop, order } = sortObj;
      const orderBys = [SORT_CONFIG[`${prop}_${order}`]];
      this.handleSubmit({ orderBys });
      this.sorts = { prop, order };
    },

    // 分页查询
    handlePageChange(val) {
      this.formDatas = { ...this.formDatas, ...val };
      this.handleSubmit(this.formDatas);
    },

    // 更多筛选
    handleSearch(item) {
      const { timeFormat } = item;
      this.formDatas = {
        ...this.pagination,
        ...this.formDatas,
        ...item,
        minGmtPublish: timeFormat ? timeFormat[0] : '',
        maxGmtPublish: timeFormat ? timeFormat[1] : ''
      };
      delete this.formDatas.timeFormat;
      this.getTestReportPage(this.formDatas);
    },

    // 查询
    handleSubmit(val) {
      this.formDatas = { ...this.pagination, ...this.formDatas, ...val };
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
