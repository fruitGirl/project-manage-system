/*
 * @Description: 项目-测试单详情页
 * @Author: moran
 * @Date: 2019-06-21 14:49:30
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-06 10:02:50
 */
<template>
  <div v-loading="testLoading || caseLoading" class="test-sheet-detail">
    <pm-bread-crumb :paths="paths" />
    <div class="detail-transparent-container operate-reserve-wrapper">
      <div class="pm-module-container">
        <div class="pm-flex info-center">
          <div class="pm-flex-1">
            <span class="info-title">{{ testFormDetail.name }}</span>
            <span :class="`arrow-style ${isExpand ? 'el-icon-arrow-down' : 'el-icon-arrow-up'}`" @click="isExpand = !isExpand"></span>
            <span>({{ dateFormat(testFormDetail.gmtEstimateStart, 'yyyy-mm-dd') }} ~
            {{ dateFormat(testFormDetail.gmtEstimateEnd, 'yyyy-mm-dd') }})</span>
          </div>
          <div style="float: right">
            <test-progress
              title="测试进度"
              :percentage="testInfo.percentage"
              :right-num="testInfo.allTestCase"
              :left-num="testInfo.executedTestCaseIds"/>
            <test-progress
              title="通过率"
              color="#FFB380"
              :percentage="testInfo.passRate"
              :right-num="testInfo.allTestCase"
              :left-num="testInfo.successCase"/>
            </div>
        </div>
        <test-sheet-info
          v-if="isExpand"
          :data="testFormDetail"
          :config="baseLists"
        />
      </div>
      <el-row :gutter="16">
        <el-col :span="24">
          <div class="detail-bac">
            <kit-table :status-code="statusCode"/>
          </div>
        </el-col>
      </el-row>
    </div>
    <pm-button-group
      :show-divide="true"
      :buttons="buttons"
      @back="$PMRouter.push('/test/test-sheet-list')"
      @startTest="handleStartTest"
      @editor="
        $PMRouter.push({
          path: '/test/editor-test',
          query: { id: $route.query.id }
        })
      "
      @copyTest="
        $PMRouter.push({
          path: '/test/editor-test',
          query: { id: $route.query.id, copy: 1 }
        })
      "
      @finishTest="handelFinishTest"
      @closeTest="handleCloseTest"
      @bugList="$PMRouter.push('/test/bug-list')"
      @report="
        $PMRouter.push({
          path: '/test/test-report-detail',
          query: { id: $route.query.id, isEditor: true }
        })
      "
    />
    <finish-dialog
      :show.sync="isVisible"
      :type="dialogType"
      :gmt-estimate-end="
        dialogType === 2
          ? testFormDetail.gmtEstimateStart
          : testFormDetail.gmtEstimateEnd
      "
      @confirm="handleDialogConfim"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers, mapActions as rootMapActions } from 'vuex';
import PmBreadCrumb from '@/components/common/pm-bread-crumb.vue';
import KitTable from '@/components/business/test/test-sheet-detail/kit-table.vue';
import PmButtonGroup from '@/components/common/pm-button-group';
import TestSheetInfo from '@/components/business/project/test-sheet-detail/test-sheet-info.vue';
import FinishDialog from '@/components/business/project/test-sheet-list/finish-dialog.vue';
import TestProgress from '@/components/business/project/test-sheet-detail/test-progress.vue';
import { BASELISTS, buttons } from '@/constants/project/test-sheet-detail';
import cloneDeep from 'lodash.clonedeep';
import dateFormat from 'dateformat';

const { mapState, mapActions } = createNamespacedHelpers(
  'test/test-sheet-detail'
);

export default {
  head() {
    return {
      title: '测试单详情'
    };
  },
  components: {
    PmBreadCrumb,
    PmButtonGroup,
    KitTable,
    FinishDialog,
    TestProgress,
    TestSheetInfo
  },
  data() {
    return {
      isVisible: false,
      dialogType: 1,
      paths: [
        {
          path: '/test/test-sheet-list',
          name: '测试单列表'
        },
        {
          path: '',
          name: '测试单详情'
        }
      ],
      baseLists: BASELISTS,
      buttons: cloneDeep(buttons),
      isExpand: false
    };
  },
  computed: {
    ...mapState(['testFormDetail', 'testInfo', 'testLoading', 'caseLoading']),
    statusCode() {
      return this.testFormDetail.statusCode;
    }
  },
  watch: {
    statusCode: {
      handler(val) {
        this.showBtnByStatus(val);
      },
      immediate: true
    }
  },
  created() {
    this.getTestFormDetail({ testFormId: this.$route.query.id });
  },
  methods: {
    ...mapActions(['getTestFormDetail', 'startTestForm']),
    ...rootMapActions('test/test-sheet-list', [
      'finishTestForm',
      'closeTestForm'
    ]),
    dateFormat,
    getConfirmResult(message, title) {
      return this.$confirm(message, title, {
        type: 'warning'
      });
    },

    // 开始测试
    handleStartTest() {
      this.dialogType = 2;
      this.isVisible = true;
    },

    // 完成测试
    handelFinishTest() {
      this.dialogType = 1;
      this.isVisible = true;
    },

    // 开始/完成测试 确定
    async handleDialogConfim(val) {
      if (this.dialogType === 2) {
        await this.startTestForm({ id: this.$route.query.id, date: val });
        await this.getTestFormDetail({ testFormId: this.$route.query.id });
        this.isVisible = false;
        return;
      }
      if (this.dialogType === 1) {
        await this.finishTestForm({ id: this.$route.query.id, date: val });
        await this.getTestFormDetail({ testFormId: this.$route.query.id });
        this.isVisible = false;
      }
    },

    // 关闭测试
    handleCloseTest() {
      this.getConfirmResult('确定关闭测试，关闭后不可再操作', '操作提示')
        .then(() => {
          this.closeTestForm({ id: this.$route.query.id }).then(() => {
            this.$PMRouter.push('/test/test-sheet-list');
          });
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 底部按钮显示隐藏
    showBtnByStatus(val) {
      if (!val) return;
      const newBtns = cloneDeep(buttons);

      if (val !== 'UNSTART') {
        // 只有未开始 编辑，开始测试才显示
        newBtns[1].isShow = false;
        newBtns[2].isShow = false;
      }

      if (val !== 'UNDERWAY') {
        // 测试中 完成测试 生成报告显示
        newBtns[3].isShow = false;
      }
      if (val === 'CLOSED') {
        // 关闭状态 返回，bug列表，复制测试单显示
        newBtns[1].isShow = false;
        newBtns[2].isShow = false;
        newBtns[3].isShow = false;
        newBtns[4].isShow = false;
        newBtns[5].isShow = false;
      }
      if (val === 'UNSTART') { // 未开始， 已关闭，生成报告不现实，其余都显示
        newBtns[5].isShow = false;
      }
      this.buttons = newBtns;
    }
  }
};
</script>

<style lang="less" scoped>
@deep: ~'>>>';

.test-sheet-detail {
  .title {
    font-weight: bold;
    padding-bottom: 10px;
    border-bottom: solid 1px #ebebeb;
    margin-bottom: 15px;
  }
  .more-filter {
    float: right;
    margin: 5px 0 0 10px;
    font-size: 14px;
  }
  .search-form {
    @{deep} .el-form-item {
      margin-right: 10px !important;
    }
  }
  .arrow-style {
    color: #1687D9;
    cursor: pointer;
  }
  .info-title {
    font-weight: bold;
  }
  .info-center {
    align-items: center;
    margin-bottom: 20px;
  }
}
</style>
