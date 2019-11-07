/*
 * @Description: bug列表
 * @Author: yaochen
 * @Date: 2019-06-20 09:35:36
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-04 11:30:21
 */

<template>
  <div class="bug-list page-container">
    <search-header
      :has-dependence-id="hasDependenceId"
      @btnClicked="showAddBugHandler"
      @query="query"
    />
    <pm-table
      :data="list"
      :column="columns"
      :operation-width="240"
      :default-sort="defaultSort"
      :pagination="pagination"
      @pageChange="pageChangeHandle"
      @sort="sortHandler"
    >
      <template v-slot:title="{ rowData }">
        <a href="javascript:;" @click="openBugDetailDrawer(rowData)">{{
          rowData.title
        }}</a>
      </template>
      <template v-slot:status="{ rowData }">
        <span v-if="rowData.status === BUG_ACTIVATED_STATUS" style="color: #ff3838">已激活</span>
        <span v-else-if="rowData.status === BUG_RESOLVED_STATUS" style="color: #58c07f">已处理</span>
        <span v-else-if="rowData.status === BUG_CLOSED_STATUS" style="color: #999">已关闭</span>
      </template>
      <template v-slot:operation="{ rowData }">
        <el-button
          v-if="rowData.status !== BUG_ACTIVATED_STATUS && rowData.managerCreater"
          type="text"
          @click="activeHandle(rowData)"
          >激活</el-button
        >
        <el-button
          v-if="rowData.status === BUG_ACTIVATED_STATUS && rowData.managerMember"
          type="text"
          @click="disposeHandle(rowData)"
          >处理</el-button
        >
        <el-button
          v-if="rowData.status === BUG_RESOLVED_STATUS && rowData.managerCreater"
          type="text"
          @click="closeHandle(rowData)"
          >关闭</el-button
        >
        <el-button v-if="rowData.status === BUG_ACTIVATED_STATUS" type="text" @click="editHandle(rowData)">编辑</el-button>
        <el-button v-if="rowData.creater" type="text" @click="deleteHandle(rowData)">删除</el-button>
        <el-dropdown @command='handleCommand'>
          <span class="el-dropdown-link">
            更多<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="{type: 'copy', row: rowData}">复制</el-dropdown-item>
            <el-dropdown-item :command="{type: 'useCase', row: rowData}">建用例</el-dropdown-item>
            <el-dropdown-item :command="{type: 'requirement', row: rowData}">提需求</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </pm-table>
    <!-- 提/编辑bug -->
    <edit-bug
      :is-copy="isCopy"
      :dependence-id="$route.query.dependenceId"
      :title="bugDrawerTitle"
      :visible="showBugDrawer"
      :create-func="bugCreate"
      :edit-func="bugModify"
      :bug-form="bugForm"
      :is-project-modules="hasDependenceId"
      @onSubmit="drawSubmitHandler"
      @onCancel="drawCancelHandler"
    />
    <dispose-bug-dialog
      :dependence-id="hasDependenceId ? projectId : localQueryForm.projectId"
      :bug-id="disposeBugId"
      :submit-handler="disposeSubmitHandler"
      :show.sync="disposeDialogIsShow"
    />
    <!-- 提需求 -->
    <edit-requirement
      title="提需求"
      :visible="showCreateRequirementDrawer"
      :forms="{ attachmentList: [] }"
      @onCancel="displayCreateRequirementDrawer(false)"
      @onSubmit="handleDemandSubmit"
    />
    <!-- 建用例 -->
    <use-case-edit
      title="建用例"
      :visible="showCreateUseCaseDrawer"
      @onSubmit="handleSaveUseCase"
      @onHide="displayCreateUseCaseDrawer(false)"
    />

    <!-- bug详情 -->
    <bug-detail-drawer
      :visible="showBugDetailDrawer"
      :row-data="rowData"
      @editor="editHandle"
      @solve="disposeHandle"
      @close="closeHandle"
      @activate="activeHandle"
      @demand="openRequireDetail"
      @task="openTaskDetail"
      @cancel="displayBugDetailDrawer(false)"/>

    <!-- 需求详情 -->
     <requirement-detail-drawer
      :visible="showRequirementDetailDrawer"
      :requirement-id="requirementId"
      @bugDetail="openBugDetailDrawer"
      @cancel="displayRequirementDetailDrawer(false)"/>

    <!-- 任务详情 -->
    <task-detail-drawer
      :visible="showTaskDetailDrawer"
      :task-id="taskId"
      @onHideDrawer="displayTaskDetailDrawer(false)"
    />
  </div>
