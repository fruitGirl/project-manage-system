/*
 * @Description: bug详情-需求内容
 * @Author: danding
 * @Date: 2019-06-21 14:43:10
 * @Last Modified by: moran
 * @Last Modified time: 2019-10-31 18:27:42
 */

<template>
  <div class="bug-main-content">
    <pm-separate size="20" />
    <pm-info-title title="BUG描述"/>
    <pm-editor-detail :content="bugInfo.steps" />
    <pm-accessory :data="attachmentList" />
    <pm-separate size="15" />
    <pm-info-title title="解决方案"/>
    <div class="info-show">
      {{ bugInfo.resolution && bugInfo.resolution.message }}
    </div>
    <pm-separate size="15" />
    <pm-info-title title="备注"/>
    <pm-editor-detail :content="bugInfo.solveDescription" />
  </div>
</template>

<script>
import PmSeparate from '@/components/common/pm-separate';
import PmAccessory from '@/components/common/pm-accessory.vue';
import { createNamespacedHelpers } from 'vuex';
import PmEditorDetail from '@/components/common/pm-editor-detail.vue';
import PmInfoTitle from '@/components/common/pm-info-title';

const { mapState } = createNamespacedHelpers('project/bug-detail');
export default {
  components: {
    PmSeparate,
    PmAccessory,
    PmEditorDetail,
    PmInfoTitle
  },
  computed: {
    ...mapState(['bugInfo', 'attachmentList'])
  }
};
</script>

<style scoped lang="less">
.bug-main-content {
  margin-bottom: 15px;
  .divider-container {
    margin: 0 -13px;
  }
  .info-show {
    padding-left: 13px
  }
}
.detail {
  display: flex;
  padding: 0px 15px;
  .detail-info {
    background-color: white;
    padding: 20px;
    flex: 1;
  }
}
.time-container {
  color: rgba(0, 0, 0, 0.427450980392157);
  font-size: 14px;
  margin-bottom: 16px;
  .update-time {
    margin-left: 20px;
  }
}
.title-tag {
  font-weight: 400;
  font-size: 12px;
  background-color: #e3f3ff;
  padding: 1px 8px;
  border-radius: 4px;
  margin-right: 12px;
}
</style>
