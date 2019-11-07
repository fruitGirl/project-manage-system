/*
 * @Description: 项目-测试计划列表
 * @Author: yaochen
 * @Date: 2019-06-24 19:05:46
 * @Last Modified by: moran
 * @Last Modified time: 2019-08-29 14:46:49
 */

<template>
  <div class="page-content-container">
    <div class="search-bar pm-clearfix">
      <el-form class="pm-left" inline>
        <el-form-item>
          <pm-link to="./create-test-plan">
            <el-button type="primary">+ 新增计划</el-button>
          </pm-link>
        </el-form-item>
      </el-form>
      <pm-more-filter
        class="more-filter pm-right"
        :settings="settings"
        @onSubmit="handleMoreFilterSubmit"
      />
      <search-form
        ref="searchForm"
        @real-time-submit="handleRealTimeSubmit"
      ></search-form>
    </div>
    <pm-table
      :data="dataSource"
      :column="column"
      :pagination="pagination"
      :loading="tableLoading"
      @pageChange="handlePageChange"
    >
      <template v-slot:name="{ rowData }">
        <pm-link :to="`./test-plan-detail?testPlanId=${rowData.id}`">{{
          rowData.name
        }}</pm-link>
      </template>
      <template v-slot:enabled="{ rowData }">{{
        rowData.enabled ? '有效' : '无效'
      }}</template>
      <template v-slot:status="{ rowData }">{{
        rowData.status && rowData.status.message
      }}</template>
      <template v-slot:operation="{ rowData }">
        <el-button type="text" @click="editHandle(rowData)">编辑</el-button>
        <el-button type="text" @click="deleteHandle(rowData)">删除</el-button>
      </template>
    </pm-table>
  </div>
</template>

<script>
import PmTable from '@/components/common/pm-table.vue';
import PmLink from '@/components/common/pm-link';
import { FORM_SETTINGS, COLUMN } from '@/constants/project/test-plan-list';
import PmMoreFilter from '@/components/common/pm-more-filter';
import searchForm from '@/components/business/project/test-plan-list/search-form.vue';
import { createNamespacedHelpers } from 'vuex';
import { ALL_PROORITY_VALUES } from '@/constants/common/config';

const { mapActions, mapState } = createNamespacedHelpers(
  'project/test-plan-list'
);

export default {
  head() {
    return {
      title: '测试计划列表'
    };
  },
  isKeepAlive: true,
  components: {
    PmTable,
    PmMoreFilter,
    searchForm,
    PmLink
  },
  data() {
    return {
      column: COLUMN,
      settings: FORM_SETTINGS,
      localMoreFilterFormData: {
        priorities: ALL_PROORITY_VALUES
      },
      tableLoading: false,
      projectId: '',
      formData: {
        status: null,
        myCreated: false
      }
    };
  },
  computed: {
    ...mapState(['dataSource', 'pagination'])
  },
  activated() {
    this.projectId = this.$route.query.dependenceId;
    this.handleSubmit();
  },
  methods: {
    ...mapActions(['getTestPlanPage', 'testPlanDelete']),
    editHandle(row) {
      this.$PMRouter.push(`/project/create-test-plan?testPlanId=${row.id}`);
    },
    deleteHandle(row) {
      this.getConfirmResult('确定删除计划吗', '操作提示').then(re => {
        if (re) {
          this.testPlanDelete({ testPlanId: row.id })
            .then(() => {
              this.handleSubmit();
            })
            .catch(err => {
              this.$showErrorMessage(err);
            });
        }
      });
    },
    getConfirmResult(message, title) {
      return this.$confirm(message, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      });
    },
    handlePageChange(val) {
      this.handleSubmit(val);
    },
    handleRealTimeSubmit(data) {
      this.handleSubmit(this.formatPagination(this.pagination), data);
    },
    handleMoreFilterSubmit(data) {
      const { gmtCreate = [] } = data;
      const [minGmtCreate = '', maxGmtCreate = ''] = gmtCreate;
      delete data.gmtCreate;
      this.localMoreFilterFormData = { ...data, minGmtCreate, maxGmtCreate };
      this.handleSubmit();
    },
    handleSubmit(pageData = this.formatPagination(this.pagination), data) {
      this.formData = {
        ...this.formData,
        ...pageData,
        ...this.localMoreFilterFormData,
        ...data
      };
      this.handlegGetTestPlan(this.formData);
    },
    formatPagination(pagination) {
      const { page, itemsPerPage } = pagination;
      return {
        page,
        pageSize: itemsPerPage
      };
    },
    handlegGetTestPlan(data) {
      this.tableLoading = true;
      this.getTestPlanPage({ ...data, projectIds: this.projectId }).then(() => {
        this.tableLoading = false;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.more-filter {
  line-height: 32px;
  margin-bottom: 18px;
  margin-left: 4px;
}
</style>
