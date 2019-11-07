/*
 * @Description: 时间线组件
 * @Author: moran
 * @Date: 2019-06-18 12:17:54
 * @Last Modified by: moran
 * @Last Modified time: 2019-08-27 14:36:28
 */

<template>
  <div class="pm-timelines">
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in activities"
        :key="index"
        :type="item.type"
        :size="item.size || 'normal'"
        :color="item.color || '#dbdbdb'"
        :icon="item.icon || ''"
        :timestamp="item.timestamp || ''"
        :placement="item.placement || 'bottom'"
      >
        <span v-if="!item.timestamp" class="distance">{{ item.time }}</span>
        {{ item.content }}
        <div v-if="item.url && item.name">
          <nuxt-link :to="item.url">{{ item.name }}</nuxt-link>
        </div>
        <div v-if="!item.url && item.name" style="color:#999">
          {{ item.name }}
        </div>
        <!-- 增加时间节点备注 -->
        <div v-if="item.memos">
          <p v-for="(memo, i) in item.memos" :key="i" class="memo">
            {{ memo }}
          </p>
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  props: {
    activities: { // 时间线数组
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      timeType: ['primary', 'success', 'warning', 'danger', 'info']
    };
  }
};
</script>

<style lang="less" scoped>
@deep: ~'>>>';

.pm-timelines {
  @{deep} .el-timeline-item__node--normal {
    left: 0px;
    width: 10px;
    height: 10px;
  }
  .distance {
    margin-right: 10px;
  }
  @{deep} .el-timeline-item__content {
    white-space: normal;
    word-break: break-all;
  }
}
.memo {
  word-break: break-all;
}
</style>
