/*
 * @Description: bug详情-操作记录
 * @Author: danding
 * @Date: 2019-06-21 14:43:30
 * @Last Modified by: moran
 * @Last Modified time: 2019-10-31 18:02:29
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
import PmTimelines from '@/components/common/pm-timelines';
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
