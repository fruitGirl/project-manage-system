/*
 * @Description: 是否有效组件
 * @Author: yaochen
 * @Date: 2019-06-18 18:18:50
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 15:00:29
 */
<template>
  <div>
    <pm-dot :color="available ? 'green' : 'red'" />
    {{ available ? '有效' : '无效' }}
  </div>
</template>

<script>
import PmDot from '@/components/common/pm-dot';
export default {
  components: {
    PmDot
  },
  props: {
    // 有效或无效
    available: {
      type: Boolean,
      default: true,
      required: true
    }
  }
};
</script>

<style lang="less" scoped></style>
