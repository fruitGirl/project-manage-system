/*
 * @Description: 测试用例列表-基本查询
 * @Author: danding
 * @Date: 2019-06-20 17:03:26
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 15:43:52
*/

<template>
  <div class="search-header">
    <el-button
      class="btn-blue"
      type="primary"
      @click="displayUseCaseDrawer({ payload: true })"
      >+ 新增用例</el-button
    >
    <pm-separate :is-vertical="false" :size="5" />
    <el-select
      placeholder="批量操作"
      :value="selectedBatchOpt"
      style="width: 120px;"
      @change="changeBatchOperate"
    >
      <el-option
        v-for="item in BATCH_OPERATE_CONFIG"
        :key="item.label"
        :disabled="!!!selectedRows.length"
        :label="item.label"
        :value="item.func"
      />
    </el-select>
    <pm-separate :is-vertical="false" :size="5" />
    <el-cascader
      v-model="formModel.moduleId"
      clearable
      style="width: 150px;"
      :options="productByModuleTree"
      :props="{
        expandTrigger: 'hover',
        label: 'name',
        value: 'id',
        children: 'subModuleInfo',
        emitPath: false,
        checkStrictly: true
      }"
      placeholder="请选择模块"
      @change="submitNormalForm"
    />
    <div class="more-filter">
      <pm-more-filter :settings="SEARCH_CONFIG" @onSubmit="handleMoreSubmit" />
    </div>
    <el-form class="search-form" :inline="true">
      <el-form-item>
        <pm-remote-select
          v-model="formModel.type"
          :action="TEST_CASE_STATUS_URL"
          all-opt-text="全部类型"
          @change="submitNormalForm"
        />
      </el-form-item>
      <el-form-item>
        <pm-remote-select
          v-model="formModel.executeResult"
          :action="TEST_CASE_STATE_URL"
          all-opt-text="全部状态"
          @change="submitNormalForm"
        />
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="formModel.myExecuted" @change="submitNormalForm"
          >我最后执行的</el-checkbox
        >
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="formModel.myCreated" @change="submitNormalForm"
          >我创建的</el-checkbox
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import PmMoreFilter from '@/components/common/pm-more-filter.vue';
import {
  SEARCH_CONFIG,
  BATCH_OPERATE_CONFIG
} from '@/constants/test/use-case-list';
import {
  createNamespacedHelpers,
  mapActions as rootMapActions,
  mapState as rootMapState
} from 'vuex';
import {
  TEST_CASE_STATUS_URL,
  TEST_CASE_STATE_URL
} from '@/services/common-config';
import PmRemoteSelect from '@/components/common/pm-remote-select';
import { decomposeDateRange } from '@/utils/common';
import PmSeparate from '@/components/common/pm-separate';

const {
  mapActions,
  mapState,
  mapMutations,
  mapGetters
} = createNamespacedHelpers('test/use-case-list');

export default {
  components: {
    PmMoreFilter,
    PmRemoteSelect,
    PmSeparate
  },
  data() {
    return {
      productId: this.$route.query.dependenceId,
      SEARCH_CONFIG, // 更多查询配置
      BATCH_OPERATE_CONFIG, // 批量操作配置
      TEST_CASE_STATUS_URL, // 测试类型接口
      TEST_CASE_STATE_URL, // 测试状态接口
      selectedBatchOpt: '', // 选择的批量操作值
      formModel: {
        myCreated: false, // 我创建的
        executeResult: undefined, // 项目状态
        type: undefined, // 项目类型
        myExecuted: false, // 我最后执行的
        moduleId: undefined // 选择的模块
      }
    };
  },
  computed: {
    ...mapState(['selectedRows']),
    ...mapGetters(['selectedRowKeys']),
    ...rootMapState('common-config', ['productByModuleTree'])
  },
  created() {
    if (process.client) {
      this.getProductByModuleTree({ productId: this.productId }); // 获取模块
    }
  },
  methods: {
    ...rootMapActions('common-config', ['getProductByModuleTree']),
    ...mapActions(['handleSubmit', 'displayUseCaseDrawer', 'executeUseCase']),
    ...mapMutations(['displayUseCaseDrawer']),
    changeBatchOperate(func) {
      func && this[func]();
    },
    batchHandle() {
      // 批量执行
      this.executeUseCase({ testCaseId: this.selectedRows[0].id });
    },
    batchCreateTest() {
      // 批量新增测试单
      this.$PMRouter.push({
        name: 'test-editor-test',
        query: { testCaseIdList: this.selectedRowKeys }
      });
    },
    batchCreateKit() {
      // 批量新增套件
      this.$PMRouter.push({
        name: 'test-editor-kit',
        query: { testCaseIdList: this.selectedRowKeys }
      });
    },
    submitNormalForm() {
      // 查询
      this.handleSubmit(this.formModel);
    },
    handleMoreSubmit(val) {
      const { GmtCreate } = val;
      this.handleSubmit({
        ...val,
        ...decomposeDateRange({ GmtCreate })
      });
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
