<template>
  <div class="pm-test-form">
    <el-form
      ref="form"
      size="small"
      label-width="100px"
      :model="testForm"
      :rules="rules"
    >
    <el-row :gutter="64">
      <el-col :span="12">
         <el-form-item label="所属产品" prop="productId">
          <el-select
            v-model="testForm.productId"
            filterable
            placeholder="请选择"
            @change="handleChange($event, 'product')"
          >
            <el-option
              v-for="item in products"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属项目">
          <el-select
            v-model="testForm.projectId"
            filterable
            placeholder="请选择"
            @change="handleChange($event, 'project')"
          >
            <el-option
              v-for="item in projectEnums"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起止时间" prop="timeLine">
          <el-date-picker
            v-model="testForm.timeLine"
            popper-class="pm-date-picker"
            type="datetimerange"
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :default-time="['09:30:00', '18:30:00']"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="所属模块">
          <el-cascader
            v-model="testForm.moduleId"
            :props="{
              emitPath: false,
              children: 'subModuleInfo',
              label: 'name',
              value: 'id',
              checkStrictly: true
            }"
            :options="productByModuleTree"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="优先级">
          <el-select v-model="testForm.priority" filterable placeholder="请选择">
            <el-option
              v-for="item in prioritys"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人">
          <el-select v-model="testForm.manager" filterable placeholder="请选择">
            <el-option
              v-for="item in testFormUsers"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <!-- 版本的代码，后期可能有用 -->
      <!-- <el-form-item label="版本">
        <el-select
          v-model="testForm.projectVersionId"
          filterable
          placeholder="请选择"
        >
          <el-option
            v-for="item in projectVersionEnums"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { RULES } from '@/constants/project/editor-test';
import { PRIORITY } from '@/constants/common/config';
const { mapActions, mapGetters, mapState } = createNamespacedHelpers(
  'common-config'
);
export default {
  props: {
    forms: {
      type: Object,
      default: () => {}
    },
    projectId: {
      type: [String, Number],
      default: ''
    },
    productId: {
      type: [String, Number],
      default: ''
    },
    isTestModule: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      rules: RULES,
      testForm: {
        productId: this.productId,
        moduleId: '',
        projectId: this.projectId,
        // projectVersionId: '',
        timeLine: '',
        manager: '',
        priority: 3
      },
      prioritys: PRIORITY
    };
  },
  computed: {
    ...mapGetters([
      'productEnums',
      'projectEnums',
      'modulesByProductEnums',
      'projectVersionEnums',
      'productsByProjectEnums'
    ]),
    ...mapState(['testFormUsers', 'productByModuleTree']),
    products() {
      if (this.isTestModule) return this.productEnums;
      return this.productsByProjectEnums;
    }
  },
  watch: {
    forms: {
      // 回填数据
      handler(val) {
        const {
          productId,
          moduleId,
          projectId,
          // projectVersionId,
          manager,
          priority,
          gmtEstimateStart = '',
          gmtEstimateEnd = ''
        } = val;
        if (productId) this.getProductByModuleTree({ productId });
        // if (projectId) this.getProjectVersion({ projectId });
        if (manager) this.testFormAssignPerson({ productId, projectId });
        this.testForm = {
          ...this.testForm,
          productId,
          moduleId,
          projectId,
          // projectVersionId,
          manager,
          priority,
          timeLine: [gmtEstimateStart, gmtEstimateEnd]
        };
      },
      deep: true
      // immediate: true
    }
  },

  created() {
    if (this.isTestModule) {
      this.getProducts();
    } else {
      this.getProductsByProject({ projectId: this.$route.query.dependenceId });
    }
    this.getProjects();
    this.testFormAssignPerson({
      productId: this.productId,
      projectId: this.projectId
    });
  },
  methods: {
    ...mapActions([
      'getProducts',
      'getProjects',
      'getProductByModuleTree',
      // 'getProjectVersion',
      'testFormAssignPerson',
      'getProductsByProject'
    ]),

    // 获取数据
    getFormData() {
      let formData = false;
      this.$refs.form.validate(valid => {
        if (valid) {
          const { timeLine } = this.testForm;
          const gmtEstimateStart = timeLine ? timeLine[0] : '';
          const gmtEstimateEnd = timeLine ? timeLine[1] : '';
          formData = {
            ...this.testForm,
            gmtEstimateStart,
            gmtEstimateEnd,
          };
          delete formData.timeLine;
        }
      });
      return formData;
    },

    // 产品或者项目改变
    handleChange(val, name) {
      if (name === 'product') {
        this.getProductByModuleTree({ productId: val });
        this.testFormAssignPerson({
          productId: val,
          projectId: this.testForm.projectId
        });
      } else {
        // this.getProjectVersion({ projectId: val });
        this.testFormAssignPerson({
          productId: this.testForm.productId,
          projectId: val
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
@deep: ~'>>>';

.pm-test-form {
  .el-range-editor--small.el-input__inner {
    width: 100%;
  }
  @{deep} .el-date-editor .el-range-separator {
    padding: 0;
  }
  .el-cascader,
  .el-select {
    width: 100%;
  }
}
</style>
