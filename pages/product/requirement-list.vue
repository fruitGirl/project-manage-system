/*
 * @Description: 需求列表
 * @Author: danding
 * @Date: 2019-06-20 09:35:36
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-05 12:24:57
 */

<template>
  <div v-loading="loading" class="page-transparent-container">
    <div class="pm-flex">
      <div v-if="isExpand" class="expand-module">
        <div class="expand-left">
        </div>
        <div class="expand-right" @click="isExpand = false">
           <div class="triangle-bottom-left"></div>
           <div class="expand-box">
            <div>展</div>
            <div>开</div>
          </div>
          <div class="triangle-top-left"></div>
        </div>
      </div>
      <div v-else class="left-module">
        <module-tree
          :is-show="isShow"
          :config="productAndModuleTree"
          :name="dependenceProductName"
          :expand-data="ProductAndModuleTreeEnums"
          @handleSelect="changeModule"
          @goModuleManage="$PMRouter.push('/product/module-setting')"
          @pickUp="isExpand = true"
        />
      </div>
      <div class="pm-flex-1 pm-bg-white pm-module-container right-module">
        <search-header @submit="submitHeaderSearch" @add="handleAddDemand" />
        <result-table
          :list="demandLists"
          :columns="columns"
          :pagination="paginator"
          :default-sort="sorts"
          :is-popover="isPopover"
          @statusChange="handleStatusChange"
          @assignChange="handleAssignChange"
          @editor="handleEditor"
          @change="handleSubmit"
          @addCase="handleAddCase"
          @openDrawer="openRequirementDetailDrawer"
        />
      </div>
    </div>
    <!-- 提需求/编辑需求 -->
    <edit-requirement
      :title="reqDrawerTitle"
      :visible="showReqDrawer"
      :forms="initDemands"
      :product-id="productId"
      :init-fill-data="{ moduleId: formData.moduleId }"
      :is-edit='isEdit'
      @onCancel="handleCancle"
      @onSubmit="handleDemandSubmit"
    />
    <!-- 用例 -->
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
      @editor="handleEditor"
      @addCase="handleAddCase"
      @bugDetail="openBugDetailDrawer"
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
import {
  createNamespacedHelpers,
  mapActions as rootMapActions,
  mapState as rootMapState,
  mapGetters as rootMapGetter
} from 'vuex';
import ModuleTree from '@/components/business/common/module-tree.vue';
import SearchHeader from '@/components/business/common/requirement-list/search-header.vue';
import ResultTable from '@/components/business/common/requirement-list/result-table.vue';
import { COLUMNS } from '@/constants/common/requirement-list';
import EditRequirement from '@/components/business/common/requirement-list/edit-requirement.vue';
import UseCaseEdit from '@/components/business/common/use-case/use-case-edit.vue';
import RequirementDetailDrawer from '@/components/business/common/requirement-detail-drawer.vue';
import BugDetailDrawer from '@/components/business/common/bug-detail-drawer.vue';
import TaskDetailDrawer from '@/components/business/common/task-detail-drawer.vue';


const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  'product/requirement-list'
);

export default {
  head() {
    return {
      title: '需求'
    };
  },
  isKeepAlive: true,
  components: {
    ModuleTree,
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
      productId: this.$route.query.dependenceId,
      demandId: '',
      formData: {
        // 默认查询数据
        needSubModule: true,
        productId: this.$route.query.dependenceId,
        priorityList: [1, 2, 3, 4],
        status: 'WAITING',
        myCreate: false,
        myCharge: false
      },
      pagination: {
        currentPage: 1,
        pageSize: 10
      },
      sorts: {},
      isShow: true,
      requirementId: '',
      isEdit: false,
      rowData: {},
      taskId: '',
      isExpand: false
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
    ...rootMapState('common-config', ['productAndModuleTree']),
    ...rootMapGetter('common-config', ['ProductAndModuleTreeEnums']),
    ...rootMapGetter('layout', ['dependenceProductName'])
  },
  watch: {},
  activated() {
    this.getProductAndModuleTree({ productId: this.productId }).then(() => {
      const isSubModuleInfo = this.productAndModuleTree[0].subModuleInfo;
      const len = isSubModuleInfo ? isSubModuleInfo.length : 0;
      this.isShow = len > 0;
    }); // 产品模块树获取
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
    ...rootMapActions('common-config', ['getProductAndModuleTree']),

    // 页面查询
    handleSubmit(val) {
      this.formData = { ...this.pagination, ...this.formData, ...val };
      this.getDemandPage(this.formData);
    },

    changeModule(val) {
      this.handleSubmit({ ...val, currentPage: 1 });
    },

    submitHeaderSearch(val) {
      this.handleSubmit({ ...val, currentPage: 1 });
    },

    // 提需求
    handleAddDemand() {
      this.reqDrawerTitle = '提需求';
      this.isEdit = true;
      this.setReqDrawer({ payload: true });
    },

    // 建用例回填
    handleAddCase(id) {
      this.demandId = id;
      this.getInitDemandTestCase({ demandId: id });
      this.setUseCaseDrawer({ payload: true });
    },

    // 状态更改
    async handleStatusChange(params) {
      await this.modifyDemandStatus(params);
      this.handleSubmit(this.formData);
    },

    // 指派人
    async handleAssignChange(params) {
      await this.modifyDemandAssignPerson(params);
      this.handleSubmit(this.formData);
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
    async handleEditor(id) {
      await this.getInitDemand({ id });
      this.reqDrawerTitle = '编辑需求';
      this.isEdit = false;
      this.displayRequirementDetailDrawer(false);
    },

    // 建用例
    async handleSaveUseCase(params) {
      await this.saveUseCase({ ...params, demandId: this.demandId });
      await this.handleSubmit();
    },

    // 打开需求详情弹窗
    openRequirementDetailDrawer(requirementId) {
      this.requirementId = requirementId;
      this.displayRequirementDetailDrawer(true);
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
.expand-module {
  width: 40px;
  margin-right: 15px;
  height: 437px;
  .expand-left {
    float: left;
    width: 11px;
    height: 100%;
    background-color: #fff;
  }
  .expand-right {
    float: left;
    margin-top: 165px;
    cursor: pointer;
  }
  .triangle-bottom-left {
    width: 0;
    height: 0;
    border-bottom: 8px solid #fff;
    border-right: 27px solid transparent;
  }
  .triangle-top-left {
    width: 0;
    height: 0;
    border-top: 8px solid #fff;
    border-right: 27px solid transparent;
  }
  .expand-box {
    padding: 20px 0;
    width: 27px;
    text-align: center;
    font-size: 12px;
    color: #409EFF;
    background-color: #fff;
  }
}
.right-module {
  min-width: 820px
}
</style>
