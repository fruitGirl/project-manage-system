/*
 * @Description:项目-任务列表查询页
 * @Author: xiaojian
 * @Date: 2019-06-20 17:08:10
 * @Last Modified by: danding
 * @Last Modified time: 2019-11-05 15:05:10
 */
<template>
  <div class="page-container task-list-wrap">
    <el-button icon="el-icon-plus" type="primary" @click="handleCreateTask"
      >建任务</el-button
    >
    <div class="more-filter">
      <pm-more-filter :settings="settings" @onSubmit="handleMoreFilterSubmit" />
    </div>
    <search-form
      ref="searchForm"
      @real-time-submit="handleRealTimeSubmit"
    ></search-form>
    <pm-table
      :data="dataSource"
      :column="columns"
      :loading="tableLoading"
      :pagination="pagination"
      :fix-operation-width="260"
      @pageChange="handlePageChange"
      @handleCheck="handleCheck"
      @sort="handleSort"
    >
      <template v-slot:priority="{ rowData }">{{
        transPriority(rowData.priority)
      }}</template>
      <template v-slot:name="{ rowData }">
        <a href="javascript:;" @click="openTaskDetailDrawer(rowData.id)">{{
          rowData.name
        }}</a>
      </template>
      <template v-slot:type="{ rowData }">{{ rowData.type.message }}</template>
      <template v-slot:status="{ rowData }">
        <pm-dot :color="setColors(rowData.status.name)" />
        {{ rowData.status.message }}
      </template>
      <template v-slot:hours="{ rowData }">
        {{ rowData.estimateHours }} / {{ rowData.actualHours }}
      </template>
      <template v-slot:hours_header>
        工时/h
        <el-tooltip effect="dark" content="预估/实际" placement="top">
          <i class="el-icon-info"></i>
        </el-tooltip>
      </template>
      <template v-slot:operation="{ rowData }">
        <div>
          <el-button
            v-if="checkBtnVisible(rowData, ['DELAYED', 'UNDERWAY'])"
            type="text"
            @click="handleFinishTask(rowData)"
            >完成</el-button>
           <el-button
            v-if="rowData.managerCreater && rowData.status.name !== 'FINISHED'"
            type="text"
            @click="handleDeleteTask(rowData)"
            >删除</el-button>
          <el-dropdown @command='handleCommand'>
            <span class="el-dropdown-link">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="checkBtnVisible(rowData, ['UNSTART'])" :command="{type: 'start', rowData: rowData}">开始</el-dropdown-item>
              <el-dropdown-item v-if="checkBtnVisible(rowData, ['DELAYED', 'UNDERWAY'])" :command="{type: 'pause', rowData: rowData}">暂停</el-dropdown-item>
              <el-dropdown-item v-if="checkBtnVisible(rowData, ['PAUSED'])" :command="{type: 'continue', rowData: rowData}">继续</el-dropdown-item>
              <el-dropdown-item
                v-if="
                checkBtnVisible(rowData, [
                  'DELAYED',
                  'UNDERWAY',
                  'UNSTART',
                  'PAUSED'
                ])
              "
              :command="{type: 'terminal', rowData: rowData}">终止</el-dropdown-item>
              <el-dropdown-item
                v-if="
                checkBtnVisible(rowData, [
                  'DELAYED',
                  'UNDERWAY',
                  'UNSTART',
                  'PAUSED'
                ])
              "
              :command="{type: 'edit', rowData: rowData}">编辑</el-dropdown-item>
              <el-dropdown-item :command="{type: 'copy', rowData: rowData}">复制</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

      </template>
    </pm-table>
    <startTaskDialog
      title="开始任务"
      :data="currentRowData"
      :visible.sync="startTaskDialogVisible"
      @submit-success="handleStarTaskSuccess"
    ></startTaskDialog>
    <finishTaskDialog
      title="完成任务"
      :visible.sync="finishTaskDialogVisible"
      :data="currentRowData"
      @submit-success="handleFinishTaskSuccess"
    ></finishTaskDialog>
    <reasonDialog
      :title="reasonDialogTitle"
      :reason-label="reasonDialogLabel"
      :visible.sync="reasonDialogVisible"
      :submit="handleReasonDialogSubmit"
    ></reasonDialog>
    <task-drawer
      :id="taskId"
      :type="taskDrawerType"
      :title="taskDrawerTitle"
      :visible.sync="taskDrawerVisible"
      :project-id="projectId"
      :project-name="dependenceProjectName"
      @submit-success="
        handleRefresh();
      "
    />
    <task-detail-drawer
      :visible="showTaskDetailDrawer"
      :task-id="selectedTaskId"
      @onHideDrawer="displayTaskDetailDrawer(false)"
      @onFinishTask="handleFinishTask"
      @onEditTask="handleEditTask"
      @onPause="handlePause"
      @onContinue="handleContinue"
      @onTerminal="handleTerminal"
      @onCopyTask="handleCopyTask"
    />
  </div>
