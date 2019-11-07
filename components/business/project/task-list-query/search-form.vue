<template>
  <el-form class="search-form" size="small" inline :model="formData">
    <el-form-item>
      <pm-remote-select
        v-model="formData.status"
        action="/home/pageOptionsParamInit?fullPath=com.bench.app.pm.api.web.base.core.model.task.enums.TaskStatusEnum"
      ></pm-remote-select>
      <pm-remote-select
        v-model="formData.type"
        action="/home/pageOptionsParamInit?fullPath=com.bench.app.pm.api.web.base.core.model.task.enums.TaskTypeEnum"
      ></pm-remote-select>
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="formData.myAssigned">指派给我的</el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="formData.myCreated">我创建的</el-checkbox>
    </el-form-item>
  </el-form>
</template>
<script>
import pmRemoteSelect from '@/components/common/pm-remote-select.vue';
export default {
  components: {
    pmRemoteSelect
  },
  data() {
    return {
      formData: {
        status: null,
        type: null,
        myAssigned: false,
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
.el-checkbox {
  color: #000;
}
</style>
