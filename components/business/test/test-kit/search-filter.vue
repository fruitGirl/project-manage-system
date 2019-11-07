<template>
  <el-form :model="formData" class="search-form" size="small" :inline="true">
    <el-form-item>
      <pm-remote-search
        v-model="formData.creator"
        :action="ALL_USER_URL"
        :parse-structure="handleParse"
        placeholder="请输入创建人"
      />
    </el-form-item>
    <el-form-item>
      <el-input
        v-model="formData.title"
        placeholder="请输入套件标题"
      ></el-input>
    </el-form-item>
    <el-button
      class="btn-blue"
      type="primary"
      style="margin-top: 3px;"
      @click="handleSearch"
      >查询</el-button
    >
  </el-form>
</template>

<script>
import PmRemoteSearch from '@/components/common/pm-remote-search';
import { ALL_USER_URL } from '@/services/common-config';
import { transArrs } from '@/utils/common';
export default {
  components: {
    PmRemoteSearch
  },
  data() {
    return {
      formData: {
        title: '',
        creator: ''
      },
      ALL_USER_URL
    };
  },
  methods: {
    handleParse(data) {
      return transArrs(data.userList, 'nickName', 'userId');
    },
    handleSearch() {
      this.$emit('search', this.formData);
    }
  }
};
</script>
<style lang="less" scoped>
.search-form {
  font-size: 14px;
  color: #000;
  display: inline-block;
  .el-form-item {
    margin-right: 10px;
  }
}
</style>
