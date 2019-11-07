/*
  * @Description: bug详情
  * @Author: yaochen
  * @Date: 2019-06-20 19:00:13
  * @Last Modified by: moran
  * @Last Modified time: 2019-08-23 16:08:39
  */

<template>
  <div>
    <pm-bread-crumb :paths="breadcrumbConfig" />
    <div class="detail-transparent-container pm-modules-container">
      <div class="pm-left-modules">
        <main-content />
        <history :history="operationLogsGetter" />
      </div>
      <div class="pm-right-modules">
        <normal-info />
        <relation />
      </div>
    </div>
    <pm-button-group
      :buttons="buttons"
      @goBack="goBack"
      @activeHandle="activeHandle"
      @disposeHandle="disposeHandle"
      @closeHandle="closeHandle"
      @editHandle="editHandle"
      @copyHandle="copyHandle"
      @deleteHandle="deleteHandle"
      @addUseCase="addUseCase"
      @addRequirement="addRequirement"
    />
    <edit-bug
      :is-copy="isCopy"
      :title="bugDrawerTitle"
      :visible="showBugDrawer"
      :create-func="bugCreate"
      :edit-func="bugModify"
      :bug-form="bugFormData"
      @onSubmit="drawSubmitHandler"
      @onCancel="showBugDrawer = false"
    />
    <dispose-bug-dialog
      :bug-id="bugId"
      :submit-handler="disposeSubmitHandler"
      :show.sync="disposeDialogVisible"
    />
    <edit-requirement
      title="提需求"
      :visible="showReqDrawer"
      :forms="{ attachmentList: [] }"
      @onCancel="showReqDrawer = false"
      @onSubmit="handleDemandSubmit"
    />
    <use-case-edit
      title="建用例"
      :visible="showUseCaseDrawer"
      @onSubmit="handleSaveUseCase"
      @onHide="showUseCaseDrawer = false"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { PATHS } from '@/constants/project/bug-detail';
import PmBreadCrumb from '@/components/common/pm-bread-crumb';
import MainContent from '@/components/business/common/bug-detail/main-content.vue';
import NormalInfo from '@/components/business/common/bug-detail/normal-info';
import Relation from '@/components/business/common/bug-detail/relation.vue';
import History from '@/components/business/common/bug-detail/history';
import PmButtonGroup from '@/components/common/pm-button-group';
import EditBug from '@/components/business/common/bug-list/edit-bug.vue';
import EditRequirement from '@/components/business/common/requirement-list/edit-requirement.vue';
import UseCaseEdit from '@/components/business/common/use-case/use-case-edit.vue';
import DisposeBugDialog from '@/components/business/common/bug-list/dispose-bug-dialog.vue';

const { mapActions, mapState } = createNamespacedHelpers('project/bug-detail');
const { mapActions: mapBugListActions } = createNamespacedHelpers(
  'project/bug-list'
);
const { mapActions: mapRequirementActions } = createNamespacedHelpers(
  'project/requirement-list'
);
const {
  mapActions: mapCommonActions,
  mapGetters: mapCommonGetters
} = createNamespacedHelpers('common-config');

