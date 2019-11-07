<template>
  <el-form class="charger-form" inline label-width="7rem">
    <el-form-item label="项目负责人:">
      <span class="value-label">{{ teamInfo.projectManager }}</span>
    </el-form-item>
    <el-form-item label="产品负责人:">
      <span class="value-label">{{ teamInfo.productManager }}</span>
    </el-form-item>
    <el-form-item label="开发负责人:">
      <span class="value-label">{{ teamInfo.developManager }}</span>
    </el-form-item>
    <el-form-item label="测试负责人:">
      <span class="value-label">{{ teamInfo.testManager }}</span>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    teamInfo: {
      type: Object,
      default: () => {},
      required: true
    }
  }
};
</script>

<style lang="less" scoped>
@deep: ~'>>>';

.charger-form {
  @{deep} .el-form-item {
    width: 40%;
  }
}

.value-label {
  color: #ccc;
}
</style>
