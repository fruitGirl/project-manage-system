<template>
  <div class="use-case-edit-right">
    <el-form
      ref="formRef"
      label-width="100px"
      :rules="rules"
      :model="formModel"
    >
      <el-row class="form-wrap">
        <el-col :span="12">
          <el-form-item label="用例类型" prop="type">
            <pm-remote-select
              v-model="formModel.type"
              :need-all-opt="false"
              :is-class="true"
              :is-transparent-border="false"
              :action="TEST_CASE_STATUS_URL"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="优先级" prop="priority">
            <el-select v-model="formModel.priority" placeholder="请选择">
              <el-option
                v-for="item in prioritys"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属产品" prop="productId">
            <el-select
              v-model="formModel.productId"
              placeholder="请选择"
              @change="changeProduct"
            >
              <el-option
                v-for="item in productEnums"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属模块" prop="moduleId">
            <el-cascader
              v-model="formModel.moduleId"
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
              placeholder="请选择模块"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="关联需求" prop="demandId">
            <pm-remote-select
              v-model="formModel.demandId"
              :clearable="true"
              :need-all-opt="false"
              :is-transparent-border="false"
              :is-class="true"
              :action="
                formModel.productId
                  ? `${REQUIREMENT_BELONE_PRODUCT_URL}?productId=${formModel.productId}`
                  : ''
              "
              :parse-structure="parseModuleStructure"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否自动化" prop="automation">
            <el-radio-group v-model="formModel.automation">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col v-if="formModel.automation" :span="12">
          <el-form-item label="自动化状态" prop="automationStatus">
            <pm-remote-select
              v-model="formModel.automationStatus"
              :need-all-opt="false"
              :is-transparent-border="false"
              :action="AUTOMATION_TYPE_URL"
            />
          </el-form-item>
        </el-col>
        <el-col v-if="formModel.automation" :span="12">
          <el-form-item label="开发人" prop="developer">
            <pm-remote-search
              v-model="formModel.developer"
              :action="ALL_USER_URL"
              placeholder="请输入花名"
              :parse-structure="getUsers"
              :default-option="developerDefaultOptions"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {
  TEST_CASE_STATUS_URL,
  MODULE_BELONE_PRODUCT_URL,
  REQUIREMENT_BELONE_PRODUCT_URL,
  ALL_USER_URL,
  AUTOMATION_TYPE_URL
} from '@/services/common-config';
import { mapGetters, mapActions, mapState } from 'vuex';
import PmRemoteSelect from '@/components/common/pm-remote-select.vue';
import { PRIORITY, MIDDLE_PRIORITY } from '@/constants/common/config';
import { getCurDependenceType, PRODUCT_SELECT_TYPE } from '@/constants/layout';
import PmRemoteSearch from '@/components/common/pm-remote-search.vue';

export default {
  components: {
    PmRemoteSelect,
    PmRemoteSearch
  },
  props: {
    formData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      ALL_USER_URL, // 实时查询人员接口
      AUTOMATION_TYPE_URL, // 自动化状态
      prioritys: PRIORITY, // 优先级枚举值
      formModel: { // 输入框值
        type: '', // 用例类型
        moduleId: '', // 模块id
        demandId: '', // 需求id
        automation: false, // 是否自动化
        priority: MIDDLE_PRIORITY, // 设置默认的优先级-中
        productId: getCurDependenceType() === PRODUCT_SELECT_TYPE
            ? this.$route.query.dependenceId
            : '',
      },
      rules: { // 校验规则
        type: [{ required: true, message: '请选择' }],
        productId: [{ required: true, message: '请选择' }],
        automationStatus: [{ required: true, message: '请选择' }],
      },
      REQUIREMENT_BELONE_PRODUCT_URL, // 所属需求
      TEST_CASE_STATUS_URL, // 测试类型
      MODULE_BELONE_PRODUCT_URL, // 所属模块
      developerDefaultOptions: [], // 初始化的开发人集合
    };
  },
  computed: {
    ...mapGetters('common-config', ['productEnums']),
    ...mapState('common-config', ['productByModuleTree'])
  },
  created() {
    if (process.client) {
      // 获取产品下拉数据
      this.getProducts();
    }
  },
  methods: {
    ...mapActions('common-config', ['getProducts', 'getProductByModuleTree']),

    // 修改产品，获取新的模块数据
    changeProduct(val) {
      this.getProductByModuleTree({ productId: val });
    },

    // 获取表单数据
    async getData() {
      const validateResult = await this.$refs.formRef.validate();
      if (validateResult) {
        return this.formModel;
      }
    },

    // 设置表单数据
    setData(data) {
      const { productId, moduleId, demandId, priority, type, automation, automationStatus = {}, developer, developerName } = data;
      productId && this.getProductByModuleTree({ productId });
      this.formModel = {
        productId,
        moduleId,
        demandId,
        priority,
        type,
        automation,
        automationStatus: automationStatus.name,
        developer
      };
      this.developerDefaultOptions = developer
        ? [{ label: developerName, value: developer }]
        : [];
    },

    // 重置表单数据
    resetData() {
      this.$refs.formRef.resetFields();
      const productId =
        getCurDependenceType() === PRODUCT_SELECT_TYPE
          ? this.$route.query.dependenceId
          : '';
      productId && this.getProductByModuleTree({ productId });
      this.developerDefaultOptions = [];
      this.formModel = {
        automation: false, // 是否自动化
        priority: MIDDLE_PRIORITY, // 设置默认的优先级-中
        productId
      };
    },

    // 解析获取人员花名结构
    getUsers(data) {
      const { userList } = data;
      const combineUsers = userList.map(i => {
        const { userId, nickName } = i;
        return {
          label: nickName,
          value: userId
        };
      });
      return combineUsers;
    },

    // 解析模块数据结构
    parseModuleStructure: data => {
      return data.demandList.map(i => {
        const { id, title } = i;
        return {
          label: title,
          value: id
        };
      });
    },
  }
};
</script>

<style lang="less" scoped>
.use-case-edit-right {
  .el-select,
  .el-input-number,
  .el-cascader,
  .el-input__inner,
  .el-date-editor {
    width: 100% !important;
  }
}
</style>
