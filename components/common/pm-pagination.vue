/*
 * @Description: 分页组件
 * @Author: moran 
 * @Date: 2019-06-18 12:18:44 
 * @Last Modified by: moran 
 * @Last Modified time: 2019-06-18 12:18:44 
 */
<template>
  <el-pagination
    background
    :current-page="currentPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    :layout="layout"
    :total="totalNum"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange">
  </el-pagination>
</template>

<script>
export default {
  props: {
    layout: {
      type: String,
      default: "total, prev, pager, next, sizes, jumper"
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    totalNum: {
      type: Number,
      default: 100
    },
    pageSizes: {
      type: [Number, Array],
      default: () => [10, 20, 50, 100]
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit('currentChange', val);
    },
    handleSizeChange(val) {
      this.$emit('sizeChange', val);
    },
  }
};
</script>

