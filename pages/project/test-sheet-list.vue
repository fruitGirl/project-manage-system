/*
 * @Description: 测试单列表
 * @Author: moran
 * @Date: 2019-06-18 18:27:53
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-04 18:28:01
 */

<template>
  <div v-loading="loading" class="page-container project-test-sheet-list">
    <el-button
      size="small"
      icon="el-icon-plus"
      class="btn-blue btn-add"
      type="primary"
      @click="$PMRouter.push('/project/editor-test')"
      >新增测试单</el-button
    >
    <div class="more-filter">
      <pm-more-filter
        :settings="settings"
        :label-width="100"
        @onSubmit="handleSearch"
      />
    </div>
    <real-time-search
      class="pm-right"
      :is-relate="false"
      :action="TEST_FORM_STATUS_URL"
      @change="handleSumbit"
    ></real-time-search>
    <pm-table
      :data="testSheets"
      :column="column"
      :default-sort="sorts"
      :pagination="paginator"
      :operation-width="210"
      @pageChange="handlePageChange"
      @sort="handleSort"
    >
      <template v-slot:name="{ rowData }">
        <div>
          <pm-link
            :to="{
              path: '/project/test-sheet-detail',
              query: { id: rowData.id, productId: rowData.productId }
            }"
            >{{ rowData.name }}</pm-link
          >
        </div>
      </template>
      <template v-slot:priority="{ rowData }">
        {{ filterPriority(rowData.priority) }}
      </template>
      <template v-slot:bugNum="{ rowData }">
        <span v-if="!rowData.bugNum">{{ rowData.bugNum }}</span>
        <a
          v-else
          href="javascript:;"
          @click="
            getBugsList({
              sourceId: rowData.id,
              sourceType: 'TEST_FORM_CASE_LINK'
            })
          "
          >{{ rowData.bugNum }}</a
        >
      </template>
      <template v-slot:progress_header>
        测试进度
        <el-tooltip effect="dark" content="已执行用例/所有用例" placement="top">
          <i class="el-icon-info"></i>
        </el-tooltip>
      </template>
       <template v-slot:pass_header>
        通过率
        <el-tooltip effect="dark" content="已通过/所有用例" placement="top">
          <i class="el-icon-info"></i>
        </el-tooltip>
      </template>
      <template v-slot:bugNum_header>
        BUG
        <el-tooltip effect="dark" content="剩余未关闭的BUG" placement="top">
          <i class="el-icon-info"></i>
        </el-tooltip>
      </template>
      <template v-slot:operation="{ rowData }">
        <el-button
          v-if="rowData.status.name === 'UNDERWAY'"
          type="text"
          @click="handleFinish(rowData)"
          >完成</el-button
        >
        <el-button
          v-if="rowData.status.name != 'CLOSED'"
          type="text"
          @click="handleClose(rowData)"
          >关闭</el-button
        >
        <el-button
          v-if="rowData.status.name != 'CLOSED'"
          type="text"
          @click="handleEditor(rowData.id)"
          >编辑</el-button
        >
        <el-button
          v-if="rowData.status.name != 'CLOSED' && rowData.hasTestReport"
          type="text"
          @click="
            $PMRouter.push({
              path: '/project/test-report-detail',
              query: { id: rowData.testReportId }
            })
          "
          >报告</el-button
        >
        <el-button
          v-if="rowData.status.name != 'CLOSED'"
          type="text"
          @click="
            $PMRouter.push({
              name: 'project-relate-use-case',
              query: { id: rowData.id, name: '测试单列表' },
              params: { url: '/project/test-sheet-list' }
            })
          "
          >关联</el-button
        >
      </template>
    </pm-table>
    <finish-dialog
      :show.sync="finishDialogVisible"
      :gmt-estimate-end="testRow.gmtEstimateEnd"
      @confirm="handleDialogConfim"
    />
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
import FinishDialog from '@/components/business/project/test-sheet-list/finish-dialog.vue';
import BugListDialog from '@/components/business/common/bug-list-dialog.vue';
import RealTimeSearch from '@/components/business/project/test-sheet-list/real-time-search.vue';
import { TEST_FORM_STATUS_URL } from '@/services/common-config';
import {
  SETTINGS,
  COLUMN,
  SORT_CONFIG
} from '@/constants/project/test-sheet-list';
import { PRIORITY } from '@/constants/common/config';
import { filterEnumsLabel } from '@/utils/common';

