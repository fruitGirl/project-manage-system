<template>
  <el-form class="search-form" size="small" inline :model="formData">
    <el-form-item>
      <pm-search-bar-dropdown
        v-model="formData.status"
        title="版本"
        :list="versions"
        @change="handleChange"
      />
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="formData.myCreated" @change="handleChange">我创建的</el-checkbox>
    </el-form-item>
  </el-form>
</template>
<script>
import { VERSION_LIST } from '@/constants/project/test-plan-list';
import PmSearchBarDropdown from '@/components/common/pm-search-bar-dropdown.vue';
export default {
  components: {
    PmSearchBarDropdown
  },
  data() {
    return {
      formData: {
        status: null,
        myCreated: false
      },
      versions: VERSION_LIST
    };
  },
  methods: {
    handleChange() {
      this.$emit('real-time-submit', this.formData);
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
