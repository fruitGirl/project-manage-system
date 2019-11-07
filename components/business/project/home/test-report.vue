/*
 * @Description: 项目主页-测试报告
 * @Author: danding
 * @Date: 2019-06-24 15:46:23
 * @Last Modified by: moran
 * @Last Modified time: 2019-08-29 16:16:13
 */

<template>
  <div class="test-report-wrapper">
    <p>
      <span class="title">测试报告</span>
    </p>
    <pm-separate size="20" />
    <ul v-if="data.length > 0" class="pm-scrollbar test-content">
      <li v-for="item in data" :key="item.id" class="item">
        <pm-link :to="`/test/test-report-detail?id=${item.id}`">{{
          item.name
        }}</pm-link>
      </li>
    </ul>
    <div v-else>
      <pm-no-data />
    </div>
  </div>
</template>

<script>
import PmSeparate from '@/components/common/pm-separate';
import PmNoData from '@/components/common/pm-no-data';

export default {
  components: {
    PmSeparate,
    PmNoData
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="less" scoped>
.test-report-wrapper {
  height: 300px;
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
  .test-content {
    height: 225px;
  }
}
</style>
