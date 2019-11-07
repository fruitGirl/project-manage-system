/*
 * @Description:
 * @Author: yaochen
 * @Date: 2019-07-31 10:48:42
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-01 15:38:31
 */

<template>
  <el-form ref="bugForm" label-width="6rem" :rules="rules" :model="form" class="bug-form">
    <el-row :gutter="64">
      <el-col :span="12">
        <el-form-item label="所属项目:">
          <el-select
            v-model="form.projectId"
            :filterable="true"
            placeholder="请选择"
            @change="clearByProject"
          >
            <el-option
              v-for="item in projectDefaultOptions.length
                ? projectDefaultOptions
                : localProjectByProduct"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指派给:" prop="assignedPerson">
          <pm-remote-select
            v-model="form.assignedPerson"
            placeholder="请选择"
            :filterable="true"
            field-text="labelValueObjects"
            :need-all-opt="false"
            :action="
              form.productId
                ? `${BUG_ASSIGN_URL}?productId=${form.productId}${
                    form.projectId ? '&projectId=' + form.projectId : ''
                  }`
                : ''
            "
            :is-transparent-border="false"
          ></pm-remote-select>
        </el-form-item>
        <el-form-item label="影响版本:">
          <el-select
            v-model="form.projectVersionId"
            :filterable="true"
            placeholder="请选择"
          >
            <el-option
              v-for="item in localProjectVersion"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Bug类型:">
          <pm-remote-select
            v-model="form.type"
            placeholder="请选择"
            :need-all-opt="false"
            :action="BUG_TYPE_URL"
            :is-transparent-border="false"
          ></pm-remote-select>
        </el-form-item>
        <el-form-item label="操作系统:">
          <pm-remote-select
            v-model="form.os"
            :need-all-opt="false"
            placeholder="请选择"
            :action="OS_URL"
            :is-transparent-border="false"
          ></pm-remote-select>
        </el-form-item>
        <el-form-item label="关联需求:">
          <pm-remote-select
            v-model="form.demandId"
            placeholder="请选择"
            clearable
            :need-all-opt="false"
            :is-transparent-border="false"
            :is-class="true"
            :action="
              form.productId
                ? `${REQUIREMENT_BELONE_PRODUCT_URL}?productId=${form.productId}${
                    form.moduleId ? '&moduleId=' + form.moduleId : ''
                  }`
                : ''
            "
            :parse-structure="parseModuleStructure"
          ></pm-remote-select>
        </el-form-item>

        <el-form-item label="关联任务:">
          <pm-remote-select
            v-model="form.taskId"
            placeholder="请选择"
            clearable
            :need-all-opt="false"
            :is-transparent-border="false"
            :is-class="true"
            :action="
              form.projectId ? `${TASK_QUERY_URL}?projectId=${form.projectId}` : ''
            "
            :parse-structure="taskStructure"
          ></pm-remote-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="所属产品:" prop="productId">
          <pm-remote-select
            v-model="form.productId"
            placeholder="请选择"
            :action="isProjectModules ? `${PRODUCT_BY_PROJECT_URL}?projectId=${$route.query.dependenceId}` : ALL_PRODUCTS_URL"
            :filterable="true"
            :parse-structure="productParseStructure"
            :is-transparent-border="false"
            @change="clearByProduct"
          ></pm-remote-select>
        </el-form-item>
        <el-form-item label="所属模块:">
          <el-cascader
            ref="cascader"
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
        <el-form-item label="严重程度:">
          <pm-remote-select
            v-model="form.severity"
            :need-all-opt="false"
            placeholder="请选择"
            :action="BUG_SEVERITY_URL"
            :is-transparent-border="false"
          ></pm-remote-select>
        </el-form-item>
        <el-form-item label="优先级:">
          <el-select v-model="form.priority" placeholder="请选择">
            <el-option
              v-for="item in PRIORITY"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="浏览器:">
          <pm-remote-select
            v-model="form.browser"
            :need-all-opt="false"
            placeholder="请选择"
            :action="BROWSER_URL"
            :is-transparent-border="false"
          ></pm-remote-select>
        </el-form-item>
        <el-form-item label="关联用例:">
          <pm-remote-select
            v-model="form.testCaseId"
            placeholder="请选择"
            clearable
            :need-all-opt="false"
            :is-transparent-border="false"
            :is-class="true"
            :parse-structure="parseModuleStructureCase"
            :action="
              form.productId
                ? `${TEST_CASE_URL}?productId=${form.productId}${
                    form.moduleId ? '&moduleId=' + form.moduleId : ''
                  }`
                : ''
            "
          ></pm-remote-select>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import PmRemoteSelect from '@/components/common/pm-remote-select.vue';
