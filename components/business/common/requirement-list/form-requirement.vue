/*
 * @Description: 提需求右边form表单
 * @Author: moran
 * @Date: 2019-07-09 14:08:40
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-06 10:23:52
 */

<template>
  <div class="pm-test-form">
    <el-form
      ref="form"
      size="small"
      label-width="80px"
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
        <el-form-item label="指派给谁">
          <pm-remote-search
              v-model="testForm.assignedPerson"
              :action="ALL_USER_URL"
              :parse-structure="handleParseStructure"
              :default-option="demandDefault"
            />
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
      </el-col>
      <el-col :span="12">
        <el-form-item label="所属模块">
          <el-cascader
            v-model="testForm.moduleId"
            :props="{
              children: 'subModuleInfo',
              label: 'name',
              value: 'id',
              checkStrictly: true,
              emitPath: false,
            }"
            :options="productByModuleTree"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="需求来源">
          <pm-remote-select
            v-model="testForm.source"
            :action="DEMAND_ORIGIN_URL"
            :is-transparent-border="false"
            all-opt-text=""
          ></pm-remote-select>
        </el-form-item>
        <el-form-item label="起止时间">
          <el-date-picker
            v-model="testForm.timeLine"
            popper-class="pm-date-picker"
            type="datetimerange"
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :default-time="['09:30:00', '18:30:00']"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    </el-form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import PmRemoteSelect from '@/components/common/pm-remote-select.vue';
import PmRemoteSearch from '@/components/common/pm-remote-search.vue';
import { RULES } from '@/constants/product/edit-requirement';
import { PRIORITY } from '@/constants/common/config';
import { DEMAND_ORIGIN_URL, ALL_USER_URL } from '@/services/common-config';
import { transArrs } from '@/utils/common';
const { mapActions, mapGetters, mapState } = createNamespacedHelpers(
  'common-config'
);
export default {
  components: {
    PmRemoteSelect,
    PmRemoteSearch
  },
  props: {
    forms: {
      type: Object,
      default: () => {}
    },
    productId: {
      type: [String, Number],
      default: ''
    },
    initFillData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      rules: RULES,
      DEMAND_ORIGIN_URL,
      ALL_USER_URL,
      testForm: {
        productId: this.productId,
        moduleId: '',
        timeLine: '',
        assignedPerson: '',
        priority: 3,
        source: undefined
      },
      demandDefault: [],
      prioritys: PRIORITY
    };
  },
  computed: {
    ...mapGetters(['productEnums', 'productsByProjectEnums']),
    ...mapState(['productByModuleTree']),
    products() {
      if (this.productId) return this.productEnums;
      return this.productsByProjectEnums;
    }
  },
  watch: {
    forms: {
      handler(val) {
        const {
          productId = this.productId,
          moduleId,
          source,
          assignedPerson,
          priority,
          gmtEstimateStart = '',
          gmtEstimateEnd = '',
          nickName
        } = val;
        const soursceId = (source && source.name) || undefined;
        if (productId) this.getProductByModuleTree({ productId });
        if (assignedPerson) this.demandDefault = [{ label: nickName, value: assignedPerson }];
        this.testForm = {
          ...this.testForm,
          productId,
          moduleId,
          assignedPerson,
          source: soursceId,
          priority,
          timeLine: [gmtEstimateStart, gmtEstimateEnd]
        };
      },
      deep: true,
      immediate: true
    },
    initFillData: {
      handler(val) {
        if (!this.testForm.moduleId && val && val.moduleId) {
          this.testForm.moduleId = val.moduleId;
        }
      },
      immediate: true
    }
  },

  created() {
    if (this.productId) {
      this.getProducts();
      this.getProductByModuleTree({ productId: this.productId });
    } else {
      this.getProductsByProject({ projectId: this.$route.query.dependenceId });
    }
  },
  methods: {
    ...mapActions([
      'getProducts',
      'getProductByModuleTree',
      'getProductsByProject'
    ]),
    handleParseStructure(data) {
      return transArrs(data.userList, 'nickName', 'userId');
    },
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
    handleChange(val, name) {
      this.getProductByModuleTree({ productId: val });
    },
    resetData() {
      this.$refs.form.resetFields();
      this.demandDefault = [];
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
