/*
 * @Description: 用例详情-基本信息
 * @Author: danding
 * @Date: 2019-06-21 14:42:50
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 15:35:56
 */

<template>
  <pm-info-card>
    <template v-slot:title>
      <span>基本信息</span>
    </template>
    <template v-slot:content>
      <pm-info-list :config="config" :data="data" />
    </template>
  </pm-info-card>
</template>

<script>
import PmInfoCard from '@/components/common/pm-info-card';
import PmInfoList from '@/components/common/pm-info-list.vue';

export default {
  components: {
    PmInfoCard,
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
