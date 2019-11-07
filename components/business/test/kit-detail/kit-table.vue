<template>
  <div class="pm-kit-table">
    <el-button
      size="small"
      icon="el-icon-plus"
      type="primary"
      class="btn-blue btn-add"
      @click="
        $PMRouter.push({
          name: 'test-relate-use-case',
          query: { id: $route.query.id, name: '套件详情' },
          params: { url: `/test/kit-detail?id=${$route.query.id}` }
        })
      "
    >
      关联用例</el-button
    >
    <other-search
      :is-module="false"
      :is-select="isSelected"
      @cancleRelate="handleCancleRelate"
      @batchExecute="handleBatchExecute"
    />
    <div class="more-filter">
      <pm-more-filter :settings="settings" @onSubmit="handleSearch" />
    </div>
    <line-search class="pm-right" @change="handleSubmit" />
    <pm-table
      :data="testSuitLists"
      :column="column"
      :pagination="paginator"
      :operation-width="160"
      :is-select="true"
      row-key="id"
      @pageChange="handlePageChange"
      @selectChange="handleSelectChange"
      @sort="handleSort"
    >
      <template v-slot:priority="slotProps">
        {{ filterPriority(slotProps.rowData.priority) }}
      </template>
      <template v-slot:title="{ rowData }">
        <div>
          <pm-link
            target="_blank"
            :to="`/test/use-case-detail?testCaseId=${rowData.id}`"
          >
            {{ rowData.title }}
          </pm-link>
        </div>
      </template>
      <template v-slot:bugNum="{ rowData }">
        <span v-if="!rowData.bugNum">{{ rowData.bugNum }}</span>
        <a
          v-else
          href="javascript:;"
          @click="
            getBugsList({
              sourceId: rowData.linkId,
              sourceType: 'TEST_SUITE_CASE_LINK'
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
      <template v-slot:operation="{ rowData }">
        <el-button
          type="text"
          size="medium"
          @click="
            executeUseCase({
              testCaseId: rowData.id,
              linkId: rowData.linkId,
              testCaseSourceId: testSuiteId
            })
          "
          >执行</el-button
        >
        <el-button
          type="text"
          size="medium"
          @click="
            getExecuteResultAndShowDialog({
              testCaseId: rowData.id,
              linkId: rowData.linkId,
              testCaseSourceId: testSuiteId
            })
          "
          >结果</el-button
        >
        <el-button type="text" size="medium" @click="handleBug(rowData)"
          >提BUG</el-button
        >
      </template>
    </pm-table>
    <!-- 执行 -->
    <execute-dialog
      :visible="showExecuteDialog"
      :initial-use-case-msg="storeExecuteUseCaseMsg"
      :store-execute-result-msg="storeExecuteResultMsg"
      :expand-row-keys="expandRowKeys"
      :switch-keys="multipleSelection"
      @switch="handleBatchData"
      @onSave="handleSaveExecute"
      @onHide="displayExecuteDialog({ payload: false })"
      @getResultDetail="getExecuteDetailResult"
      @transferBug="handletransferBug"
    />
    <!-- 结果 -->
    <execute-result-dialog
      :visible="showExecuteResultDialog"
      :store-execute-result-msg="storeExecuteResultMsg"
      :expand-row-keys="expandRowKeys"
      @onHide="displayResultDialog({ payload: false })"
      @getResultDetail="getExecuteDetailResult"
      @transferBug="handletransferBug"
    />
    <!-- 提bug -->
    <edit-bug
      :title="bugDrawerTitle"
      :visible="showBugDrawer"
      :create-func="handleCreateBug"
      :bug-form="initBugDatas"
      :is-copy="true"
      @onCancel="showBugDrawer = false"
      @onSubmit="showBugDrawer = false"
    />
    <!-- bug列表 -->
    <bug-list-dialog />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import PmTable from '@/components/common/pm-table.vue';
import PmMoreFilter from '@/components/common/pm-more-filter.vue';
import LineSearch from '@/components/business/test/kit-detail/line-search.vue';
import OtherSearch from '@/components/business/project/test-sheet-detail/other-search.vue';
import ExecuteDialog from '@/components/business/common/execute-dialog.vue';
import ExecuteResultDialog from '@/components/business/common/use-case/execute-result-dialog.vue';
import BugListDialog from '@/components/business/test/kit-detail/bug-list-dialog.vue';
import EditBug from '@/components/business/common/bug-list/edit-bug.vue';
import {
  SETTINGS,
  COLUMN,
  SORT_CONFIG
} from '@/constants/project/test-sheet-detail';
import { PRIORITY } from '@/constants/common/config';
import { filterEnumsLabel } from '@/utils/common';

const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  'test/kit-detail'
);

export default {
  components: {
    PmMoreFilter,
    LineSearch,
    PmTable,
    OtherSearch,
    ExecuteDialog,
    EditBug,
    ExecuteResultDialog,
    BugListDialog
  },
  data() {
    return {
      settings: SETTINGS,
      column: COLUMN,
      filterPriority: filterEnumsLabel(PRIORITY),
      bugDrawerTitle: '提BUG',
      showBugDrawer: false,
      testSuiteId: this.$route.query.id,
      formDatas: {
        testSuiteId: this.$route.query.id,
        type: null,
        executeResult: null,
        myCreated: false,
        myExecuted: false,
        priorities: [1, 2, 3, 4]
      },
      pagination: {
        currentPage: 1,
        pageSize: 10
      },
      isSelected: false,
      multipleSelection: []
    };
  },
  computed: {
    ...mapState([
      'testSuitLists',
      'paginator',
      'initBugDatas',
      'showExecuteDialog',
      'storeExecuteUseCaseMsg',
      'storeExecuteResultMsg',
      'expandRowKeys',
      'showExecuteResultDialog'
    ])
  },
  created() {
    this.handleSubmit();
  },
  methods: {
    ...mapActions([
      'getTestSuiteCasePage',
      'bugCreate',
      'removeTestSuiteCaseLink',
      'initTestCaseBug',
      'createExecuteResult',
      'executeUseCase',
      'getExecuteDetailResult',
      'getExecuteResultAndShowDialog',
      'getBugsList'
    ]),
    ...mapMutations([
      'displayUseCaseDrawer',
      'displayExecuteDialog',
      'displayResultDialog'
    ]),
    handlePageChange(val) {
      this.getTestSuiteCasePage({
        ...this.formDatas,
        ...this.pagination,
        ...val
      });
    },
    // 排序
    handleSort(sortObj) {
      const { prop, order } = sortObj;
      const orderBys = [SORT_CONFIG[`${prop}_${order}`]];
      this.handleSubmit({ orderBys });
    },

    // 取消关联
    async handleCancleRelate() {
      const testCaseIds = this.multipleSelection.map(res => {
        return res.id;
      });
      const testSuiteId = this.$route.query.id;
      await this.removeTestSuiteCaseLink({ testCaseIds, testSuiteId });
      await this.handleSubmit();
    },

    // 更多筛选
    handleSearch(item) {
      const { gmtCreate } = item;
      this.formDatas = {
        ...this.formDatas,
        ...this.pagination,
        ...item,
        minGmtCreate: gmtCreate ? gmtCreate[0] : '',
        maxGmtCreate: gmtCreate ? gmtCreate[0] : ''
      };
      delete this.formDatas.gmtCreate;
      this.getTestSuiteCasePage(this.formDatas);
    },

    // 实时查询
    handleSubmit(item) {
      this.formDatas = { ...this.formDatas, ...item, ...this.pagination };
      this.getTestSuiteCasePage(this.formDatas);
    },

    // 选中数据
    handleSelectChange(val) {
      this.isSelected = val.length > 0;
      this.multipleSelection = val;
    },

    // 提bug回填
    handleBug(row) {
      this.initTestCaseBug(row);
      this.showBugDrawer = true;
    },

    // 结果-提bug回显
    handletransferBug(testCase) {
      const { testCaseId } = testCase;
      const { linkId } = this.storeExecuteUseCaseMsg;
      this.initTestCaseBug({ id: testCaseId, linkId });
      this.showBugDrawer = true;
    },

    // 批量执行- 默认第一个
    handleBatchExecute() {
      this.executeUseCase({
        testCaseId: this.multipleSelection[0].id,
        linkId: this.multipleSelection[0].linkId,
        testCaseSourceId: this.testSuiteId
      });
    },

    // 批量执行- 上一个/下一个
    handleBatchData(id, linkId) {
      this.executeUseCase({
        testCaseId: id,
        linkId,
        testCaseSourceId: this.testSuiteId
      });
    },

    // 提bug保存
    async handleCreateBug(val) {
      await this.bugCreate(val);
      await this.handleSubmit();
    },

    // 保存用例
    async handleSaveExecute(val) {
      await this.createExecuteResult({
        ...val,
        testCaseSourceId: this.testSuiteId
      });
      await this.handleSubmit();
    }
  }
};
</script>

<style lang="less" scoped>
.pm-kit-table {
  .more-filter {
    float: right;
    margin: 5px 0 0 10px;
    font-size: 14px;
  }
}
</style>
