/*
 * @Description: 需求列表
 * @Author: danding
 * @Date: 2019-06-20 09:35:36
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-04 11:15:39
 */

<template>
  <div v-loading="loading" class="page-transparent-container">
    <div>
      <div class="pm-bg-white pm-module-container">
        <search-header
          :is-project-module="true"
          :disable="isDisable"
          @submit="handleSubmit"
          @add="handleAddDemand"
          @cancel="handleCancelRelateDemand"
        />
        <result-table
          :list="demandLists"
          :columns="columns"
          :pagination="paginator"
          :is-project-module="true"
          :default-sort="sorts"
          :is-popover="isPopover"
          @statusChange="handleStatusChange"
          @assignChange="handleAssignChange"
          @editor="handleEditor"
          @change="handleSubmit"
          @addCase="handleAddCase"
          @select="handleSelectRelate"
          @openDrawer="openRequirementDetailDrawer"
        />
      </div>
    </div>
    <edit-requirement
      :title="reqDrawerTitle"
      :visible="showReqDrawer"
      :forms="initDemands"
      :is-edit='isEdit'
      @onCancel="handleCancle"
      @onSubmit="handleDemandSubmit"
    />
    <use-case-edit
      :title="useCaseTitle"
      :form-data="initTestCaseDatas"
      :visible="showUseCaseDrawer"
      @onSubmit="handleSaveUseCase"
      @onHide="displayUseCaseDrawer({ payload: false })"
    />
    <!-- 需求详情 -->
    <requirement-detail-drawer
      :visible="showRequirementDetailDrawer"
      :requirement-id="requirementId"
      @bugDetail="openBugDetailDrawer"
      @editor="handleEditor"
      @addCase="handleAddCase"
      @taskDetail="openTaskDetailDrawer"
      @cancel="displayRequirementDetailDrawer(false)"/>

    <!-- bug详情 -->
    <bug-detail-drawer
      :visible="showBugDetailDrawer"
      :row-data="rowData"
      @cancel="displayBugDetailDrawer(false)"/>
      
    <!-- 任务详情 -->
    <task-detail-drawer
      :visible="showTaskDetailDrawer"
      :task-id="taskId"
      @onHideDrawer="displayTaskDetailDrawer(false)"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers, mapGetters as rootMapGetter } from 'vuex';
import SearchHeader from '@/components/business/common/requirement-list/search-header.vue';
import ResultTable from '@/components/business/common/requirement-list/result-table.vue';
import { COLUMNS } from '@/constants/common/requirement-list';
import EditRequirement from '@/components/business/common/requirement-list/edit-requirement.vue';
import UseCaseEdit from '@/components/business/common/use-case/use-case-edit.vue';
import RequirementDetailDrawer from '@/components/business/common/requirement-detail-drawer.vue';
import BugDetailDrawer from '@/components/business/common/bug-detail-drawer.vue';
import TaskDetailDrawer from '@/components/business/common/task-detail-drawer.vue';

const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  'project/requirement-list'
);

export default {
  head() {
    return {
      title: '需求'
    };
  },
  isKeepAlive: true,
  components: {
    SearchHeader,
    ResultTable,
    EditRequirement,
    UseCaseEdit,
    RequirementDetailDrawer,
    BugDetailDrawer,
    TaskDetailDrawer
  },
  data() {
    return {
      columns: COLUMNS, // 列配置
      reqDrawerTitle: '提需求',
      useCaseTitle: '建用例',
      projectId: this.$route.query.dependenceId,
      demandId: '',
      formData: {
        // 默认查询数据
        priorityList: [1, 2, 3, 4],
        status: null,
        myCreate: false,
        myCharge: false,
        projectId: this.$route.query.dependenceId
      },
      pagination: {
        currentPage: 1,
        pageSize: 10
      },
      sorts: {},
      isDisable: true,
      multipleSelection: [],
      requirementId: '',
      isEdit: false,
      rowData: {},
      taskId: ''
    };
  },
  computed: {
    ...mapState([
      'paginator',
      'demandLists',
      'showReqDrawer',
      'showUseCaseDrawer',
      'isPopover',
      'initDemands',
      'loading',
      'initTestCaseDatas',
      'showRequirementDetailDrawer',
      'showBugDetailDrawer',
      'showTaskDetailDrawer'
    ]),
    ...rootMapGetter('layout', ['dependenceProductName'])
  },
  activated() {
    this.handleSubmit();
  },
  methods: {
    ...mapActions([
      'getDemandPage',
      'modifyDemandStatus',
      'modifyDemandAssignPerson',
      'createDemand',
      'getInitDemand',
      'modifyDemand',
      'saveUseCase',
      'removeRelateDemand',
      'getInitDemandTestCase'
    ]),
    ...mapMutations([
      'setReqDrawer',
      'setUseCaseDrawer',
      'displayUseCaseDrawer',
      'displayRequirementDetailDrawer',
      'displayBugDetailDrawer',
      'displayTaskDetailDrawer'
    ]),

    // 页面查询
    handleSubmit(val) {
      this.formData = { ...this.pagination, ...this.formData, ...val };
      this.getDemandPage(this.formData);
    },

    // 提需求
    handleAddDemand() {
      this.reqDrawerTitle = '提需求';
      this.isEdit = true;
      this.setReqDrawer({ payload: true });
    },

    // 建用例
    handleAddCase(id) {
      this.demandId = id;
      this.getInitDemandTestCase({ demandId: id });
      this.setUseCaseDrawer({ payload: true });
    },

    // 状态更改
    async handleStatusChange(params) {
      await this.modifyDemandStatus(params);
      this.handleSubmit();
    },

    // 指派人
    async handleAssignChange(params) {
      await this.modifyDemandAssignPerson(params);
      this.handleSubmit();
    },

    handleCancle() {
      this.setReqDrawer({ payload: false });
    },

    // 编辑需求以及提需求
    async handleDemandSubmit(params, isCreate) {
      if (this.initDemands && this.initDemands.id) {
        // 编辑需求
        await this.modifyDemand({ ...params, id: this.initDemands.id });
      } else {
        // 提需求
        await this.createDemand({ ...params, isCreate });
      }
      await this.handleSubmit();
    },

    // 编辑需求回填数据
    handleEditor(id) {
      this.reqDrawerTitle = '编辑需求';
      this.isEdit = false;
      this.getInitDemand({ id });
      this.displayRequirementDetailDrawer(false);
    },

    // 建用例
    async handleSaveUseCase(params) {
      await this.saveUseCase({ ...params, demandId: this.demandId });
      await this.handleSubmit();
    },

    // 选择需求
    handleSelectRelate(val) {
      this.multipleSelection = val;
      this.isDisable = !(this.multipleSelection.length > 0);
    },

    // 取消关联需求
    handleCancelRelateDemand() {
      this.$confirm('确定取消关联', '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const demandIds = this.multipleSelection.map(res => {
            return res.id;
          });
          this.removeRelateDemand({ demandIds }).then(() => {
            this.handleSubmit();
          });
        })
        .catch(() => {});
    },

    // 打开需求详情弹窗
    async openRequirementDetailDrawer(requirementId) {
      this.requirementId = requirementId;
      await this.displayRequirementDetailDrawer(true);
    },

    // 打开bug详情抽屉
    openBugDetailDrawer(rowData) {
      this.rowData = rowData;
      this.displayBugDetailDrawer(true);
      this.displayRequirementDetailDrawer(false);
    },
    
    // 打开任务详情抽屉
    openTaskDetailDrawer(id) {
      this.taskId = id;
      this.displayTaskDetailDrawer(true);
      this.displayRequirementDetailDrawer(false);
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
