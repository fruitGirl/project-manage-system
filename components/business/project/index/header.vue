/*
 * @Description: 项目主页-头部
 * @Author: danding
 * @Date: 2019-06-24 15:45:38
 * @Last Modified by: moran
 * @Last Modified time: 2019-08-01 15:13:43
 */

<template>
  <div class="pm-module-container header-wrapper pm-flex pm-flex-between pm-flex-center">
    <div>
      <span class="title">周报月报</span>
      <pm-separate :is-vertical="false" size="20" />
      <span class="status">进行中</span>
      <pm-separate :is-vertical="false" size="20" />
      <span>2019-05-21 - 2019-03-14</span>
    </div>
    <div class="flex-1 pm-text-right">
      <el-button
        v-for="btn in btns"
        v-show="btn.isShow('')"
        :key="btn.label"
        type="text"
        @click="this.$emit('callback', btn.func)"
      >{{btn.label}}</el-button>
    </div>
  </div>
</template>

<script>
import PmSeparate from '@/components/common/pm-separate';
import { BTNS_CONFIG } from '@/constants/project';

export default {
  components: {
    PmSeparate
  },
  data() {
    return {
      btns: BTNS_CONFIG
    };
  }
};
</script>

<style scoped lang="less">
  .header-wrapper {
    padding-bottom: 15px;
    padding-right: 30px;
    .title {
      font-weight: bold;
    }
    .status {
      color: #2A8F28;
    }
  }
</style>