</template>

<script>
import {
  createNamespacedHelpers,
  mapActions as rootMapActions
} from 'vuex';
import SearchHeader from '@/components/business/common/bug-list/search-header.vue';
import PmTable from '@/components/common/pm-table';
import EditBug from '@/components/business/common/bug-list/edit-bug.vue';
import DisposeBugDialog from '@/components/business/common/bug-list/dispose-bug-dialog.vue';
import { COLUMNS, BUG_RESOLVED_STATUS, BUG_ACTIVATED_STATUS, BUG_CLOSED_STATUS } from '@/constants/common/bug-list';
import { ALL_PROORITY_VALUES } from '@/constants/common/config';
import { formatSortProp } from '@/utils/common';
import EditRequirement from '@/components/business/common/requirement-list/edit-requirement.vue';
import UseCaseEdit from '@/components/business/common/use-case/use-case-edit.vue';
import BugDetailDrawer from '@/components/business/common/bug-detail-drawer.vue';
import RequirementDetailDrawer from '@/components/business/common/requirement-detail-drawer.vue';
import TaskDetailDrawer from '@/components/business/common/task-detail-drawer.vue';

const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  'project/bug-list'
);
const defaultOption = {
  priorities: ALL_PROORITY_VALUES,
  myAssigned: false,
  mySolved: false,
  myCreated: false
};