export default {
  head() {
    return {
      title: 'BUG详情'
    };
  },
  components: {
    PmBreadCrumb,
    MainContent,
    NormalInfo,
    Relation,
    History,
    PmButtonGroup,
    EditBug,
    DisposeBugDialog,
    EditRequirement,
    UseCaseEdit
  },
  props: {
    breadcrumbConfig: {
      type: Array,
      default: () => PATHS
    }
  },
  data() {
    return {
      bugId: '',
      bugDrawerTitle: '编辑BUG', // bug抽屉title
      showBugDrawer: false, // 显示bug抽屉
      showReqDrawer: false, // 显示需求抽屉
      showUseCaseDrawer: false, // 显示用例抽屉
      bugFormData: {}, // bug抽屉表单数据
      isCopy: false, // 是否复制
      disposeDialogVisible: false, // 显示处理bug弹窗
      buttons: [
        // 底部按钮配置
        {
          label: '返回',
          textColor: 'primary',
          func: 'goBack',
          key: 'back'
        },
        {
          label: '编辑',
          textColor: 'primary',
          func: 'editHandle',
          key: 'edit'
        },
        {
          label: '处理',
          textColor: 'primary',
          func: 'disposeHandle',
          key: 'solve'
        },
        {
          label: '关闭',
          textColor: 'primary',
          func: 'closeHandle',
          key: 'close'
        },
        {
          label: '激活',
          textColor: 'primary',
          func: 'activeHandle',
          key: 'activate'
        },
        {
          label: '建用例',
          textColor: 'primary',
          func: 'addUseCase',
          key: 'useCase'
        },
        {
          label: '提需求',
          textColor: 'primary',
          func: 'addRequirement',
          key: 'requirement'
        }
      ]
    };
  },
  computed: {
    ...mapState(['bugInfo']),
    ...mapCommonGetters(['operationLogsGetter']),
    bugStatus() {
      return this.bugInfo.status;
    }
  },
  watch: {
    bugStatus(val) {
      this.buttons = this.checkOperateBtn(val.name);
    }
  },
  created() {
    this.bugId = this.$route.query.bugId;
    this.bugDetailQuery({
      bugId: this.bugId
    });
    this.getOperationLog({
      operateObjectType: 'BUG',
      operateObjectId: this.bugId
    });
  },
  methods: {
    ...mapActions(['bugDetailQuery']),
    ...mapCommonActions(['getOperationLog']),
    ...mapRequirementActions(['createDemand', 'saveUseCase']),
    ...mapBugListActions([
      'activateBug',
      'closeBug',
      'solveBug',
      'bugCreate',
      'bugDelete',
      'bugModifyInitPage',
      'bugModify'
    ]),
    refreshPageData() {
      this.bugDetailQuery({
        bugId: this.bugId
      });
    },
    checkOperateBtn(status) {
      return this.buttons.map((item, index) => {
        const { key } = item;
        if (key === 'activate' && status === 'ACTIVATED') {
          return {
            ...item,
            isShow: false
          };
        }
        if (key === 'close' && status === 'CLOSED') {
          return {
            ...item,
            isShow: false
          };
        }
        return item;
      });
    },
    goBack() {
      this.$PMRouter.back();
    },
    activeHandle() {
      this.confirmHandler('确认激活BUG?', done =>
        this.showMessage(
          this.activateBug({
            id: this.bugId
          }).then(() => {
            this.refreshPageData();
            done();
          }),
          '激活'
        )
      );
    },
    disposeHandle() {
      this.disposeDialogVisible = true;
    },
    closeHandle() {
      this.confirmHandler('确认关闭BUG?关闭后，可进行激活', done =>
        this.showMessage(
          this.closeBug({
            id: this.bugId
          }).then(() => {
            this.refreshPageData();
            done();
          }),
          '关闭'
        )
      );
    },
    editHandle() {
      this.isCopy = false;
      this.bugModifyInitPage({
        bugId: this.bugId
      })
        .then(re => {
          this.bugFormData = re.bug;
          this.showBugDrawer = true;
        })
        .catch(err => {
          this.$showErrorMessage(err);
        });
    },
    disposeSubmitHandler(form) {
      return this.solveBug(form).then(() => {
        this.refreshPageData();
      });
    },
    copyHandle(row) {
      this.isCopy = true;
      this.bugModifyInitPage({
        bugId: this.bugId
      })
        .then(re => {
          this.showBugDrawer = true;
        })
        .catch(err => {
          this.$showErrorMessage(err);
        });
    },
    addUseCase() {
      this.showUseCaseDrawer = true;
    },
    addRequirement() {
      this.showReqDrawer = true;
    },
    deleteHandle(row) {
      this.confirmHandler('确认删除BUG?', done =>
        this.showMessage(
          this.bugDelete({
            id: this.bugId
          }).then(() => {
            done();
          }),
          '删除'
        )
      );
    },
    confirmHandler(message, callback) {
      this.$confirm(message, '操作提示', {
        type: 'warning',
        callback: () => {},
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            callback(done);
            return;
          }
          done();
        }
      });
    },
    showMessage(req, operate) {
      req
        .then(() => {
          this.$showSuccessMessage(`${operate}成功`);
        })
        .catch(err => {
          this.$showErrorMessage(err);
        });
    },
    drawSubmitHandler() {
      this.showBugDrawer = false;
    },
    handleDemandSubmit(params) {
      this.createDemand(params);
    },
    handleSaveUseCase(params) {
      this.saveUseCase({ ...params });
    }
  }
};
</script>
