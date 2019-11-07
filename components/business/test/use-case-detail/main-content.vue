/*
 * @Description: 用例详情-需求内容
 * @Author: danding
 * @Date: 2019-06-21 14:43:10
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-21 16:21:34
 */

<template>
  <div>
    <pm-info-title title="前置条件" :has-bottom-margin="false" />
    <pm-textarea-detail>
      {{ dataProvider.precondition }}
    </pm-textarea-detail>
    <pm-info-title title="用例描述" />
    <pm-editor-detail
      v-if="
        dataProvider.describeType &&
          dataProvider.describeType.name === TEXT_DESCRIBE
      "
      :content="dataProvider.testCaseSteps[0] && dataProvider.testCaseSteps[0].textDescribe"
    />
    <div v-if="dataProvider.describeType &&
          dataProvider.describeType.name === STEP_DESCRIBE">
      <pm-table
        :data="dataProvider.testCaseSteps"
        row-key="id"
        :border="true"
        :column="USE_CASE_DETAIL_COLUMN"
        :is-pagination="false"
        children-field="testCaseStepList"
        :is-operation="false"
      />
    </div>
    <pm-separate size="15" />
    <pm-accessory :data="files"/>
  </div>
</template>

<script>
import PmSeparate from '@/components/common/pm-separate';
import {
  TEXT_DESCRIBE,
  USE_CASE_DETAIL_COLUMN,
  STEP_DESCRIBE
} from '@/constants/test/use-case-list';
import PmTable from '@/components/common/pm-table';
import PmEditorDetail from '@/components/common/pm-editor-detail.vue';
import PmTextareaDetail from '@/components/common/pm-textarea-detail';
import PmAccessory from '@/components/common/pm-accessory';
import PmInfoTitle from '@/components/common/pm-info-title.vue';

export default {
  components: {
    PmSeparate,
    PmTable,
    PmEditorDetail,
    PmTextareaDetail,
    PmAccessory,
    PmInfoTitle
  },
  props: {
    dataProvider: { // 数据源
      type: Object,
      default: () => ({})
    },
    files: { // 文件资源集合
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      TEXT_DESCRIBE, // 文本描述步骤
      STEP_DESCRIBE, // 用例步骤
      USE_CASE_DETAIL_COLUMN
    };
  }
};
</script>

<style scoped lang="less">
.main-content {
  .divider-container {
    margin: 0 -13px;
  }
}
</style>
