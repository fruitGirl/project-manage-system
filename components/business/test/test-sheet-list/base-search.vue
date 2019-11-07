<template>
  <el-form
    class="search-form"
    size="small"
    :inline="true"
    :model="projectFormData"
  >
    <el-form-item class="module-distance">
      <el-cascader
        v-model="moduleArr"
        clearable
        filterable
        class="cascader"
        size="small"
        placeholder="请选择模块名称"
        :options="productByModuleTree"
        :props="{
          children: 'subModuleInfo',
          label: 'name',
          value: 'id',
          checkStrictly: true
        }"
        @change="handleCascaderChange"
      ></el-cascader>
    </el-form-item>
    <el-form-item>
      <pm-remote-select
        v-model="projectFormData.projectIds"
        placeholder="请选择项目名称"
        :is-transparent-border="false"
        :action="`${PROJECT_BY_PRODUCT}?productId=${productId}`"
        :parse-structure="handleParseStructure"
        :filterable="true"
        @change="handleChange"
      ></pm-remote-select>
    </el-form-item>
    <el-form-item>
      <pm-remote-select
        v-model="projectFormData.status"
        :action="TEST_FORM_STATUS_URL"
        @change="handleChange"
      ></pm-remote-select>
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="projectFormData.myCreated" @change="handleChange"
        >我创建的</el-checkbox
      >
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="projectFormData.myManager" @change="handleChange"
        >我负责的</el-checkbox
      >
    </el-form-item>
  </el-form>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import {
  TEST_FORM_STATUS_URL,
  PROJECT_BY_PRODUCT
} from '@/services/common-config';
import PmRemoteSelect from '@/components/common/pm-remote-select.vue';
import { transArrs } from '@/utils/common';
const { mapActions, mapState } = createNamespacedHelpers('common-config');
export default {
  components: {
    PmRemoteSelect
  },
  data() {
    return {
      TEST_FORM_STATUS_URL,
      PROJECT_BY_PRODUCT,
      productId: this.$route.query.dependenceId,
      casoptions: [],
      projectFormData: {
        status: null,
        myCreated: false,
        myManager: false
      },
      moduleArr: []
    };
  },
  computed: {
    ...mapState(['productByModuleTree'])
  },
  created() {
    this.getProductByModuleTree({ productId: this.productId });
  },
  methods: {
    ...mapActions(['getProductByModuleTree']),
    handleParseStructure(data) {
      return transArrs(data.projectList, 'name', 'id');
    },
    handleCascaderChange() {
      const len = this.moduleArr.length;
      Object.assign(this.projectFormData, {
        moduleId: len >= 1 ? this.moduleArr[len - 1] : undefined
      });
      this.$emit('change', this.projectFormData);
    },
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
  float: left;
  .el-form-item {
    margin-right: 20px;
  }
  .module-distance {
    margin-left: 20px;
  }
  .el-checkbox {
    color: #000;
  }
}
</style>
