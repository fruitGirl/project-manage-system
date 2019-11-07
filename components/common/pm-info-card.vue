/*
 * @Description: 模块包裹容器
 * @Author: danding
 * @Date: 2019-06-21 11:51:02
 * @Last Modified by: moran
 * @Last Modified time: 2019-08-01 15:23:55
 */

<template>
  <div class="pm-module-container">
    <div class="content title">
      <slot name="title" />
    </div>
    <pm-separate size="15" />
    <pm-divider />
    <pm-separate size="15" />
    <div class="content">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
import PmSeparate from '@/components/common/pm-separate';
import PmDivider from '@/components/common/pm-divider';

export default {
  components: {
    PmSeparate,
    PmDivider
  }
};
</script>

<style lang="less" scoped>
.pm-module-container {
  padding: 15px 15px 20px;
  margin-bottom: 15px;
  background: #fff;
  border-radius: 3px;
  .title {
    font-size: 14px;
    font-weight: bold;
  }
  .content {
    padding: 0 13px;
  }
}
</style>
