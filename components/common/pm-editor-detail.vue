/*
 * @Description: 编辑器详情
 * @Author: moran
 * @Date: 2019-07-10 12:00:45
 * @Last Modified by: danding
 * @Last Modified time: 2019-07-31 11:08:31
 */
<template>
  <div class="ql-container ql-snow eidtor-detail pm-scrollbar">
    <el-scrollbar>
      <div class="ql-editor">
        <p v-html="content"></p>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      // 文本内容
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped lang="less">
.eidtor-detail {
  border: none;
  max-height: 752px;
  overflow-y: auto;
}
</style>
