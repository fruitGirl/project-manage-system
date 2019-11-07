/*
 * @Description: 项目-文档详情
 * @Author: yaochen
 * @Date: 2019-07-26 14:31:16
 * @Last Modified by: moran
 * @Last Modified time: 2019-07-31 11:31:53
 */
<template>
  <div>
    <doc-detail></doc-detail>
  </div>
</template>

<script>
import DocDetail from '@/pages/document/doc-detail';
export default {
  head() {
    return {
      title: '文档详情'
    };
  },
  components: {
    DocDetail
  }
};
</script>

<style lang="less" scoped></style>
