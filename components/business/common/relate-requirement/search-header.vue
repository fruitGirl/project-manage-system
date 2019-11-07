/*
 * @Description: 关联需求-基本查询
 * @Author: moran
 * @Date: 2019-06-20 17:03:26
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 15:39:38
 */

<template>
  <div class="search-header">
    <div class="more-filter">
      <pm-more-filter :settings="settings" @onSubmit="handleSubmitMoreForm" />
    </div>
    <el-form class="search-form" :inline="true">
      <el-form-item>
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
      </el-form-item>
      <el-form-item>
        <pm-remote-select
          v-model="formModel.status"
          :is-class="true"
          all-opt-text="全部状态"
          :action="DEMAND_STATUS_URL"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="formModel.myCreate" @change="handleChange"
          >我创建的</el-checkbox
        >
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="formModel.myCharge" @change="handleChange"
          >指派给我的</el-checkbox
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
import PmMoreFilter from '@/components/common/pm-more-filter.vue';
import PmRemoteSelect from '@/components/common/pm-remote-select.vue';
import { SEARCH_CONFIG } from '@/constants/common/requirement-list';
import { DEMAND_STATUS_URL } from '@/services/common-config';
import { decomposeDateRange } from '@/utils/common';
const { mapState, mapActions } = createNamespacedHelpers('common-config');

export default {
  components: {
    PmMoreFilter,
    PmRemoteSelect
  },
  data() {
    return {
      settings: SEARCH_CONFIG,
      DEMAND_STATUS_URL,
      productArr: [],
      formModel: {
        status: null,
        myCreate: false,
        myCharge: false
      }
    };
  },
  computed: {
    ...mapState(['productAndModuleTree'])
  },
  created() {
    this.getProductAndModuleTree({ projectId: this.$route.query.dependenceId });
  },
  methods: {
    ...mapActions(['getProductAndModuleTree']),
    handleSubmitMoreForm(val) {
      const { GmtCreate, GmtEstimateStart, GmtDeadline } = val;
      const payload = {
        ...val,
        ...decomposeDateRange({
          GmtCreate,
          GmtEstimateStart,
          GmtDeadline
        })
      };
      this.$emit('submit', payload);
    },
    handleChange() {
      this.$emit('submit', this.formModel);
    },

    handleCascaderChange() {
      const len = this.productArr.length;
      Object.assign(this.formModel, {
        productIds: len > 0 ? this.productArr[0] : undefined,
        moduleIds: len >= 2 ? this.productArr[len - 1] : undefined
      });
      this.$emit('submit', this.formModel);
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
