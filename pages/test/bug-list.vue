/*
 * @Description: bug 列表
 * @Author: yaochen
 * @Date: 2019-07-19 18:13:31
 * @Last Modified by: moran
 * @Last Modified time: 2019-07-31 11:50:15
 */

<template>
  <div>
    <bug-list :has-dependence-id="false"></bug-list>
  </div>
</template>

<script>
import BugList from '../project/bug-list.vue';

export default {
  isKeepAlive: true,
  head() {
    return {
      title: 'BUG列表'
    };
  },
  components: {
    BugList
  }
};
</script>

<style lang="less" scoped></style>
