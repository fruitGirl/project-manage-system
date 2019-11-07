/*
 * @Description: 需求列表-基本查询
 * @Author: moran
 * @Date: 2019-06-20 17:03:26
 * @Last Modified by: moran
 * @Last Modified time: 2019-08-21 12:17:09
 */

<template>
  <div class="search-header">
    <el-button class="btn-blue" type="primary" @click="$emit('add')"
      >+ 提需求</el-button
    >
    <el-button
      v-if="isProjectModule"
      class="btn-white"
      size="mini"
      @click="$PMRouter.push('/project/relate-requirement')"
      >关联需求</el-button
    >
    <el-button
      v-if="isProjectModule"
      class="btn-white"
      size="mini"
      :disabled="disable"
      @click="$emit('cancel')"
      >取消关联</el-button
    >
    <div class="more-filter">
      <pm-more-filter :settings="settings" @onSubmit="handleSubmitMoreForm" />
    </div>
    <el-form class="search-form" :inline="true">
      <el-form-item>
        <el-cascader
          v-if="isProjectModule"
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
            checkStrictly: true,
            expandTrigger: 'hover'
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
      <el-form-item v-if="!isProjectModule">
        <el-checkbox v-model="formModel.needNoModule" @change="handleChange"
          >只看产品</el-checkbox
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
  props: {
    isProjectModule: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      settings: SEARCH_CONFIG,
      DEMAND_STATUS_URL,
      productArr: [],
      projectId: this.$route.query.dependenceId,
      formModel: {
        status: this.isProjectModule ? null : 'WAITING',
        myCreate: false,
        myCharge: false,
        needNoModule: this.isProjectModule ? undefined : false
      }
    };
  },
  computed: {
    ...mapState(['productAndModuleTree'])
  },
  created() {
    if (this.isProjectModule)
      this.getProductAndModuleTree({ projectId: this.projectId });
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
      if (this.isProjectModule) {
        Object.assign(this.formModel, {
          productIds: len > 0 ? this.productArr[0] : undefined,
          moduleIds: len >= 2 ? this.productArr[len - 1] : undefined
        });
      } else {
        Object.assign(this.formModel, {
          productId: len > 0 ? this.productArr[0] : undefined,
          moduleId: len >= 2 ? this.productArr[len - 1] : undefined
        });
      }

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
