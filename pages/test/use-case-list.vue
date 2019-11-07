/*
 * @Description: 测试用例列表
 * @Author: danding
 * @Date: 2019-06-20 09:35:36
 * @Last Modified by: moran
 * @Last Modified time: 2019-08-02 17:01:51
 */
<template>
  <div class="page-container">
    <search-header />
    <result-table />
    <use-case-edit
      :title="editUseCaseTit"
      :visible="showUseCaseDrawer"
      :initial-val="storeEditUseCaseMsg"
      @onSubmit="saveUseCase"
      @onHide="displayUseCaseDrawer({ payload: false })"
    />
    <execute-dialog
      :visible="showExecuteDialog"
      :initial-use-case-msg="storeExecuteUseCaseMsg"
      :store-execute-result-msg="storeExecuteResultMsg"
      :expand-row-keys="expandRowKeys"
      :switch-keys="selectedRows"
      @onSave="createExecuteResult"
      @onHide="displayExecuteDialog({ payload: false })"
      @getResultDetail="getExecuteDetailResult"
      @transferBug="transferBug"
      @switch="switchUseCase"
    />
    <execute-result-dialog
      :visible="showExecuteResultDialog"
      :store-execute-result-msg="storeExecuteResultMsg"
      :expand-row-keys="expandRowKeys"
      @onHide="displayResultDialog({ payload: false })"
      @getResultDetail="getExecuteDetailResult"
      @transferBug="transferBug"
    />
    <edit-bug
      title="提BUG"
      :is-copy="true"
      :visible="showBugDrawer"
      :bug-form="storeBugDatas"
      :create-func="createBug"
      @onCancel="displayBugDrawer({ payload: false })"
    />
    <bug-list-dialog />
    <use-case-detail-drawer
      :detail-id="detailId"
      :visible="showUseCaseDetailDrawer"
      @transferBug="transferBug"
      @onEdit="getUseCaseMsg"
      @handleCopyUseCaseMsg="handleCopyUseCaseMsg"
      @hideDrawer="displayUseCaseDetailDrawer({payload: false})"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import SearchHeader from '@/components/business/test/use-case-list/search-header.vue';
import ResultTable from '@/components/business/test/use-case-list/result-table.vue';
import BugListDialog from '@/components/business/test/use-case-list/bug-list-dialog.vue';
import { COLUMNS } from '@/constants/test/use-case-list';
import UseCaseEdit from '@/components/business/common/use-case/use-case-edit.vue';
import ExecuteDialog from '@/components/business/common/execute-dialog.vue';
import ExecuteResultDialog from '@/components/business/common/use-case/execute-result-dialog.vue';
import EditBug from '@/components/business/common/bug-list/edit-bug.vue';
import UseCaseDetailDrawer from '@/components/business/common/use-case/use-case-detail-drawer.vue';

const {
  mapActions,
  mapState,
  mapMutations,
  mapGetters
} = createNamespacedHelpers('test/use-case-list');

export default {
  head() {
    return {
      title: '用例列表'
    };
  },
  isKeepAlive: true,
  components: {
    SearchHeader,
    ResultTable,
    UseCaseEdit,
    ExecuteDialog,
    ExecuteResultDialog,
    EditBug,
    BugListDialog,
    UseCaseDetailDrawer
  },
  data() {
    return {
      columns: COLUMNS, // 列配置
      operation: [], // 操作
      bugDrawerTitle: '提BUG',
    };
  },
  computed: {
    ...mapState([
      'showUseCaseDrawer',
      'storeEditUseCaseMsg',
      'showExecuteDialog',
      'storeExecuteUseCaseMsg',
      'storeExecuteResultMsg',
      'storeExecuteResultMsg',
      'expandRowKeys',
      'showExecuteResultDialog',
      'showBugDrawer',
      'storeBugDatas',
      'selectedRows',
      'savedSearchVals',
      'detailId',
      'showUseCaseDetailDrawer'
    ]),
    ...mapGetters(['selectedRowKeys']),
    editUseCaseTit() {
      return this.storeEditUseCaseMsg && this.storeEditUseCaseMsg.id
        ? '编辑用例'
        : '建用例';
    }
  },
  activated() {
    const { dependenceId } = this.$route.query;
    this.handleSubmit({ productId: dependenceId, ...this.savedSearchVals }); // 查询列表
  },
  methods: {
    ...mapActions([
      'handleSubmit',
      'saveUseCase',
      'createExecuteResult',
      'getExecuteDetailResult',
      'createBug',
      'transferBug',
      'executeUseCase',
      'getUseCaseMsg',
      'handleCopyUseCaseMsg'
    ]),
    ...mapMutations([
      'displayUseCaseDrawer',
      'displayExecuteDialog',
      'displayResultDialog',
      'displayBugDrawer',
      'displayUseCaseDetailDrawer'
    ]),
    switchUseCase(id) {
      this.executeUseCase({ testCaseId: id });
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
