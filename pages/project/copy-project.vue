/*
 * @Description: 项目-复制项目
 * @Author: yaochen
 * @Date: 2019-07-26 14:31:41
 * @Last Modified by: moran
 * @Last Modified time: 2019-07-31 11:31:28
 */
<template>
  <div>
    <edit-project :is-copy="true"></edit-project>
  </div>
</template>

<script>
import EditProject from './edit-project';
export default {
  head() {
    return {
      title: '复制项目'
    };
  },
  components: {
    EditProject
  }
};
</script>

<style lang="less" scoped></style>
