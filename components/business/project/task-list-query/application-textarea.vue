/*
 * @Description: 关联应用文本域
 * @Author: xiaojian
 * @Date: 2019-07-01 15:27:27
 * @Last Modified by: danding
 * @Last Modified time: 2019-07-31 11:22:01
 */
<template>
  <div>
    <span>CODE: {{ appCode }}</span>
    <el-input
      type="textarea"
      placeholder="请输入目的，最多100字"
      maxlength="100"
      :value="inputValue"
      :disabled="isDisabled"
      @input="handleChange"
    ></el-input>
    <span v-if="isDisabled">
      <el-button @click="handleDelete(appCode)">删除</el-button>
      <el-button type="primary" @click="handleEdit">编辑</el-button>
    </span>
    <span v-else>
      <el-button @click="handleCancel(appCode)">取消</el-button>
      <el-button type="primary" @click="handleOk">确定</el-button>
    </span>
  </div>
</template>
<script>
export default {
  model: {
    prop: 'value', // 绑定的值，通过父组件传递
    event: 'change' // 自定义事件名
  },
  props: {
    appCode: {
      type: String,
      default: ''
    },
    isSaved: {
      type: Boolean,
      default: false
    },
    deleteItem: {
      type: Function,
      default: item => {}
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      inputValue: this.value,
      isDisabled: false
    };
  },
  watch: {
    isSaved: {
      handler(val) {
        this.isDisabled = val;
      },
      immediate: true
    }
  },
  methods: {
    handleChange(v) {
      this.inputValue = v;
      this.$emit('change', v);
    },
    handleOk() {
      this.isDisabled = true;
      this.$emit('submit', this.appCode, this.inputValue);
    },
    handleCancel(appCode) {
      this.deleteItem(appCode);
    },
    handleDelete(appCode) {
      this.deleteItem(appCode);
    },
    handleEdit() {
      this.isDisabled = false;
    }
  }
};
</script>
