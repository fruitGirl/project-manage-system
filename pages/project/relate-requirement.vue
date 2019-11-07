/*
 * @Description: 关联需求
 * @Author: danding
 * @Date: 2019-06-20 09:35:36
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-04 11:21:46
 */

<template>
  <div v-loading="loading">
    <pm-bread-crumb :paths="paths" />
    <div class="detail-transparent-container">
      <div class="pm-flex">
        <div class="pm-flex-1 pm-bg-white pm-module-container">
          <search-header @submit="handleSubmit" />
          <result-table
            :list="demandLists"
            :columns="columns"
            :pagination="paginator"
            @change="handleSubmit"
            @select="handleSelectRelate"
            @openDrawer="openRequirementDetailDrawer"
          />
        </div>
      </div>
    </div>
    <pm-button-group
      :show-divide="false"
      :buttons="buttons"
      @confirm="handleRelate"
      @goBack="$PMRouter.push('/project/requirement-list')"
    />
    <!-- 需求详情 -->
    <requirement-detail-drawer
      :visible="showRequirementDetailDrawer"
      :requirement-id="requirementId"
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
import { createNamespacedHelpers, mapState as rootMapState } from 'vuex';
import SearchHeader from '@/components/business/common/relate-requirement/search-header.vue';
import ResultTable from '@/components/business/common/relate-requirement/result-table.vue';
import PmBreadCrumb from '@/components/common/pm-bread-crumb.vue';
import PmButtonGroup from '@/components/common/pm-button-group';
import { COLUMNS, PATHS } from '@/constants/common/relate-requirement';
import RequirementDetailDrawer from '@/components/business/common/requirement-detail-drawer.vue';
import BugDetailDrawer from '@/components/business/common/bug-detail-drawer.vue';
import TaskDetailDrawer from '@/components/business/common/task-detail-drawer.vue';

const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  'project/relate-requirement'
);

export default {
  head() {
    return {
      title: '关联需求'
    };
  },
  isKeepAlive: true,
  components: {
    SearchHeader,
    ResultTable,
    PmBreadCrumb,
    PmButtonGroup,
    RequirementDetailDrawer,
    BugDetailDrawer,
    TaskDetailDrawer
  },
  data() {
    return {
      columns: COLUMNS, // 列配置
      paths: PATHS,
      buttons: [
        { label: '取消', textColor: 'primary', func: 'goBack' },
        { label: '确定', type: 'primary', func: 'confirm' }
      ],
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
      multipleSelection: [],
      requirementId: '',
      rowData: {},
      taskId: ''
    };
  },
  computed: {
    ...mapState([
      'paginator',
      'demandLists',
      'loading',
      'showRequirementDetailDrawer',
      'showBugDetailDrawer',
      'showTaskDetailDrawer'
    ]),
    ...rootMapState('common-config', ['modules'])
  },
  activated() {
    this.handleSubmit();
  },
  methods: {
    ...mapActions(['getDemandPage', 'projectDemandLinkBatch']),
    ...mapMutations([
      'displayRequirementDetailDrawer',
      'displayBugDetailDrawer',
      'displayTaskDetailDrawer'
    ]),
    // 页面查询
    handleSubmit(val) {
      this.formData = { ...this.pagination, ...this.formData, ...val };
      this.getDemandPage(this.formData);
    },

    // 选中数据
    handleSelectRelate(val) {
      this.multipleSelection = val;
    },

    // 关联需求
    handleRelate() {
      const demandIds = this.multipleSelection.map(res => {
        return res.id;
      });
      const projectId = this.$route.query.dependenceId;
      this.projectDemandLinkBatch({ demandIds, projectId });
    },
    
    // 打开详情弹窗
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
</style>
