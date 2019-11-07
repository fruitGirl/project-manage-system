/*
 * @Description: 用例详情-操作记录
 * @Author: danding
 * @Date: 2019-06-21 14:43:30
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 15:30:26
 */

<template>
  <pm-info-card>
    <template v-slot:title>
      <span>操作记录</span>
    </template>
    <template v-slot:content>
      <pm-separate />
      <pm-timelines :activities="history"/>
    </template>
  </pm-info-card>
</template>

<script>
import PmInfoCard from '@/components/common/pm-info-card';
import PmTimelines from '@/components/common/pm-timelines.vue';
import PmSeparate from '@/components/common/pm-separate';

export default {
  components: {
    PmInfoCard,
    PmTimelines,
    PmSeparate
  },
  props: {
    history: {
      type: Array,
      default: () => []
    }
  }
};
</script>
