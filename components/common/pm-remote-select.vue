/*
 * @Description: 获取远程数据的下拉框
 * @Author: danding
 * @Date: 2019-07-29 18:56:14
 * @Last Modified by: moran
 * @Last Modified time: 2019-10-30 11:52:55
 */

<template>
  <el-select
    :value="value"
    :class="isTransparentBorder ? 'pm-select-style' : ''"
    :filterable="filterable"
    :multiple="isMultiple"
    :clearable="clearable"
    :placeholder="placeholder"
    @change="$emit('change', $event)"
    @input="$emit('input', $event)"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
import { post } from '@/utils/request';
import { getSearchParams } from '@/utils/utils-helper';

export default {
  props: {
    action: {
      // 请求url
      type: [String, Array],
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    value: {
      type: [String, Number, Array],
      default: null
    },
    filterable: {
      type: Boolean,
      default: false
    },
    isTransparentBorder: {
      // 有无边框
      type: Boolean,
      default: true
    },
    needAllOpt: {
      // 是否需要全部选项
      type: Boolean,
      default: true
    },
    allOptText: {
      type: String,
      default: '全部'
    },
    isMultiple: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    fieldText: {
      type: String,
      default: 'fullPath'
    },
    parseStructure: {
      // 重组数据结构
      type: Function,
      default: (data, allOptText, needAllOpt, fieldText) => {
        const needData = data[fieldText];
        if (needAllOpt && allOptText) {
          needData.unshift({ label: allOptText, value: null });
        }
        return needData;
      }
    }
  },
  data() {
    return {
      options: [] // 下拉框选择项数据源
    };
  },
  watch: {
    action(newVal) {
      // url变化，重新请求选项数据
      newVal && this.getOpts(newVal);
    }
  },
  created() {
    if (process.client && this.action) {
      this.getOpts(this.action);
    }
  },
  methods: {
    async getOpts(action) {
      const params = getSearchParams(action);

      // 获取选项数据
      try {
        const data = await post(params.action, params.search);
        const options =
          this.parseStructure(data, this.allOptText, this.needAllOpt,  this.fieldText) || [];
        this.options = options;
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
