<template>
  <div class="text-center">
    <div>
      <pm-separate />
      <span class="no-data">暂无数据</span>
      <pm-separate />
      <el-button type="primary" @click="visible = true">新增模块</el-button>
    </div>
    <pm-separate />
    <node-input
      v-if="visible"
      type="add"
      :order-value="1"
      :loading="nodeInputLoading"
      @cancel="handleRemoveRootInput"
      @confirm="inputNodeData => handleInputConfirm(null, null, inputNodeData)"
    ></node-input>
  </div>
</template>
<script>
import nodeInput from './node-input';
import PmSeparate from '@/components/common/pm-separate';
export default {
  components: {
    nodeInput,
    PmSeparate
  },
  props: {
    handleInputConfirm: {
      type: Function,
      default: () => {}
    },
    rootInputVisible: {
      type: Boolean,
      default: false
    },
    nodeInputLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false
    };
  },
  watch: {
    rootInputVisible(val) {
      this.visible = val;
    },
    visible(val) {
      this.$emit('update:rootInputVisible', val);
    }
  },
  methods: {
    handleRemoveRootInput() {
      this.visible = false;
    }
  }
};
</script>
<style lang="less" scoped>
.text-center {
  text-align: center;
}
</style>
