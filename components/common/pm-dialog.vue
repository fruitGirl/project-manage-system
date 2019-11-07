/*
 * @Description: 模态框组件
 * @Author: moran
 * @Date: 2019-06-18 12:18:13
 * @Last Modified by: moran
 * @Last Modified time: 2019-08-27 14:54:03
 */
<template>
  <div class="pm-dialog">
    <el-dialog
      :title="title"
      :width="width"
      :visible.sync="isVisible"
      :show-close="showClose"
      :destroy-on-close="destoryOnClose"
      :modal="modal"
      :modal-append-to-body="modalAppendToBody"
      @close="handleCloseDialog"
    >
      <div class="modal-body">
        <div>
          <slot />
        </div>
      </div>
      <span v-if="showBtn" slot="footer" class="dialog-footer">
        <el-button v-if="isCancelBtn" size="small" @click="handleCloseDialog">{{
          cancelTxt
        }}</el-button>
        <el-button
          type="primary"
          size="small"
          :loading="dialogLoading"
          @click="handleConfirm"
          >{{ confirmTxt }}</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    visible: { // 是否显示 Dialog，支持 .sync 修饰符
      type: Boolean,
      require: true
    },
    title: { // Dialog 的标题
      type: String,
      default: '提示'
    },
    width: { // 宽度
      type: [String, Number],
      default: '500px'
    },
    showClose: { // 是否显示关闭按钮
      type: Boolean,
      default: true
    },
    showBtn: { // 是否显示底部确定取消按钮
      type: Boolean,
      default: true
    },
    isCancelBtn: { // 是否显示取消按钮
      type: Boolean,
      default: true
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    cancelTxt: { // 底部按钮取消文字
      type: String,
      default: '取消'
    },
    confirmTxt: { // 底部按钮确认文字
      type: String,
      default: '确定'
    },
    destoryOnClose: { // 关闭时销毁 Dialog 中的元素
      type: Boolean,
      default: false
    },
    modal: {
      type: Boolean,
      default: true
    },
    modalAppendToBody: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isVisible: false,
      dialogLoading: false
    };
  },
  watch: {
    visible: {
      handler(val) {
        this.$emit('update:visible', val);
        this.isVisible = val;
      },
      immediate: true
    },
    isLoading(val) {
      this.dialogLoading = val;
    }
  },
  methods: {
    handleCloseDialog() {
      this.$emit('update:visible', false);
      this.$emit('cancel');
    },
    handleConfirm() {
      this.$emit('confirm');
    }
  }
};
</script>

<style lang="less">
.pm-dialog .el-dialog__body {
  padding-bottom: 0;
}
</style>
<style></style>
