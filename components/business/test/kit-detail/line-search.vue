<template>
  <el-form
    class="search-form"
    size="small"
    :inline="true"
    :model="projectFormData"
  >
    <el-form-item>
      <pm-remote-select
        v-model="projectFormData.executeResult"
        :action="TEST_CASE_EXECUTE_STATUS_URL"
        @change="handleChange"
      ></pm-remote-select>
    </el-form-item>
    <el-form-item>
      <pm-remote-select
        v-model="projectFormData.type"
        :action="TEST_CASE_STATUS_URL"
        @change="handleChange"
      ></pm-remote-select>
    </el-form-item>

    <el-form-item>
      <el-checkbox v-model="projectFormData.myCreated" @change="handleChange"
        >我创建的</el-checkbox
      >
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="projectFormData.myExecuted" @change="handleChange"
        >我最后执行的</el-checkbox
      >
    </el-form-item>
  </el-form>
</template>

<script>
import PmRemoteSelect from '@/components/common/pm-remote-select.vue';
import {
  TEST_CASE_STATUS_URL,
  TEST_CASE_EXECUTE_STATUS_URL
} from '@/services/common-config';
export default {
  components: {
    PmRemoteSelect
  },
  props: {
    placeholder: {
      type: String,
      default: '请输入'
    }
  },
  data() {
    return {
      TEST_CASE_STATUS_URL,
      TEST_CASE_EXECUTE_STATUS_URL,
      projectFormData: {
        type: null,
        myCreated: false,
        myExecuted: false,
        executeResult: null
      }
    };
  },
  methods: {
    handleChange() {
      this.$emit('change', this.projectFormData);
    }
  }
};
</script>

<style lang="less" scoped>
.search-form {
  font-size: 14px;
  color: #000;
  //  float:right;
  .el-form-item {
    margin-right: 10px;
  }
}
</style>
