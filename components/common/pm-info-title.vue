/*
 * @Description: 标题样式组件
 * @Author: moran
 * @Date: 2019-10-31 15:40:25
 * @Last Modified by: moran
 * @Last Modified time: 2019-10-31 15:40:25
 */
<template>
  <div
    class="pm-title-box"
    :style="wrapperStyle"
  >
    <span v-if="isBlueLine" class="blue-line"></span>
    <span class="title">{{ title }}</span>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      hasBottomMargin: { // 是否需要底部的边距
        type: Boolean,
        default: true
      },
      isBlueLine: { // 是否需要标题的蓝色竖线
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
      };
    },
    computed: {
      wrapperStyle() {
        return {
          'margin-bottom': this.hasBottomMargin ? '15px' : ''
        };
      }
    }
  };
</script>

<style lang="less" scoped>
  .pm-title-box {
    height: 19px;
    display: flex;
    align-items: center;
    .blue-line {
      height: 15px;
      width: 3px;
      background-color: #1687D9;
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
    }
    .title {
      color: #333;
      font-weight: bold;
    }
  }
</style>
