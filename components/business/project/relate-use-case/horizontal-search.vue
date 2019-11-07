<template>
  <el-form
    class="search-form"
    size="small"
    :inline="true"
    :model="projectFormData"
  >
    <el-cascader
      v-model="productArr"
      clearable
      filterable
      class="cascader"
      size="small"
      placeholder="产品名称"
      :options="productAndModuleTree"
      :props="{
        children: 'subModuleInfo',
        label: 'name',
        value: 'id',
        checkStrictly: true
      }"
      @change="handleCascaderChange"
    ></el-cascader>
    <el-form-item>
      <pm-remote-select
        v-model="projectFormData.status"
        :action="action"
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
import { createNamespacedHelpers } from 'vuex';
import PmRemoteSelect from '@/components/common/pm-remote-select.vue';
const { mapState, mapActions } = createNamespacedHelpers('common-config');
export default {
  components: {
    PmRemoteSelect
  },
  props: {
    placeholder: {
      type: String,
      default: '请输入'
    },
    action: {
      // 请求url
      type: [String, Array],
      default: ''
    }
  },
  data() {
    return {
      projectFormData: {
        status: null,
        myCreated: false,
        myExecuted: false
      },
      productArr: []
    };
  },
  computed: {
    ...mapState(['productAndModuleTree'])
  },
  created() {
    this.getProductAndModuleTree();
  },
  methods: {
    ...mapActions(['getProductAndModuleTree']),
    handleChange() {
      this.$emit('change', this.projectFormData);
    },
    handleCascaderChange() {
      const len = this.productArr.length;
      Object.assign(this.projectFormData, {
        productId: len > 0 ? this.productArr[0] : undefined,
        moduleId: len >= 2 ? this.productArr[len - 1] : undefined
      });
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
