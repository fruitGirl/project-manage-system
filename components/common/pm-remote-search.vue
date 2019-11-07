/*
 * @Description: 远程搜索组件
 * @Author: moran
 * @Date: 2019-07-01 11:13:52
 * @Last Modified by: danding
 * @Last Modified time: 2019-07-31 11:11:01
 */
<template>
  <el-select
    :value="value"
    :multiple="isMultiple"
    filterable
    remote
    :placeholder="placeholder"
    :remote-method="remoteMethod"
    :loading="loading"
    :clearable="clearable"
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

export default {
  props: {
    action: {
      // 请求url
      type: String,
      default: ''
    },
    value: {
      type: [String, Number, Array],
      default: null
    },
    placeholder: {
      type: String,
      default: '请输入关键词'
    },
    isMultiple: {
      type: Boolean,
      default: false
    },
    defaultOption: {
      type: Array,
      default: () => []
    },
    fieldText: {
      type: String,
      default: 'userIdAndNickNameMap'
    },
    clearable: {
      type: Boolean,
      default: true
    },
    parseStructure: {
      type: Function,
      default: (data, fieldText) => {
        const needData = [];
        for (const i in data[fieldText]) {
          needData.push({
            label: data[fieldText][i],
            value: i
          });
        }
        return needData;
      }
    }
  },
  data() {
    return {
      options: [],
      loading: false
    };
  },
  watch: {
    defaultOption: {
      handler(val) {
        this.options = val;
      }
    },
    immediate: true
  },
  created() {
    if (this.defaultOption.length) {
      this.options = this.defaultOption;
    }
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.fetchData(query);
        }, 200);
      } else {
        this.options = [];
      }
    },
    async fetchData(query) {
      if (this.action) {
        try {
          const data = await post(this.action, { name: query });
          const options = this.parseStructure(data, this.fieldText) || [];
          this.options = options;
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
};
</script>
