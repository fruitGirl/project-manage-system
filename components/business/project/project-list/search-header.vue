/*
 * @Description: 项目列表-头部搜索
 * @Author: danding
 * @Date: 2019-06-24 16:54:19
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 15:40:30
 */

<template>
  <div class="search-header">
    <el-button
      class="btn-blue"
      size="mini"
      type="primary"
      @click="goCreateProject"
      >+ 新增项目</el-button
    >
    <div class="more-filter">
      <pm-more-filter :settings="settings" @onSubmit="submitMoreForm" />
    </div>
    <el-form class="search-form" :inline="true">
      <el-form-item>
        <pm-remote-select
          v-model="formModel.status"
          :is-class="true"
          all-opt-text="全部状态"
          :action="PROJECT_STATUS_URL"
          @change="submitNormalForm()"
        />
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="formModel.myCreated" @change="submitNormalForm()"
          >我创建的</el-checkbox
        >
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="formModel.myRelated" @change="submitNormalForm()"
          >与我相关</el-checkbox
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import PmMoreFilter from '@/components/common/pm-more-filter.vue';
import { FORM_SETTINGS } from '@/constants/project/project-list';
import PmRemoteSelect from '@/components/common/pm-remote-select.vue';
import { PROJECT_STATUS_URL } from '@/services/common-config';
import { decomposeDateRange } from '@/utils/common';

export default {
  components: {
    PmMoreFilter,
    PmRemoteSelect
  },
  data() {
    return {
      settings: FORM_SETTINGS,
      PROJECT_STATUS_URL: PROJECT_STATUS_URL,
      formModel: {
        myRelated: false, // 我相关的
        myCreated: false, // 我创建的
        status: null // 项目状态
      }
    };
  },
  methods: {
    submitNormalForm() {
      this.$emit('handleSubmit', this.formModel);
    },
    submitMoreForm(val) {
      const {
        GmtCreate,
        GmtEstimateStart,
        GmtActualEnd,
        GmtActualStart,
        GmtEstimateEnd
      } = val;
      const payload = {
        ...val,
        ...decomposeDateRange({
          GmtCreate,
          GmtEstimateStart,
          GmtActualEnd,
          GmtActualStart,
          GmtEstimateEnd
        })
      };
      this.$emit('handleSubmit', payload);
    },
    goCreateProject() {
      this.$PMRouter.push('/project/edit-project');
    }
  }
};
</script>

<style lang="less" scoped>
.search-header {
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
  .more-filter {
    float: right;
    margin: 5px 0 0 10px;
    font-size: 14px;
  }
}
</style>
