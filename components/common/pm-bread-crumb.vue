/*
 * @Description: 面包屑导航
 * @Author: yaochen
 * @Date: 2019-06-18 18:19:13
 * @Last Modified by: danding
 * @Last Modified time: 2019-07-31 11:07:23
 */
<template>
  <div class="bread-crumb-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(path, index) in paths" :key="path.name">
        <pm-link v-if="index !== paths.length - 1" :to="path.path">{{
          path.name
        }}</pm-link>
        <template v-else>{{ path.name }}</template>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    // 面包屑path
    paths: {
      type: Array,
      default: () => [],
      required: true
    }
  }
};
</script>

<style lang="less" scoped>
.el-main .bread-crumb-container {
  padding: 15px 22px;
  // margin: -20px;
  margin-bottom: 15px;
  border-top: 1px solid #ececec;
  background-color: white;
}
</style>