</template>

<script>
import mixins from '@/mixins/task-list-query';
import { createNamespacedHelpers } from 'vuex';
import PmDot from '@/components/common/pm-dot.vue';
import pmTable from '@/components/common/pm-table.vue';
import PmMoreFilter from '@/components/common/pm-more-filter.vue';
import reasonDialog from '@/components/business/common/reason-dialog';
import { PRIORITY, ALL_PROORITY_VALUES } from '@/constants/common/config';
import searchForm from '@/components/business/project/task-list-query/search-form.vue';
import taskDrawer from '@/components/business/project/task-list-query/task-drawer.vue';
import { FORM_SETTINGS, TABLE_COLUMNS, SORT_MAP } from '@/constants/project/task-list-query';
import startTaskDialog from '@/components/business/project/task-list-query/start-task-dialog';
import finishTaskDialog from '@/components/business/project/task-list-query/finish-task-dialog.vue';
import TaskDetailDrawer from '@/components/business/common/task-detail-drawer.vue';

const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  'project/task-list-query'
);
const { mapGetters } = createNamespacedHelpers('layout');

export default {
  head() {
    return {
      title: '任务列表'
    };
  },
  isKeepAlive: true,
  components: {
    pmTable,
    searchForm,
    PmMoreFilter,
    startTaskDialog,
    finishTaskDialog,
    reasonDialog,
    taskDrawer,
    PmDot,
    TaskDetailDrawer
  },
  mixins: [mixins],
  data() {
    return {
      PRIORITY,
      taskId: '', // 任务id
      settings: FORM_SETTINGS,
      columns: TABLE_COLUMNS,
      tableLoading: false,
      localMoreFilterFormData: {},
      orderBys: '',
      formDatas: {},
      projectId: this.$route.query.dependenceId
    };
  },
  computed: {
    ...mapState(['dataSource', 'pagination', 'showTaskDetailDrawer', 'selectedTaskId']),
    ...mapGetters(['dependenceProjectName']),
  },
  activated() {
    this.$nextTick(() => {
      this.handleRealTimeSubmit();
    });
  },
  methods: {
    ...mapActions(['getTaskList', 'continueTask', 'pauseTask', 'terminalTask', 'deleteTask']),
    ...mapMutations(['displayTaskDetailDrawer', 'setSelectedTaskId']),

    // 状态色值设置
    setColors(status) {
      if (
        status === 'UNSTART'
        || status === 'PAUSED'
        || status === 'TERMINATED'
      ) {
        return '#e7e7e7';
      } else if (status === 'UNDERWAY') {
        return '#f9b330';
      } else if (status === 'DELAYED') {
        return '#ff3838';
      } else if (status === 'FINISHED') {
        return '#58c07f';
      }
      return '#e7e7e7';
    },

    // 更多
    handleCommand(row) {
      const { type, rowData } = row;
      switch(type) {
        case 'start':
          this.handleStartTask(rowData);
          break;
        case 'pause':
          this.handlePause(rowData);
          break;
        case 'continue':
          this.handleContinue(rowData);
          break;
        case 'terminal':
          this.handleTerminal(rowData);
          break;
        case 'edit':
          this.handleEditTask(rowData);
          break;
        case 'copy':
          this.handleCopyTask(rowData);
          break;
        default:
          break;
      }
    },

    transPriority(pro) {
      let result = '';
      this.PRIORITY.map(item => {
        if (item.value === pro) {
          result = item.label;
        }
      });
      return result;
    },
    handleRealTimeSubmit(data) {
      this.handleSubmit();
    },
    handleMoreFilterSubmit(data) {
      const {
        gmtCreate = [],
        gmtActualStart = [],
        gmtActualEnd = [],
        gmtEstimateStart = [],
        gmtEstimateEnd = []
      } = data;
      const [minGmtCreate = '', maxGmtCreate = ''] = gmtCreate;
      const [minGmtActualStart = '', maxGmtActualStart = ''] = gmtActualStart;
      const [minGmtActualEnd = '', maxGmtActualEnd = ''] = gmtActualEnd;
      const [minGmtEstimateStart = '', maxGmtEstimateStart = ''] = gmtEstimateStart;
      const [minGmtEstimateEnd = '', maxGmtEstimateEnd = ''] = gmtEstimateEnd;
      delete data.gmtCreate;
      delete data.gmtActualStart;
      delete data.gmtActualEnd;
      delete data.gmtEstimateStart;
      delete data.gmtEstimateEnd;
      this.localMoreFilterFormData = {
        ...data,
        minGmtCreate,
        maxGmtCreate,
        minGmtActualStart,
        maxGmtActualStart,
        minGmtActualEnd,
        maxGmtActualEnd,
        minGmtEstimateStart,
        maxGmtEstimateStart,
        minGmtEstimateEnd,
        maxGmtEstimateEnd
      };
      this.handleSubmit();
    },
    handleGetTaskList(data) {
      this.tableLoading = true;
      this.getTaskList({
        ...data,
        projectId: this.projectId
      }).then(() => {
        this.tableLoading = false;
      });
    },
    handleSubmit(pageData = this.formatPagination(this.pagination)) {
      this.formDatas = {
        ...this.formDatas,
        ...pageData,
        priorities: ALL_PROORITY_VALUES,
        ...this.localMoreFilterFormData,
        ...this.$refs.searchForm.formData,
        orderBys: this.orderBys || undefined
      };
      this.handleGetTaskList(this.formDatas);
    },
    handlePageChange(val) {
      this.handleSubmit(val);
    },
    formatPagination(pagination) {
      const { page, itemsPerPage } = pagination;
      return {
        page,
        pageSize: itemsPerPage
      };
    },
    handleCreateTask() {
      this.taskDrawerTitle = '建任务';
      this.taskDrawerVisible = true;
      this.taskId = '';
      this.taskDrawerType = 'add';
    },
    handleCheck(index, row) {
      this.$router.push(`/product/${row.id}`);
    },
    handleSort({ column, prop, order }) {
      let orderBys = SORT_MAP[`${prop}_${order}`];
      if (column.property === 'gmtActual') {
        orderBys = SORT_MAP[`gmtActualStart_${order}`];
      }
      if (column.property === 'gmtEstimate') {
        orderBys = SORT_MAP[`gmtEstimateStart_${order}`];
      }
      this.orderBys = orderBys;
      this.handleSubmit();
    },
    handleRefresh() {
      this.handleSubmit();
    },

    // 删除任务
    handleDeleteTask(row) {
      this.$confirm('确定删除该任务?', '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const { id } = row;
        this.deleteTask({ taskId: id }).then(() => {
          this.handleSubmit(this.formDatas);
        });
      });
    },
    openTaskDetailDrawer(id) {
      this.displayTaskDetailDrawer(true);
      this.setSelectedTaskId(id);
    }
  }
};
</script>

<style lang="less" scoped>
.task-list-wrap {
  padding: 15px;
  background-color: #fff;
  .more-filter {
    float: right;
    margin: 5px 0 0 10px;
    font-size: 14px;
  }
  // 下拉菜单
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    font-size: 12px;
    margin-left: 10px;
  }
}
</style>