const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  'project/test-sheet-list'
);

export default {
  head() {
    return {
      title: '测试单列表'
    };
  },
  isKeepAlive: true,
  components: {
    PmTable,
    PmMoreFilter,
    FinishDialog,
    RealTimeSearch,
    BugListDialog
  },
  data() {
    return {
      column: COLUMN,
      settings: SETTINGS,
      TEST_FORM_STATUS_URL,
      filterPriority: filterEnumsLabel(PRIORITY),
      formData: {
        projectIds: this.$route.query.dependenceId,
        status: null,
        myManager: false,
        myCreated: false,
        priorities: [1, 2, 3, 4]
      },
      testRow: {},
      finishDialogVisible: false,
      pagination: {
        currentPage: 1,
        pageSize: 10
      },
      sorts: {}
    };
  },
  computed: {
    ...mapState([
      'testSheets',
      'projectIdMap',
      'paginator',
      'loading',
      'showBugDialog',
      'bugList'
    ])
  },
  activated() {
    this.handleSumbit();
  },
  methods: {
    ...mapActions([
      'getTestFormPageQuery',
      'finishTestForm',
      'closeTestForm',
      'getBugsList'
    ]),
    ...mapMutations(['displayBugDialog']),

    // 分页查询
    handlePageChange(val) {
      this.formData = { ...this.formData, ...val };
      this.handleSumbit(this.formData);
    },

    // 编辑跳转
    handleEditor(id) {
      this.$PMRouter.push({ path: '/project/editor-test', query: { id: id } });
    },

    // 完成
    handleFinish(row) {
      this.testRow = row;
      this.finishDialogVisible = true;
    },

    // 完成 确定
    handleDialogConfim(data) {
      const params = { id: this.testRow.id.toString(), date: data };
      this.finishTestForm(params).then(() => {
        this.finishDialogVisible = false;
        this.handleSumbit();
      });
    },

    // 更多筛选
    handleSearch(item) {
      const {
        title,
        creator,
        manager,
        gmtCreate,
        gmtEstimateStart,
        gmtEstimateEnd,
        priorities
      } = item;
      this.formData = {
        ...this.pagination,
        ...this.formData,
        title,
        creator,
        manager,
        priorities,
        minGmtCreate: (gmtCreate && gmtCreate[0]) || '',
        maxGmtCreate: (gmtCreate && gmtCreate[1]) || '',
        minGmtEstimateStart: (gmtEstimateStart && gmtEstimateStart[0]) || '',
        maxGmtEstimateStart: (gmtEstimateStart && gmtEstimateStart[1]) || '',
        minGmtEstimateEnd: (gmtEstimateEnd && gmtEstimateEnd[0]) || '',
        maxGmtEstimateEnd: (gmtEstimateEnd && gmtEstimateEnd[1]) || ''
      };
      this.handleSumbit(this.formData);
    },

    // 实时查询
    handleSumbit(val) {
      this.formData = { ...this.pagination, ...this.formData, ...val };
      this.getTestFormPageQuery(this.formData);
    },

    // 排序
    handleSort(sortObj) {
      const { prop, order } = sortObj;
      const orderBys = [SORT_CONFIG[`${prop}_${order}`]];
      this.handleSumbit({ orderBys });
      this.sorts = { prop, order };
    },
    handleClose(row) {
      this.$confirm('关闭后，测试单不可再继续进行测试', '操作提示', {
        confirmButtonText: '保存',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.closeTestForm({
            id: row.id
          }).then(() => {
            this.handleSumbit();
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.project-test-sheet-list {
  padding: 15px;
  background-color: #fff;
  .btn-add {
    float: left;
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
