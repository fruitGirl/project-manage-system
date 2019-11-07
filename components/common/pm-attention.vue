/*
 * @Description: 文本提示栏
 * @Author: danding
 * @Date: 2019-06-24 17:43:39
 * @Last Modified by: moran
 * @Last Modified time: 2019-08-01 15:23:25
 */

<template>
  <div class="pm-attention-wrapper pm-flex pm-flex-center">
    <i class="el-icon-info icon"></i>
    <pm-separate :is-vertical="false" size="15" />
    <slot></slot>
  </div>
</template>

<script>
import PmSeparate from '@/components/common/pm-separate';

export default {
  components: {
    PmSeparate
  }
};
</script>

<style lang="less" scoped>
.pm-attention-wrapper {
  border: 1px solid #409eff;
  padding: 5px 15px;
  border-radius: 3px;
  background: #ecf5ff;
  .icon {
    font-size: 18px;
    color: #409eff;
  }
}
</style>
