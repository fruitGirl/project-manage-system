/*
 * @Description: 测试报告详情页tab
 * @Author: moran
 * @Date: 2019-06-24 10:40:16
 * @Last Modified by: moran
 * @Last Modified time: 2019-08-26 15:02:25
 */
<template>
  <div class="pm-report-detail-tab">
    <el-tabs v-model="activeName" class="pm-tabs" @tab-click="handleTabClick">
      <el-tab-pane label="基本信息" name="a" :lazy="true" class="report-tabs">
        <div class="info-width">
          <pm-info-list
            :config="baseLists"
            :data="baseInfo"
            :is-vertical="false"
            :is-need-width="true"
          />
        </div>
        <div class="editor-box">
          <h5>总结</h5>
          <pm-editor v-if="$route.query.isEditor" ref="autotext" />
          <pm-editor-detail v-else :content="baseInfo.summarize || '无'" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="测试范围" name="b" :lazy="true">
        <test-range-table :test-id="baseInfo.testFormId" />
      </el-tab-pane>
      <el-tab-pane label="测试用例" name="c" :lazy="true">
        <test-case-table :test-id="baseInfo.testFormId" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PmInfoList from '@/components/common/pm-info-list.vue';
import PmEditor from '@/components/common/pm-editor';
import TestRangeTable from '@/components/business/project/test-report-detail/test-range-table.vue';
import TestCaseTable from '@/components/business/project/test-report-detail/test-case-table.vue';
import PmEditorDetail from '@/components/common/pm-editor-detail.vue';
import { TABBASELISTS } from '@/constants/project/test-report-detail';
export default {
  components: {
    PmInfoList,
    PmEditor,
    TestRangeTable,
    TestCaseTable,
    PmEditorDetail
  },
  props: {
    baseInfo: {
      // 数据源
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      activeName: 'a',
      baseLists: TABBASELISTS
    };
  },
  methods: {
    handleTabClick() {},
    getEditorValue() {
      // 组件公共方法
      return this.$refs.autotext.getContent();
    }
  }
};
</script>

<style lang="less" scoped>
.pm-report-detail-tab {
  .report-tabs {
    padding: 10px 2px;
  }
  .info-width {
    width: 667px;
    box-shadow: 0px 0px 7px rgba(35, 35, 35, 0.2);
    border-radius: 3px;
    padding: 15px 0;
  }
  .editor-box {
    margin-top: 20px;
    h5 {
      margin-bottom: 10px;
    }
  }
}
</style>
