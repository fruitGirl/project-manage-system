/*
 * @Description: 测试-测试报告详情
 * @Author: moran
 * @Date: 2019-06-24 10:39:37
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 14:38:08
 */
<template>
  <div v-loading="baseLoading" class="test-report-detail">
    <pm-bread-crumb :paths="paths" />
    <div class="detail-transparent-container">
      <el-row :gutter="16">
        <el-col :span="16">
          <div class="detail-bac">
            <div v-if="!$route.query.isEditor" class="report-title">
              <div class="report-tag">标题</div>
              <div class="report-name">{{ testReports.name }}</div>
            </div>
            <div v-else class="report-title-input">
              <el-form ref="form" :model="formData" size="small">
                <el-form-item
                  prop="name"
                  :rules="[{ required: true, message: '请输入标题' }]"
                >
                  <el-input
                    v-model.trim="formData.name"
                    autosize
                    type="textarea"
                    :maxlength="50"
                    :rows="1"
                    placeholder="请输入标题，最多50字"
                  />
                </el-form-item>
              </el-form>
            </div>
            <report-detail-tab
              ref="editor"
              :base-info="
                isEditor || isSheet
                  ? testEditorFormCaseInfos
                  : testFormCaseInfos
              "
            ></report-detail-tab>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="detail-bac">
            <base-info
              :config="baseLists"
              :data="isEditor || isSheet ? testEditorReports : testReports"
            ></base-info>
          </div>
        </el-col>
      </el-row>
    </div>
    <pm-button-group :show-divide="!!isEditor" :buttons="buttons"
      @cancel="$PMRouter.back()"
      @save="handelSave"
      @back="$PMRouter.back()"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import PmBreadCrumb from '@/components/common/pm-bread-crumb.vue';
import BaseInfo from '@/components/business/project/test-sheet-detail/base-info.vue';
import ReportDetailTab from '@/components/business/project/test-report-detail/report-detail-tab.vue';
import PmButtonGroup from '@/components/common/pm-button-group';
import { BASELISTS } from '@/constants/project/test-report-detail';
const { mapActions, mapState } = createNamespacedHelpers(
  'test/test-report-detail'
);
export default {
  head() {
    return {
      title: '测试报告详情'
    };
  },
  components: {
    PmBreadCrumb,
    BaseInfo,
    ReportDetailTab,
    PmButtonGroup
  },
  data() {
    return {
      baseLists: BASELISTS,
      isEditor: this.$route.query.isEditor,
      isSheet: this.$route.query.isSheet,
      id: this.$route.query.id,
      formData: {
        testFormId: this.$route.query.id,
        name: ''
      },
      paths: [
        {
          path: '/test/test-report-list',
          name: '测试报告列表'
        },
        {
          path: '',
          name: '测试报告详情'
        }
      ],
      buttons: [
        {
          label: '返回',
          type: this.$route.query.isEditor ? '' : 'primary',
          textColor: this.$route.query.isEditor ? 'primary' : '',
          func: 'back'
        },
        {
          label: '取消',
          textColor: 'primary',
          func: 'cancel',
          isShow: !!this.$route.query.isEditor
        },
        {
          label: '保存',
          textColor: 'primary',
          func: 'save',
          isShow: !!this.$route.query.isEditor
        }
      ]
    };
  },
  computed: {
    ...mapState([
      'testReports',
      'testFormCaseInfos',
      'testEditorReports',
      'testEditorFormCaseInfos',
      'baseLoading'
    ])
  },
  created() {
    if (this.isEditor || this.isSheet) {
      this.getTestEditorReportDetail({ testFormId: this.id });
    } else {
      this.getTestReportDetail({ testReportId: this.id });
    }
  },
  methods: {
    ...mapActions([
      'getTestReportDetail',
      'getTestEditorReportDetail',
      'testReportCreate'
    ]),
    handelSave() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const summarize = this.$refs.editor.getEditorValue();
          const { manager, projectVersionId } = this.testEditorReports;
          const params = {
            ...this.formData,
            summarize,
            manager,
            projectVersionId
          };
          this.testReportCreate(params);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.test-report-detail {
  font-size: 14px;
  .report-title {
    border-bottom: solid 1px #ebebeb;
    padding-bottom: 10px;
    margin-bottom: 20px;
    .label {
      width: 60px;
    }
    .report-tag {
      background-color: #e3f3ff;
      width: 43px;
      text-align: center;
      display: inline-block;
    }
    .report-name {
      display: inline-block;
      font-weight: bold;
      margin-left: 9px;
    }
  }
}
</style>