export default {
  head() {
    return {
      title: 'BUG列表'
    };
  },
  isKeepAlive: true,
  components: {
    SearchHeader,
    PmTable,
    DisposeBugDialog,
    EditBug,
    EditRequirement,
    UseCaseEdit,
    BugDetailDrawer,
    RequirementDetailDrawer,
    TaskDetailDrawer
  },
  props: {
    hasDependenceId: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      BUG_RESOLVED_STATUS,
      BUG_ACTIVATED_STATUS,
      BUG_CLOSED_STATUS,
      localQueryForm: {},
      columns: COLUMNS, // 列配置
      bugDrawerTitle: '提BUG', // 新增/编辑BUG抽屉的标题
      showBugDrawer: false, // 显示新增/编辑BUG抽屉
      disposeDialogIsShow: false, // 显示处理BUG弹窗
      disposeBugId: '',
      projectId: '',
      bugForm: false,
      orderBys: undefined,
      isCopy: false,
      formData: {},
      rowData: {},
      bugId: '',
      requirementId: '',
      taskId: ''
    };
  },
  computed: {
    ...mapState([
    'defaultSort',
    'pagination', 'list',
    'showBugDetailDrawer',
    'showCreateUseCaseDrawer',
    'showCreateRequirementDrawer',
    'showRequirementDetailDrawer',
    'showTaskDetailDrawer'
    ])
  },
  activated() {
    if (this.hasDependenceId) {
      this.projectId = this.$route.query.dependenceId;
      this.formData = {
        ...this.formData,
        projectId: this.projectId,
        currentPage: this.pagination.page,
        pageSize: this.pagination.itemsPerPage,
        ...defaultOption
      };
      this.bugPageQuery(this.formData);
    }
  },
  methods: {
    ...mapActions([
      'bugPageQuery',
      'activateBug',
      'closeBug',
      'solveBug',
      'bugCreate',
      'bugDelete',
      'bugModifyInitPage',
      'bugModify'
    ]),
    ...rootMapActions('project/requirement-list', ['createDemand', 'saveUseCase']),
    ...mapMutations([
      'displayBugDetailDrawer',
      'displayCreateRequirementDrawer',
      'displayCreateUseCaseDrawer',
      'displayRequirementDetailDrawer',
      'displayTaskDetailDrawer'
    ]),
    sortHandler({ prop, order }) {
      this.orderBys = formatSortProp(prop, order);
      this.reloadList();
    },
    pageChangeHandle(pagination) {
      this.formData = { ...this.formData, ...defaultOption,
        ...this.localQueryForm,
        ...pagination,
        orderBys: this.orderBys,
        projectId: this.projectId };
      this.bugPageQuery(this.formData);
    },
    query(allForm) {
      this.localQueryForm = allForm;
      this.$set(this, 'localQueryForm', allForm);
      this.formData = {
        ...this.formData,
        ...defaultOption,
        ...allForm,
        myAssigned: !!allForm.myAssigned,
        mySolved: !!allForm.mySolved,
        myCreated: !!allForm.myCreated,
        currentPage: 1,
        pageSize: this.pagination.itemsPerPage,
        orderBys: this.orderBys
      };
      if (this.hasDependenceId) {
        this.formData.projectId = this.projectId;
      }
      this.bugPageQuery(this.formData);
    },
    activeHandle(row) {
      this.confirmHandler('确认激活BUG?', () =>
        this.showMessage(
          this.activateBug({
            id: row.id
          }).then(() => {
            this.reloadList();
          }),
          '激活'
        )
      );
    },
    showMessage(req, action) {
      req
        .then(() => {
          this.$message({
            type: 'success',
            message: `${action}成功`
          });
          this.displayBugDetailDrawer(false);
        })
        .catch(err => {
          this.$showErrorMessage(err);
        });
    },
    disposeHandle(row) {
      this.disposeBugId = row.id;
      this.disposeDialogIsShow = true;
    },
    closeHandle(row) {
      this.confirmHandler('确认关闭BUG?', () =>
        this.showMessage(
          this.closeBug({
            id: row.id
          }).then(() => {
            this.reloadList();
            this.displayBugDetailDrawer(false);
          }),
          '关闭'
        )
      );
    },
    editHandle(row) {
      this.displayBugDetailDrawer(false);
      this.isCopy = false;
      this.bugModifyInitPage({
        bugId: row.id
      })
        .then(re => {
          this.bugForm = re.bug;
          this.bugDrawerTitle = '编辑BUG';
          this.showBugDrawer = true;
        })
        .catch(err => {
          this.$showErrorMessage(err);
        });
    },
    disposeSubmitHandler(form) {
      return this.solveBug(form).then(() => {
        this.reloadList();
        this.displayBugDetailDrawer(false);
      });
    },
    copyHandle(row) {
      this.isCopy = true;
      this.bugModifyInitPage({
        bugId: row.id
      })
        .then(re => {
          this.bugForm = re.bug;
          this.bugDrawerTitle = '提BUG';
          this.showBugDrawer = true;
        })
        .catch(err => {
          this.$showErrorMessage(err);
        });
    },
    deleteHandle(row) {
      this.confirmHandler('确认删除BUG?', () =>
        this.showMessage(
          this.bugDelete({
            id: row.id
          }).then(() => {
            this.reloadList();
          }),
          '删除'
        )
      );
    },
    confirmHandler(message, req) {
      this.$confirm(message, '操作提示', {
        type: 'warning'
      })
        .then(() => {
          req();
        })
        .catch(() => {});
    },
    drawSubmitHandler(isCreate) {
      this.reloadList();
      if (!isCreate) this.showBugDrawer = false;
    },
    drawCancelHandler() {
      this.showBugDrawer = false;
    },
    showAddBugHandler() {
      this.bugForm = false;
      this.bugDrawerTitle = '提BUG';
      this.showBugDrawer = true;
    },
    reloadList() {
      this.formData = { ...this.formData,
        ...defaultOption,
        ...this.localQueryForm,
        projectId: this.projectId,
        currentPage: this.pagination.page,
        orderBys: this.orderBys,
        pageSize: this.pagination.itemsPerPage
      };
      this.bugPageQuery(this.formData);
    },
    // bug详情抽屉
    openBugDetailDrawer(rowData) {
      this.rowData = rowData;
      this.displayBugDetailDrawer(true);
      this.displayRequirementDetailDrawer(false);
    },
    // 建需求
    handleDemandSubmit(params, isCreate) {
      this.createDemand(params);
      if (!isCreate) this.displayCreateRequirementDrawer(false);
    },
    handleSaveUseCase(params) {
      this.saveUseCase({ ...params });
    },
    
    // 打开需求详情抽屉
    openRequireDetail(id) {
      this.requirementId = id;
      this.displayRequirementDetailDrawer(true);
      this.displayBugDetailDrawer(false);
    },
    
    // 打开任务详情抽屉
    openTaskDetail(id) {
      this.taskId = id;
      this.displayTaskDetailDrawer(true);
      this.displayBugDetailDrawer(false);
    },

    // 更多
    handleCommand(command) {
      const { type, row } = command;
      switch(type) {
        case 'copy':
          this.copyHandle(row);
          break;
        case 'useCase':
          this.displayCreateUseCaseDrawer(true);
          break;
        case 'requirement':
          this.displayCreateRequirementDrawer(true);
          break;
        default:
          break;
      }                                                       
    }
  }
};
</script>

<style lang="less" scoped>
.left-module {
  width: 300px;
  min-height: 320px;
  margin-right: 15px;
}
</style>
<style lang="less" scoped>
.bug-list .pm-select-style .el-input__inner {
  width: 110px;
}
// 下拉菜单
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
  font-size: 12px;
}

</style>
