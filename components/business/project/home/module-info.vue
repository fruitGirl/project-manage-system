<template>
  <div class="distance">
    <h3>{{title}}</h3>
    <pm-info-list
      :is-vertical="false"
      :config="config"
      :data="data"
      value-class="info-style"
    />
    <span class='member'>{{member}}</span>
  </div>
</template>

<script>
import PmInfoList from '@/components/common/pm-info-list.vue';
export default {
  components: {
    PmInfoList,
  },
  props: {
    title: { // 标题
      type: String,
      default: ''
    },
    member: { // 字符串显示-成员
      type: String,
      default: ''
    },
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
 h3 {
    margin-bottom: 10px;
  }
  @{deep}.surly-item {
    padding: 0 20px 0 0 !important;
    font-size: 12px;
    min-width: 130px !important;
  }
  .distance{
    margin-bottom: 10px;
  }
  .member {
    color: #999;
    font-size: 12px
  }
  @{deep}.info-style{
    color: #999
  }
</style>