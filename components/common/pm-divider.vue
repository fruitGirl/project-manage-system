<template>
  <div :class="['divider-container', direction === 'vertical' ? 'inline' : '']">
    <el-divider :direction="direction" :content-position="contentPosition" />
  </div>
</template>

<script>
export default {
  props: {
    direction: {
      type: String,
      default: 'horizontal'
    },
    contentPosition: {
      type: String,
      default: 'center'
    }
  }
};
</script>

<style lang="less" scoped>
@deep: ~'>>>';

.divider-container {
  &.inline {
    display: inline-block;
  }
  @{deep} .el-divider--horizontal {
    margin: 0;
  }
}
</style>
