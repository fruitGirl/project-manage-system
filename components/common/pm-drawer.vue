/*
 * @Description: 抽屉组件
 * @Author: danding
 * @Date: 2019-06-17 10:55:44
 * @Last Modified by: danding
 * @Last Modified time: 2019-11-05 14:09:43
 */

<template>
  <el-drawer
    :visible="visible"
    :wrapper-closable="maskClosable"
    custom-class="drawer"
    :size="width"
    :modal="modal"
    :title="title"
    @close="onCancel"
  >
    <template v-slot:title>
      <slot name="title">
        <div class="pm-flex pm-flex-between pm-flex-center drawer-custom-header">
          <div>
            {{title}}
            <slot name="headerLeft"></slot>
          </div>
          <div>
            <slot name="headerRight"></slot>
          </div>
        </div>
      </slot>
    </template>
    <div class="drawer-body">
      <slot />
    </div>
  </el-drawer>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: '830px'
    },
    loading: { // 提交按钮loading状态
      type: Boolean,
      default: false
    },
    maskClosable: { // 点击蒙层是否允许关闭
      type: Boolean,
      default: false
    },
    modal: { // 是否需要遮罩
      type: Boolean,
      default: false
    }
  },
  methods: {
    onCancel() {
      this.$emit('onCancel');
    },
    onSubmit() {
      this.$emit('onSubmit');
    }
  }
};
</script>

<style lang="less" scoped>
@deep: ~'>>>';

.drawer {
  width: 100%;
  height: 100%;

  &.drawer-open {
    right: 0;
    transition: all 0.5s;
  }

  &.drawer-close {
    right: -100%;
    transition: all 0.5s;
  }

  .drawer-mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.15);
  }

  .drawer-content-wrapper {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    z-index: 999;
    background: #fff;
  }

  .drawer-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
    background-color: #fff;
    background-clip: padding-box;
    border: 0;
  }

  .drawer-header {
    position: relative;
    padding-left: 30px;
    height: 61px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: rgba(0, 0, 0, 0.65);
    background: #fff;
    border-bottom: 1px solid #e8e8e8;
    border-radius: 4px 4px 0 0;
  }

  .drawer-title {
    margin: 0;
    color: rgba(0, 0, 0, 0.85);
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
  }

  .drawer-custom-header {
    padding-right: 7px;
  }

  .drawer-body {
    flex: 1;
    padding: 24px 30px 60px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;
    overflow-x: hidden;
  }

  .el-icon-close {
    cursor: pointer;
  }
}

@{deep}.el-drawer__container {
  position: fixed;
}

@{deep}.el-drawer__header {
  height: 61px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px 0 30px;
  margin-bottom: 0;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  border-radius: 4px 4px 0 0;
  color: rgba(0,0,0,.85);
  font-weight: 700;
  font-size: 16px;
}

@{deep}.el-drawer__header>:first-child {
  height: 61px;
  // line-height: 61px
}

@{deep} .el-drawer__body {
    overflow-y: auto;
}
</style>
