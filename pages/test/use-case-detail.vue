/*
 * @Description: 用例详情
 * @Author: danding
 * @Date: 2019-06-20 19:00:13
 * @Last Modified by: moran
 * @Last Modified time: 2019-08-23 16:14:11
 */

<template>
  <div>
    <pm-bread-crumb :paths="paths" />
    <div class="detail-transparent-container">
      <el-row :gutter="16">
        <el-col :span="16">
          <main-content
            :files="detailMsg.attachmentList"
            :data-provider="detailMsg.testCase"
          />
        </el-col>
        <el-col :span="8">
          <normal-info :config="NORMAL_INFO_CONFIG" :data="detailMsg" />
          <relation
            :bug="detailMsg.bugs"
            :requirement="detailMsg.requirement"
          />
          <history :history="operateHistory" />
        </el-col>
      </el-row>
    </div>
    <pm-button-group
      :buttons="buttons"
      @goBack="goBack"
      @resolve="resolve"
      @deleteUseCase="deleteUseCase"
    />
    <execute-dialog
      :visible="showExecuteDialog"
      :initial-use-case-msg="storeExecuteUseCaseMsg"
      :store-execute-result-msg="storeExecuteResultMsg"
      :expand-row-keys="expandRowKeys"
      @onSave="createExecuteResult"
      @onHide="displayExecuteDialog({ payload: false })"
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
  </div>
</template>

<script>
import {
  createNamespacedHelpers,
  mapState as rootMapState,
  mapActions as rootMapActions,
  mapMutations as rootMapMutations
} from 'vuex';
import { PATHS, NORMAL_INFO_CONFIG } from '@/constants/test/use-case-detail';
import PmBreadCrumb from '@/components/common/pm-bread-crumb.vue';
import MainContent from '@/components/business/test/use-case-detail/main-content.vue';
import NormalInfo from '@/components/business/test/use-case-detail/normal-info.vue';
import Relation from '@/components/business/test/use-case-detail/relation.vue';
import History from '@/components/business/test/use-case-detail/history.vue';
import PmButtonGroup from '@/components/common/pm-button-group';
import ExecuteDialog from '@/components/business/common/execute-dialog.vue';
import EditBug from '@/components/business/common/bug-list/edit-bug.vue';

const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  'test/use-case-detail'
);

export default {
  head() {
    return {
      title: '用例详情'
    };
  },
  components: {
    PmBreadCrumb,
    MainContent,
    NormalInfo,
    Relation,
    History,
    PmButtonGroup,
    ExecuteDialog,
    EditBug
  },
  data() {
    return {
      paths: PATHS,
      NORMAL_INFO_CONFIG,
      buttons: [
        { label: '返回', textColor: 'primary', func: 'goBack' },
        { label: '执行', textColor: 'primary', func: 'resolve' },
        { label: '删除', textColor: 'primary', func: 'deleteUseCase' }
      ],
    };
  },
  computed: {
    ...mapState(['operateHistory', 'detailMsg']),
    ...rootMapState('test/use-case-list', [
      'showExecuteDialog',
      'storeExecuteUseCaseMsg',
      'storeExecuteResultMsg',
      'expandRowKeys',
      'showBugDrawer',
      'storeBugDatas'
    ])
  },
  created() {
    const { testCaseId } = this.$route.query;
    this.testCaseId = testCaseId;
    this.getDetailInfo({ testCaseId });
    this.getOperateHistory();
  },
  methods: {
    ...mapActions(['getDetailInfo', 'getOperateHistory', 'handleDelete']),
    ...mapMutations([]),
    ...rootMapActions('test/use-case-list', [
      'getExecuteDetailResult',
      'transferBug',
      'executeUseCase',
      'createExecuteResult',
      'createBug'
    ]),
    ...rootMapMutations('test/use-case-list', [
      'displayExecuteDialog',
      'displayBugDrawer'
    ]),
    handleEvent(funcName) {
      this[funcName]();
    },
    goBack() {
      this.$router.back();
    },
    deleteUseCase() {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.handleDelete({ testCaseId: this.testCaseId });
        })
        .catch(() => {});
    },
    resolve() {
      this.executeUseCase({ testCaseId: this.testCaseId });
    }
  }
};
</script>

<style lang="less" scoped></style>
