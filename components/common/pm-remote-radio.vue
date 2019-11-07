/*
 * @Description: 获取远程数据的radio group
 * @Author: danding
 * @Date: 2019-07-30 10:21:37
 * @Last Modified by: danding
 * @Last Modified time: 2019-07-31 11:10:49
 */

<template>
  <el-radio-group v-model="currentVal" @change="changeVal">
    <el-radio v-for="item in options" :key="item.value" :label="item.value">{{
      item.label
    }}</el-radio>
  </el-radio-group>
</template>

<script>
import { get } from '@/utils/request';

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [String, Number, Array],
      default: null
    },
    parseStructure: {
      type: Function,
      default: data => {
        const dataProvider = [];
        for (const i in data.fullPath) {
          dataProvider.push({
            label: i,
            value: data.fullPath[i]
          });
        }
        return dataProvider;
      }
    },
    action: {
      // 请求url
      type: String,
      default: ''
    }
  },
  data() {
    return {
      options: [], // 下拉框选择项数据源
      currentVal: ''
    };
  },
  watch: {
    value: {
      handler(val) {
        this.currentVal = val;
      },
      immediate: true
    }
  },
  created() {
    if (process.client && this.action) {
      this.getOpts(this.action);
    }
  },
  methods: {
    async getOpts(action) {
      // 获取选项数据
      try {
        const data = await get(action);
        const options = this.parseStructure(data) || [];
        this.options = options;
      } catch (err) {
        console.log(err);
      }
    },
    changeVal(val) {
      this.currentVal = val;
      this.$emit('change', val);
    }
  }
};
</script>
