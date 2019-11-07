/*
 * @Description: 查询组件
 * @Author: danding
 * @Date: 2019-06-17 10:58:22
 * @Last Modified by: moran
 * @Last Modified time: 2019-08-02 15:23:21
 */

<template>
  <el-form
    ref="searchForm"
    :label-width="labelWidth + 'px'"
    :model="formData"
    label-suffix=":"
    :rules="rules"
  >
    <el-row
      type="flex"
      :class="isShowMore ? 'form-more' : 'form-row'"
      :gutter="20"
    >
      <el-col
        v-for="(item, index) in settings"
        :key="index"
        :span="spanLine || item.span || 6"
      >
        <el-form-item :label="item.label" :prop="item.field">
          <template v-if="item.type === 'input'">
            <el-input
              v-model="formData[item.field]"
              :placeholder="item.props ? item.props.placeholder : ''"
              @keyup.enter.native="onSubmit"
            />
          </template>

          <template v-else-if="item.type === 'number'">
            <el-input-number
              v-model="formData[item.field]"
              controls-position="right"
              :min="0"
              :precision="item.props ? item.props.precision : '2'"
              :placeholder="item.props ? item.props.placeholder : ''"
              @keyup.enter.native="onSubmit"
            />
          </template>

          <template v-else-if="item.type === 'select'">
            <el-select
              v-model="formData[item.field]"
              :clearable="item.clearable !== false"
              :filterable="item.props ? item.props.filterable : false"
              :placeholder="item.props ? item.props.placeholder : ''"
            >
              <el-option
                v-for="opts in item.props.dataProvider"
                :key="opts.value"
                :label="opts.label"
                :value="opts.value"
              ></el-option>
            </el-select>
          </template>

          <template v-else-if="item.type === 'remote-select'">
            <pm-remote-select
              v-model="formData[item.field]"
              :action="item.props.action"
              :filterable="item.props.filterable"
              :parse-structure="item.props.parseStructure"
              :is-transparent-border="item.props.isTransparentBorder"
            />
          </template>
          <template v-else-if="item.type === 'remoteSearch'">
            <pm-remote-search
              v-model="formData[item.field]"
              :action="item.props.action"
              :parse-structure="item.props.parseStructure"
              :field-text="item.props.fieldText"
            />
          </template>
          <template v-else-if="item.type === 'dateRange'">
            <el-date-picker
              v-model="formData[item.field]"
              popper-class="pm-date-picker"
              :type="
                item.props && item.props.type
                  ? item.props.type
                  : 'datetimerange'
              "
              :value-format="
                item.props && item.props.resultFormat
                  ? item.props.resultFormat
                  : 'yyyy-MM-dd HH:mm:ss'
              "
              :format="
                item.props && item.props.format
                  ? item.props.format
                  : 'yyyy-MM-dd HH:mm'
              "
              :range-separator="
                item.props && item.props.separator ? item.props.separator : '-'
              "
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              style="width: 100%;"
            ></el-date-picker>
          </template>

          <template v-else-if="item.type === 'checkbox'">
            <el-checkbox-group
              v-model="formData[item.field]"
              @change="handleCheckedChange"
            >
              <el-checkbox
                v-for="city in item.props.dataProvider"
                :key="city.value"
                :label="city.value"
                >{{ city.label }}</el-checkbox
              >
            </el-checkbox-group>
          </template>
          <template v-else-if="item.type === 'radio'">
            <el-radio-group v-model="formData[item.field]">
              <el-radio
                v-for="opt in item.props.dataProvider"
                :key="opt.value"
                :label="opt.value"
                >{{ opt.label }}</el-radio
              >
            </el-radio-group>
          </template>
          <template v-if="item.memo">
            <p>{{ item.memo }}</p>
          </template>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row v-if="isShowBtns" :class="isShowMore ? 'btn-footer' : ''">
      <pm-separate :is-vertical="false" :size="labelWidth" />
      <el-button v-if="isCancelShow" @click="onCancel">取消</el-button>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-row>
  </el-form>
</template>

<script>
import PmSeparate from '@/components/common/pm-separate';
import PmRemoteSelect from '@/components/common/pm-remote-select';
import PmRemoteSearch from '@/components/common/pm-remote-search.vue';

export default {
  components: {
    PmSeparate,
    PmRemoteSelect,
    PmRemoteSearch
  },

  props: {
    settings: {
      // 表单配置项
      type: Array,
      default: () => []
    },
    labelWidth: {
      // 表单全局的label宽度
      type: Number,
      default: 80
    },
    spanLine: {
      // 传入整个span
      type: Number,
      default: null
    },
    isCancelShow: {
      // 是否需要取消按钮
      type: Boolean,
      default: false
    },
    isShowMore: {
      // 更多筛选
      type: Boolean,
      default: false
    },
    isShowBtns: {
      type: Boolean,
      default: true
    },
    rules: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      formData: {} // 表单数据
    };
  },

  watch: {
    settings(oldVal, newVal) {
      this.formData = this.mergeFormData(newVal, this.formData);
    }
  },

  created() {
    this.formData = this.mergeFormData(this.settings);
  },
  methods: {
    /**
     * 合并表单数据值（支持动态配置settings)
     * @params Array settings 表单配置
     * @params Object data 表单数据
     * @return Oject 新的表单数据
     */
    mergeFormData(settings, data = {}) {
      const formData = {};
      settings.forEach(i => {
        const { field, initialValue } = i;
        formData[field] = data[field] || initialValue;
      });
      return formData;
    },
    handleCheckedChange() {},
    onSubmit() {
      this.$emit('onSubmit', this.formData);
    },
    onCancel() {
      this.$emit('onCancel', this.formData);
    },
    getFromFieldsValue() {
      return this.formData;
    },
    setFieldsValue(data) {
      this.formData = { ...this.formData, data };
    }
  }
};
</script>

<style scoped lang="less">
.form-row {
  flex-wrap: wrap;
}
.form-more {
  flex-wrap: wrap;
  padding: 20px 30px 0 30px !important;
}
.btn-footer {
  padding-top: 20px;
  text-align: center;
  border-top: solid 1px #e6e6e6;
}
</style>
