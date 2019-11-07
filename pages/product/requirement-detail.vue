/*
 * @Description: 需求详情
 * @Author: danding
 * @Date: 2019-06-20 19:00:13
 * @Last Modified by: moran
 * @Last Modified time: 2019-08-23 16:08:40
 */

<template>
  <div>
    <pm-bread-crumb :paths="paths" />
    <div class="detail-transparent-container pm-modules-container">
      <div v-loading="loading" class="pm-left-modules">
        <main-content :main-form="demandDescripts" />
      </div>
      <div class="pm-right-modules">
        <normal-info
          v-loading="loading"
          :data="baseInfos"
          :config="BASEINFOLIST"
        />
        <relation v-loading="relateLoading" />
        <history v-loading="operateLoading" :history="operationLogsGetter" />
      </div>
    </div>
    <pm-button-group
      :buttons="buttons"
      @edit="edit"
      @goBack="$PMRouter.push('/product/requirement-list')"
      @addUseCase="addUseCase"
    />
    <edit-requirement
      :title="reqDrawerTitle"
      :visible="showReqDrawer"
      :forms="initDemands"
      :product-id="initDemands.productId"
      @onCancel="handleCancle"
      @onSubmit="handleDemandSubmit"
    />
    <use-case-edit
      :title="useCaseTitle"
      :visible="showUseCaseDrawer"
      :form-data="initTestCaseDatas"
      @onSubmit="handleSaveUseCase"
      @onHide="displayUseCaseDrawer({ payload: false })"
    />
  </div>
</template>

<script>
import {
  createNamespacedHelpers,
  mapActions as rootMapActions,
  mapGetters as rootMapGetters,
  mapState as rootMapState,
  mapMutations as rootMapMutations
} from 'vuex';
import PmBreadCrumb from '@/components/common/pm-bread-crumb.vue';
import { PATHS, BASEINFOLIST } from '@/constants/product/requirement-detail';
import MainContent from '@/components/business/common/requirement-detail/main-content.vue';
import NormalInfo from '@/components/business/common/requirement-detail/normal-info.vue';
import Relation from '@/components/business/common/requirement-detail/relation.vue';
import History from '@/components/business/common/requirement-detail/history.vue';
import EditRequirement from '@/components/business/common/requirement-list/edit-requirement.vue';
import UseCaseEdit from '@/components/business/common/use-case/use-case-edit.vue';
import PmButtonGroup from '@/components/common/pm-button-group';

const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  'product/requirement-detail'
);

export default {
  head() {
    return {
      title: '需求详情'
    };
  },
  components: {
    PmBreadCrumb,
    MainContent,
    NormalInfo,
    Relation,
    History,
    PmButtonGroup,
    EditRequirement,
    UseCaseEdit
  },
  data() {
    return {
      paths: PATHS,
      BASEINFOLIST,
      id: this.$route.query.id,
      reqDrawerTitle: '编辑需求',
      useCaseTitle: '建用例',
      buttons: [
        { label: '返回', textColor: 'primary', func: 'goBack' },
        { label: '编辑', textColor: 'primary', func: 'edit' },
        { label: '建用例', textColor: 'primary', func: 'addUseCase' }
      ]
    };
  },
  computed: {
    ...mapState(['demandDescripts', 'baseInfos', 'loading', 'relateLoading']),
    ...rootMapGetters('common-config', ['operationLogsGetter']),
    ...rootMapState('product/requirement-list', [
      'initDemands',
      'showReqDrawer',
      'showUseCaseDrawer',
      'initTestCaseDatas'
    ]),
    ...rootMapState('common-config', ['operateLoading'])
  },
  created() {
    this.getDemandDetail({ id: this.id });
    this.getOperationLog({
      operateObjectType: 'DEMAND',
      operateObjectId: this.id
    });
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
    handleEvent(funcName) {
      this[funcName]();
    },

    // 编辑回填信息
    edit() {
      this.getInitDemand({ id: this.id });
    },

    // 编辑抽屉取消
    handleCancle() {
      this.setReqDrawer({ payload: false });
    },

    // 编辑需求
    async handleDemandSubmit(params) {
      await this.modifyDemand({ ...params, id: this.initDemands.id });
      await this.getDemandDetail({ id: this.id });
    },

    // 建用例
    async handleSaveUseCase(params) {
      await this.saveUseCase({ ...params, demandId: this.id });
      await this.getDemandDetail({ id: this.id });
    },

    // 建用例 回填
    addUseCase() {
      this.getInitDemandTestCase({ demandId: this.id });
      this.setUseCaseDrawer({ payload: true });
    }
  }
};
</script>
