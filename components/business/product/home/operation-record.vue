/*
 * @Description: 产品-首页-操作记录块
 * @Author: xiaojian
 * @Date: 2019-06-17 14:56:27
 * @Last Modified by: danding
 * @Last Modified time: 2019-07-31 11:16:17
 */
<template>
  <section class="card-section">
    <div class="section-header">
      <h2 class="title">操作记录</h2>
    </div>
    <div class="content">
      <pm-timelines :activities="operationLogList"/>
    </div>
  </section>
</template>
<script>
import PmTimelines from '@/components/common/pm-timelines';
export default {
  components: {
    PmTimelines
  },
  props: {
    operationLogList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
};
</script>
