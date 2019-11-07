/*
 * @Description: 树组件里的 节点的输入组件
 * @Author: xiaojian
 * @Date: 2019-06-19 10:49:48
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 15:57:57
 */
<template>
  <span ref="nodeInput" class="node-input">
    <el-input
      v-model.trim="value"
      size="mini"
      placeholder="请输入，最多15个字"
      maxlength="15"
      class="node-content-input"
    ></el-input>
    <template v-if="!loading">
      <i class="el-icon-circle-check input-confirm" @click="confirm"></i>
      <i class="el-icon-circle-close input-cancel" @click="cancel"></i>
    </template>
    <template v-else>
      <i class="el-icon-loading input-loading"></i>
    </template>
  </span>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'add' //  add 和 edit 模式
    },
    orderValue: {
      type: Number,
      default: 1
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: this.label
    };
  },
  mounted() {
    this.$refs.nodeInput.scrollIntoViewIfNeeded();
  },
  methods: {
    confirm() {
      this.handleInputSubmit();
    },
    cancel() {
      this.$emit('cancel');
    },
    handleInputSubmit() {
      if (this.value) {
        this.$emit('confirm', {
          label: this.value,
          inputType: this.type,
          orderValue: this.orderValue,
          contentEditable: false
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.node-content-input {
  width: 150px;
}
.node-input {
  display: inline-flex;
  align-items: center;
  font-size: 24px;
  .input-confirm {
    color: #409eff;
  }
  .input-confirm,
  .input-loading {
    margin-left: 10px;
  }
  .input-cancel {
    color: #aeaeae;
    margin-left: 6px;
  }
}
</style>
