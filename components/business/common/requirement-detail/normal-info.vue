/*
 * @Description: 需求详情-基本信息
 * @Author: moran
 * @Date: 2019-06-21 14:42:50
 * @Last Modified by: moran
 * @Last Modified time: 2019-10-31 17:37:24
 */

<template>
  <div class="detail-normal-info">
    <div>
      <el-tag>标题</el-tag>
      <span class="title">{{ data.title }}</span>
      <span class="pm-tag-yellow">{{ data.priority }}</span>
      <span v-if="data.source" class="pm-tag-blue">{{ data.source }}</span>
    </div>
    <pm-separate :size="15" />
    <div class="info-box">
      <pm-info-list :config="config" :data="data" :is-vertical="false" label-class="label-style"/>
    </div>
    
  </div>
</template>

<script>
import PmSeparate from '@/components/common/pm-separate';
import PmInfoList from '@/components/common/pm-info-list.vue';

export default {
  components: {
    PmSeparate,
    PmInfoList
  },
  props: {
    data: {
      // 数据源
      type: Object,
      default: () => ({})
    },
    config: {
      // 列表配置项
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
  @deep: ~'>>>';
  .detail-normal-info {
    @{deep}.label-style {
      color: #333;
    }
    .info-box {
      background-color: #F5F5F5;
      padding: 10px;
    }
    .title {
      margin: 0 5px 0 10px;
    }
  }
 
</style>
