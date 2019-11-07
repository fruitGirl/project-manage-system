/*
 * @Description: 间隔组件
 * @Author: danding
 * @Date: 2019-06-17 10:58:40
 * @Last Modified by: danding
 * @Last Modified time: 2019-07-31 11:11:56
 */

<template>
  <div
    :style="{
      display: isVertical ? 'block' : 'inline-block',
      height: isVertical ? sizePx : '1px',
      width: isVertical ? '100%' : sizePx
    }"
  />
</template>

<script>
export default {
  props: {
    size: {
      // 宽度或者高度大小
      type: [Number, String],
      default: 10
    },
    isVertical: {
      // 是否是垂直模式
      type: Boolean,
      default: true
    }
  },

  computed: {
    sizePx() {
      // 转换单位
      if (this.isVertical) {
        return this.size + 'px';
      } else {
        return this.size - 4 < 0 ? 0 + 'px' : this.size - 4 + 'px';
      }
    }
  }
};
</script>
