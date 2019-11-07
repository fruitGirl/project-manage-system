<template>
  <el-form inline :model="formData" class="search-form">
    <el-form-item>
      <el-select
        v-model="formData.status"
        size="small"
        placeholder="请选择"
        class="pm-select-style"
      >
        <el-option label="全部状态" :value="null"></el-option>
        <el-option label="运营中" value="RUN"></el-option>
        <el-option label="停止运营" value="STOP"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="formData.myManaged" class="query-checkbox"
        >我负责的</el-checkbox
      >
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="formData.myCreated" class="query-checkbox"
        >我创建的</el-checkbox
      >
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        status: null,
        myManaged: false,
        myCreated: false
      }
    };
  },
  watch: {
    formData: {
      handler(val) {
        this.$emit('real-time-submit', val);
      },
      deep: true
    }
  }
};
</script>
<style lang="less" scoped>
.search-form {
  font-size: 14px;
  color: #000;
  float: right;
  .el-form-item {
    margin-right: 20px;
  }
}
</style>
