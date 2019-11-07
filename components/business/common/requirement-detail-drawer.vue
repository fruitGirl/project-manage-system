/*
 * @Description: 需求详情
 * @Author: danding
 * @Date: 2019-06-20 19:00:13
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-04 11:04:41
 */

<template>
  <pm-drawer
    title="需求详情"
    :visible="visible"
    :footer="false"
    @onCancel="$emit('cancel')">
    <template v-slot:headerRight>
      <el-button type="primary" @click="$emit('editor', requirementId)">编辑</el-button>
    </template>
    <div>
      <normal-info
        v-loading="loading"
        :data="baseInfos"
        :config="BASEINFOLIST"
      />
      <main-content :main-form="demandDescripts" />
      <pm-info-title title="关联" :has-bottom-margin="false"/>
      <relation
        v-loading="relateLoading"
        :demand-id="requirementId"
        :project-lists='projectLists'
        @useDetail="$emit('useDetail', $event)"
        @bugDetail="$emit('bugDetail', $event)"
        @taskDetail="$emit('taskDetail', $event)"
        />
        <history v-loading="operateLoading" :history="operationLogsGetter" />
    </div>
  </pm-drawer>
</template>

<script>
import {
  createNamespacedHelpers,
  mapActions as rootMapActions,
  mapGetters as rootMapGetters,
  mapState as rootMapState,
  mapMutations as rootMapMutations
} from 'vuex';
import PmDrawer from '@/components/common/pm-drawer.vue';
import { BASEINFOLIST } from '@/constants/product/requirement-detail';
import MainContent from '@/components/business/common/requirement-detail/main-content.vue';
import NormalInfo from '@/components/business/common/requirement-detail/normal-info.vue';
import Relation from '@/components/business/common/requirement-detail/relation.vue';
import History from '@/components/business/common/requirement-detail/history.vue';
import PmInfoTitle from '@/components/common/pm-info-title';

const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  'product/requirement-detail'
);

export default {
  components: {
    MainContent,
    NormalInfo,
    Relation,
    History,
    PmInfoTitle,
    PmDrawer
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    requirementId: {
      type: [Number, String],
      default: ''
    }
  },
  data() {
    return {
      BASEINFOLIST,
      reqDrawerTitle: '编辑需求',
    };
  },
  computed: {
    ...mapState(['demandDescripts', 'baseInfos', 'loading', 'relateLoading', 'projectLists']),
    ...rootMapGetters('common-config', ['operationLogsGetter']),
    ...rootMapState('product/requirement-list', [
      'initDemands',
      'showReqDrawer',
      'showUseCaseDrawer',
      'initTestCaseDatas'
    ]),
    ...rootMapState('common-config', ['operateLoading'])
  },
  watch: {
    visible(val) {
      if (val && this.requirementId) this.getDetailMsg(this.requirementId);
    }
  },
  methods: {
    ...mapActions(['getDemandDetail']),
    ...mapMutations([]),
    ...rootMapActions('common-config', ['getOperationLog']),
    ...rootMapActions('product/requirement-list', [
      'getInitDemand',
      'modifyDemand',
      'saveUseCase',
      'getInitDemandTestCase'
    ]),
    ...rootMapMutations('product/requirement-list', [
      'setReqDrawer',
      'setUseCaseDrawer',
      'displayUseCaseDrawer'
    ]),
    getDetailMsg(id) {
      this.getDemandDetail({ id });
      this.getOperationLog({
        operateObjectType: 'DEMAND',
        operateObjectId: id
      });
    },
    handleEvent(funcName) {
      this[funcName]();
    },

    // 编辑回填信息
    edit() {
      this.$emit('editor', this.requirementId);
    },

    // 编辑抽屉取消
    handleCancle() {
      this.setReqDrawer({ payload: false });
    },

    // 编辑需求
    async handleDemandSubmit(params) {
      await this.modifyDemand({ ...params, id: this.initDemands.id });
      await this.getDemandDetail({ id: this.requirementId });
    }
  }
};
</script>
