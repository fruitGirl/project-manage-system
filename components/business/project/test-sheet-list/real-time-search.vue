<template>
  <el-form
    class="search-form"
    size="small"
    :inline="true"
    :model="projectFormData"
  >
    <el-form-item v-if="searchType === 1">
      <el-cascader
        v-model="projectFormData.productArr"
        clearable
        filterable
        class="cascader"
        size="small"
        :options="options"
        @change="handleCascaderChange"
      ></el-cascader>
    </el-form-item>
    <el-form-item v-if="searchType === 2">
      <pm-filterable-select
        :placeholder="placeholder"
        :multiple="true"
        :filter-function="handleOption"
      />
    </el-form-item>
    <el-form-item>
      <pm-remote-select
        v-model="projectFormData.status"
        :action="action"
        @change="handleChange"
      ></pm-remote-select>
    </el-form-item>
    <el-form-item v-if="isType" style="margin-left:-16px">
      <pm-remote-select
        v-model="projectFormData.typeStatus"
        :action="typeAction"
        @change="handleChange"
      ></pm-remote-select>
    </el-form-item>

    <el-form-item>
      <el-checkbox v-model="projectFormData.myCreated" @change="handleChange"
        >我创建的</el-checkbox
      >
    </el-form-item>
    <el-form-item v-if="isRelate">
      <el-checkbox v-model="projectFormData.myRelated" @change="handleChange"
        >与我相关</el-checkbox
      >
    </el-form-item>
    <el-form-item v-if="!isRelate">
      <el-checkbox v-model="projectFormData.myManager" @change="handleChange"
        >我负责的</el-checkbox
      >
    </el-form-item>
  </el-form>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import PmFilterableSelect from '@/components/common/pm-filterable-select.vue';
import PmRemoteSelect from '@/components/common/pm-remote-select.vue';
const { mapState } = createNamespacedHelpers('project/test-sheet-detail');
export default {
  components: {
    PmFilterableSelect,
    PmRemoteSelect
  },
  props: {
    isType: {
      type: Boolean,
      default: false
    },
    typeLists: {
      type: Array,
      default: () => []
    },
    searchType: {
      type: Number,
      default: 1000
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    action: {
      // 请求url
      type: [String, Array],
      default: ''
    },
    typeAction: {
      // 请求url
      type: String,
      default: ''
    },
    isRelate: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      projectFormData: {
        status: null,
        typeStatus: this.isType ? '全部' : undefined,
        myCreated: this.isRelate ? undefined : false,
        myRelated: this.isRelate ? false : undefined,
        productArr: this.searchType === 1 ? [] : undefined
      }
    };
  },
  computed: {
    ...mapState(['options'])
  },
  methods: {
    handleChange() {
      this.$emit('change', this.projectFormData);
    },
    handleTypeChange() {
      this.$emit('change', this.projectFormData);
    },
    handleCascaderChange() {
      this.$emit('change', this.projectFormData);
    },
    handleOption() {}
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
