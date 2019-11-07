<template>
  <div>
    <doc-detail></doc-detail>
  </div>
</template>

<script>
import DocDetail from '@/pages/document/doc-detail.vue';

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
