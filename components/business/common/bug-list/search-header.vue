/*
 * @Description: bug列表-基本查询
 * @Author: yaochen
 * @Date: 2019-06-20 17:03:26
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 15:38:39
 */

<template>
  <div class="search-header">
    <div v-if="!hasDependenceId" class="product-filter-container">
      <el-form class="search-form" :inline="true">
        <el-form-item label="所属产品:">
          <pm-remote-select
            v-model="form.productId"
            placeholder="请选择"
            :action="ALL_PRODUCTS_URL"
            :parse-structure="productParseStructure"
            :is-transparent-border="false"
            @change="clearByProduct"
          ></pm-remote-select>
        </el-form-item>
        <el-form-item label="所属模块:">
          <el-cascader
            v-model="form.moduleId"
            :options="productByModuleTree"
            clearable
            :props="{
              emitPath: false,
              expandTrigger: 'hover',
              label: 'name',
              value: 'id',
              children: 'subModuleInfo',
              checkStrictly: true
            }"
            filterable
            placeholder="请选择"
          />
        </el-form-item>
        <el-form-item label="所属项目:">
          <el-select
            v-model="form.projectId"
            placeholder="请选择"
            @change="clearByProject"
          >
            <el-option
              v-for="item in localProjectByProduct"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button class="btn-blue" type="primary" @click="clickHandler"
        >+ 提BUG</el-button
      >
    </div>
    <el-button v-else class="btn-blue" type="primary" @click="clickHandler"
      >+ 提BUG</el-button
    >
    <div class="more-filter">
      <pm-more-filter :settings="settings" @onSubmit="handleSubmitMoreForm" />
    </div>
    <el-form class="search-form" :inline="true">
      <el-form-item>
        <pm-remote-select
          v-model="form.type"
          all-opt-text="全部类型"
          placeholder="请选择类型"
          :action="BUG_TYPE_URL"
        ></pm-remote-select>
      </el-form-item>
      <el-form-item>
        <pm-remote-select
          v-model="form.status"
          all-opt-text="全部状态"
          placeholder="请选择状态"
          :action="BUG_STATUS_URL"
        ></pm-remote-select>
      </el-form-item>
      <el-form-item>
        <pm-remote-select
          v-model="form.severity"
          all-opt-text="全部程度"
          placeholder="请选择程度"
          :action="BUG_SEVERITY_URL"
        ></pm-remote-select>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="form.myAssigned">指派给我的</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="form.mySolved">我处理的</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="form.myCreated">我创建的</el-checkbox>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import PmMoreFilter from '@/components/common/pm-more-filter.vue';
import { SEARCH_CONFIG } from '@/constants/common/bug-list';
import PmRemoteSelect from '@/components/common/pm-remote-select';
import {
  ALL_PRODUCTS_URL,
  BUG_STATUS_URL,
  BUG_TYPE_URL,
  BUG_SEVERITY_URL
} from '@/services/common-config';
import { createNamespacedHelpers } from 'vuex';
const {
  mapActions: commonMapActions,
  mapState: commonMapState
} = createNamespacedHelpers('common-config');
let localForm = {};
export default {
  components: {
    PmMoreFilter,
    PmRemoteSelect
  },
  props: {
    hasDependenceId: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      ALL_PRODUCTS_URL,
      BUG_STATUS_URL,
      BUG_TYPE_URL,
      BUG_SEVERITY_URL,
      settings: SEARCH_CONFIG,
      form: {
        productId: '',
        moduleId: '',
        projectId: '',
        type: null,
        status: null,
        severity: null,
        myAssigned: '',
        mySolved: '',
        myCreated: ''
      }
    };
  },
  computed: {
    ...commonMapState(['productByModuleTree', 'projectByProduct']),
    productId() {
      return this.form.productId;
    },
    projectId() {
      return this.form.projectId;
    },
    localProjectByProduct() {
      return this.transToOption(this.projectByProduct);
    }
  },
  watch: {
    productId(val) {
      if (val) {
        this.getProductByModuleTree({
          productId: val
        });
        this.getProjectByProduct({
          productId: val
        });
      }
    },
    form: {
      handler(val) {
        this.query();
      },
      deep: true
    }
  },
  created() {
    if (!this.hasDependenceId) {
      this.form.productId = this.$route.query.dependenceId;
    }
  },
  methods: {
    ...commonMapActions(['getProductByModuleTree', 'getProjectByProduct']),
    clickHandler() {
      this.$emit('btnClicked');
    },
    clearByProduct(val) {
      if (val) {
        this.form.moduleId = '';
        this.form.demandId = '';
        this.form.projectId = '';
      }
    },
    transToOption(arr) {
      return arr.map(item => ({
        value: item.id,
        label: item.name
      }));
    },
    clearByProject(val) {
      if (val) {
        this.form.projectVersionId = '';
        this.form.taskId = '';
      }
    },
    productParseStructure(data) {
      let needData = [];
      needData = this.transToOption(data.products);
      return needData;
    },
    query() {
      if (localForm.createTime && localForm.createTime.length) {
        localForm.minGmtCreate = localForm.createTime[0];
        localForm.maxGmtCreate = localForm.createTime[1];
      }
      if (localForm.endTime && localForm.endTime.length) {
        localForm.minGmtDeadline = localForm.endTime[0];
        localForm.maxGmtDeadline = localForm.endTime[1];
      }
      this.$emit('query', {
        ...this.form,
        myAssigned: !!this.form.myAssigned,
        mySolved: !!this.form.mySolved,
        myCreated: !!this.form.myCreated,
        ...localForm
      });
    },
    handleSubmitMoreForm(val) {
      localForm = val;
      this.query();
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
<style lang="less">
.product-filter-container {
  height: 50px;
  .el-form-item {
    margin-bottom: 0px;
  }
}
</style>
