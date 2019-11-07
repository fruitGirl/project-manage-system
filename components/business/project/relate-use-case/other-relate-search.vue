<template>
  <el-form
    class="search-form"
    size="small"
    :inline="true"
    :model="projectFormData"
  >
    <el-form-item>
      <pm-remote-search
        v-model="demandIds"
        :action="searchAction"
        :field-text="fieldText"
        :placeholder="placeholder"
        :is-multiple="true"
        :parse-structure="handleParseStructure"
        @change="handleChange"
      />
    </el-form-item>
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
import PmRemoteSearch from '@/components/common/pm-remote-search.vue';
import PmRemoteSelect from '@/components/common/pm-remote-select.vue';
const { mapState } = createNamespacedHelpers('project/test-sheet-detail');
export default {
  components: {
    PmRemoteSelect,
    PmRemoteSearch
  },
  props: {
    placeholder: {
      type: String,
      default: '请输入关键词'
    },
    action: {
      // 请求url
      type: [String, Array],
      default: ''
    },
    searchAction: {
      // 请求url
      type: String,
      default: ''
    },
    fieldText: {
      type: String,
      default: 'userIdAndNickNameMap'
    }
  },
  data() {
    return {
      demandIds: [],
      projectFormData: {
        status: null,
        myExecuted: false,
        myCreated: false
      }
    };
  },
  computed: {
    ...mapState(['options'])
  },
  methods: {
    handleChange(val) {
      this.$emit('change', {
        needFileds: this.projectFormData,
        demandIds: this.demandIds
      });
    },
    handleParseStructure(data, fieldText) {
      const needData = data[fieldText].map(res => {
        return {
          label: res.title,
          value: res.id
        };
      });
      return needData;
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
