/*
 * @Description: v-html的封装
 * @Author: danding
 * @Date: 2019-08-21 16:11:55
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-21 16:20:34
 */

<template>
  <div class="pm-textarea-detail-wrapper">
    <p v-if="label" class="title">{{label}}</p>
    <p class="textarea-detail"><slot /></p>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped lang="less">
  .pm-textarea-detail-wrapper {
    display: flex;
    .title {
      font-weight: bold;
    }
    .textarea-detail {
      flex: 1;
      white-space: pre-wrap;
    }
  }
</style>
