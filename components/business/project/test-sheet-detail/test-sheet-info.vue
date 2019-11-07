<template>
  <div class="test-sheet-info">
    <h3>信息</h3>
    <pm-separate size="10" />
    <pm-info-list
      :is-vertical="false"
      :config="config"
      :data="data"
      value-class="info-style"
    />
    <pm-separate size="10" />
    <h3>测试单描述</h3>
    <div class="pm-detail-editor">
      <pm-editor-detail v-if="data.description" :content="data.description" />
      <div v-else class="no-data-text">无</div>
    </div>
  </div>
  
</template>

<script>
import PmInfoList from '@/components/common/pm-info-list.vue';
import PmSeparate from '@/components/common/pm-separate';
import PmEditorDetail from '@/components/common/pm-editor-detail.vue';
export default {
  components: {
    PmInfoList,
    PmEditorDetail,
    PmSeparate
  },
  props: {
    config: {
      // 配置
      type: Array,
      default: () => []
    },
    data: {
      // 数据源
      type: Object,
      default: () => ({})
    },
  }
};
</script>

<style lang="less" scoped>
  @deep: ~'>>>';
  .test-sheet-info {
    background-color: #F7F7F7;
    padding: 15px;
    .no-data-text {
      text-align: left;
      font-size: 12px;
      color: #999;
      margin-top: 10px;
    }
  }
  @{deep}.info-style{
    color: #999;
    font-size: 12px;
  }
  @{deep}.surly-item {
    padding: 5px 10px 5px 0 !important;
  }
  @{deep}.ql-editor {
    padding: 12px 15px 12px 0 !important;
  }

</style>