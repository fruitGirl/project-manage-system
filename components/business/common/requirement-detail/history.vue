/*
 * @Description: 需求详情-操作记录
 * @Author: moran
 * @Date: 2019-06-21 14:43:30
 * @Last Modified by: moran
 * @Last Modified time: 2019-10-31 16:08:09
 */

<template>
  <div>
    <pm-info-title title="操作记录"/>
    <el-scrollbar>
      <div class="time-height">
        <pm-timelines :activities="history" />
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import PmTimelines from '@/components/common/pm-timelines.vue';
import PmInfoTitle from '@/components/common/pm-info-title';

export default {
  components: {
    PmTimelines,
    PmInfoTitle
  },
  props: {
    history: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped lang="less">
.time-height {
  height: 220px;
}
</style>
