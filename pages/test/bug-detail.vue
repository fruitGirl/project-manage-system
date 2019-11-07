<template>
  <div>
    <bug-detail :breadcrumb-config="paths"></bug-detail>
  </div>
</template>

<script>
import BugDetail from '../project/bug-detail.vue';
import { PATHS } from '@/constants/test/bug-detail';

export default {
  head() {
    return {
      title: 'BUG详情'
    };
  },
  components: {
    BugDetail
  },
  data() {
    return {
      paths: PATHS
    };
  }
};
</script>

<style lang="less" scoped></style>
