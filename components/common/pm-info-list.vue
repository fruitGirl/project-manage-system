/*
 * @Description: 基本信息列表展示
 * @Author: danding
 * @Date: 2019-06-21 12:21:31
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-01 10:20:23
 */

<template>
  <ul class="info-list">
    <li
      v-for="item in config"
      :key="item.label"
      :class="`item ${isVertical ? '' : 'surly-item'} ${isNeedWidth ? 'item-width' : ''}`"
    >
      <span :class="['label', labelClass]">{{ item.label }}
        <span v-if="item.label || item.label === 0"> ：</span>
      </span>
      <span v-if="!isArrayShow" :class="valueClass">{{ data[item.field] || '-' }}</span>
      <span v-if="isArrayShow" :class="valueClass">{{ item.value }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    config: {
      // 配置
      type: Array,
      default: () => []
    },
    data: {
      // 数据源
      type: Object,
      default: () => ({})
    },
    labelClass: {
      // label样式
      type: String,
      default: ''
    },
    valueClass: {
      // value样式
      type: String,
      default: ''
    },
    isVertical: {
      type: Boolean,
      default: true
    },
    isNeedWidth: {
      type: Boolean,
      default: false
    },
    isArrayShow: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="less" scoped>
.info-list {
  .item {
    padding-bottom: 8px;
  }
  .surly-item {
    display: inline-block;
    padding: 5px 10px;
    width: 33.3%;
  }
  .item-width {
    width: 130px;
  }
  .label {
    color: #999;
  }
}
</style>