import { PRIORITY } from '@/constants/common/config';
import { BUGREULES } from '@/constants/common/bug-list';
import { createNamespacedHelpers } from 'vuex';
import { transArrs } from '@/utils/common';
import { ALL_PRODUCTS_URL, TEST_CASE_URL, BUG_SEVERITY_URL, BUG_TYPE_URL,
  BUG_ASSIGN_URL,
  OS_URL,
  BROWSER_URL,
  REQUIREMENT_BELONE_PRODUCT_URL,
  TASK_QUERY_URL,
  PRODUCT_BY_PROJECT_URL
} from '@/services/common-config';
const {
  mapActions: commonMapActions,
  mapState: commonMapState
} = createNamespacedHelpers('common-config');
export default {
  components: {
    PmRemoteSelect
  },
  props: {
    isProjectModules: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ALL_PRODUCTS_URL,
      PRODUCT_BY_PROJECT_URL,
      TEST_CASE_URL,
      TASK_QUERY_URL,
      BUG_SEVERITY_URL,
      REQUIREMENT_BELONE_PRODUCT_URL,
      BUG_ASSIGN_URL,
      BUG_TYPE_URL,
      OS_URL,
      BROWSER_URL,
      PRIORITY,
      rules: BUGREULES,
      form: {
        productId: '',
        moduleId: '',
        projectId: '',
        projectVersionId: '',
        severity: 'GENERAL',
        priority: 3,
        assignedPerson: '',
        type: 'CODE_ERROR',
        os: undefined,
        browser: undefined,
        demandId: '',
        testCaseId: '',
        taskId: ''
      },
      projectDefaultOptions: []
    };
  },
  computed: {
    ...commonMapState([
      'productByModuleTree',
      'projectByProduct',
      'projectVersion'
    ]),
    productId() {
      return this.form.productId;
    },
    projectId() {
      return this.form.projectId;
    },
    localProjectByProduct() {
      return this.transToOption(this.projectByProduct);
    },
    localProjectVersion() {
      return this.transToOption(this.projectVersion);
    },
    moduleId() {
      return this.form.moduleId;
    }
  },
  watch: {
    // 产品Id改变后，按产品id获取此产品下的模块树和项目列表
    productId(val) {
      if (val) {
        this.projectDefaultOptions = [];
        this.getProductByModuleTree({
          productId: val
        });
        this.getProjectByProduct({
          productId: val
        });
      }
    },
    // 模块选择后，模块选择框上拉
    moduleId(val) {
      if (val) {
        const cascader = this.$refs.cascader;
        if (cascader.dropDownVisible) {
          cascader.dropDownVisible = false;
        }
      }
    },
    // 项目Id改变时，按项目Id获取项目版本
    projectId(val) {
      if (val) {
        this.getProjectVersion({
          projectId: val
        });
      }
    }
  },
  methods: {
    ...commonMapActions([
      'getProductByModuleTree',
      'getProjectByProduct',
      'getProjectVersion'
    ]),
    // 数据转换
    transArrs,
    // 选择产品后，清空根据产品才能填写的值
    clearByProduct(val) {
      if (val) {
        this.form.moduleId = '';
        this.form.demandId = '';
        this.form.projectId = '';
      }
    },
    // 选择项目后，清空根据项目才能填写的值
    clearByProject(val) {
      if (val) {
        this.form.projectVersionId = '';
        this.form.taskId = '';
      }
    },
    // 数据转换
    transToOption(arr) {
      return arr.map(item => ({
        value: item.id,
        label: item.name
      }));
    },
    // 数据转换
    taskStructure(data) {
      return this.transToOption(data.taskList);
    },
    // 数据转换
    parseModuleStructure(data) {
      return data.demandList.map(i => ({
        label: i.title,
        value: i.id
      }));
    },
    // 数据转换
    parseModuleStructureCase(data) {
      return data.testCaseList.map(i => ({
        label: i.title,
        value: i.id
      }));
    },
    // 数据转换
    productParseStructure(data) {
      let needData = [];
      needData = this.isProjectModules ? this.transToOption(data.productList) : this.transToOption(data.products);
      return needData;
    },
    // 获取formdata
    getFormData() {
      let result = null;
      this.$refs.bugForm.validate(valid => {
        if (valid) {
          result = this.form;
        }
      });
      return result;
    },
    // 设置formdata
    setFormData(formData) {
      const {
        productId = '',
        moduleId = '',
        projectId = '',
        projectVersionId = '',
        severity = 'GENERAL',
        priority = 3,
        assignedPerson = '',
        type = 'CODE_ERROR',
        os = undefined,
        browser = undefined,
        demandId = '',
        taskId = ''
      } = formData;

      this.form = {
        productId,
        moduleId,
        projectId,
        projectVersionId,
        severity,
        priority,
        assignedPerson,
        type,
        os,
        browser,
        demandId,
        taskId
      };
    },
    // 重置form校验
    setFormField() {
      this.$refs.bugForm.resetFields();
    },
    // 重置form
    resetFormData() {
      this.$refs.bugForm.resetFields();
      this.$set(this, 'form', {
        productId: '',
        moduleId: '',
        projectId: '',
        projectVersionId: '',
        severity: 'GENERAL',
        priority: 3,
        assignedPerson: '',
        type: 'CODE_ERROR',
        os: undefined,
        browser: undefined,
        demandId: '',
        taskId: ''
      });
    },
    // 项目回填
    setProjectDefaultOptions(options){
      this.projectDefaultOptions = options;
    }
  }
};
</script>

<style lang="less" scoped>
@deep: ~'>>>';
  .bug-form {
    .el-cascader, .el-select {
      width: 100%;
    }
  }
</style>
