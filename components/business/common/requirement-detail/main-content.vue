/*
 * @Description: 需求详情-需求内容
 * @Author: moran
 * @Date: 2019-06-21 14:43:10
 * @Last Modified by: moran
 * @Last Modified time: 2019-10-31 16:08:18
 */

<template>
  <div>
    <div class="main-content">
      <pm-separate size="20" />
      <pm-info-title title="需求描述"/>
      <pm-editor-detail :content="mainForm.description" />
      <pm-accessory :data="mainForm.attachmentList" />
       <pm-separate size="20" />
    </div>
  </div>
</template>

<script>
import PmSeparate from '@/components/common/pm-separate';
import PmEditorDetail from '@/components/common/pm-editor-detail.vue';
import PmAccessory from '@/components/common/pm-accessory.vue';
import PmInfoTitle from '@/components/common/pm-info-title';

export default {
  components: {
    PmSeparate,
    PmEditorDetail,
    PmAccessory,
    PmInfoTitle
  },
  props: {
    mainForm: {
      type: Object,
      default: () => {}
    }
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
