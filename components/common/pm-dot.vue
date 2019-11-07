/*
 * @Description: 前面有圆点的组件
 * @Author: yaochen
 * @Date: 2019-06-18 18:18:50
 * @Last Modified by: danding
 * @Last Modified time: 2019-07-31 11:08:09
 */
<template>
  <span class="dot" :style="{ color: color }">
    <slot></slot>
  </span>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#333'
    }
  }
};
</script>

<style lang="less" scoped>
@dot_size: 6px;
.dot {
  position: relative;
  padding-left: 10px;
  margin-right: 5px;
  &::before {
    content: '';
    position: absolute;
    border-radius: 50%;
    width: @dot_size;
    height: @dot_size;
    top: 50%;
    transform: translate(-120%, -50%);
    background-color: currentColor;
  }
}
</style>
