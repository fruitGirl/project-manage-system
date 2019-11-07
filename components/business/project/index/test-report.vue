/*
 * @Description: 项目主页-测试报告
 * @Author: danding
 * @Date: 2019-06-24 15:46:23
 * @Last Modified by: moran
 * @Last Modified time: 2019-08-01 15:14:55
 */

<template>
  <div class="test-report-wrapper pm-scrollbar">
    <p>
      <span class="title">测试报告</span>
    </p>
    <pm-separate size="20" />
    <ul>
      <li
        v-for="item in data"
        :key="item.id"
        class="item"
      >{{item.label}}</li>
    </ul>
  </div>
</template>

<script>
import PmSeparate from '@/components/common/pm-separate';

export default {
  components: {
    PmSeparate,
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
};
</script>

<style lang="less" scoped>
  .test-report-wrapper {
    height: 280px;
    padding: 15px 15px 20px;
    margin-bottom: 15px;
    background: #fff;
    border-radius: 3px;
    .title {
      color: #333;
    }
    .item {
      padding-bottom: 8px;
    }
  }
</style>
