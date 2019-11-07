/*
 * @Description: 按钮组组件
 * @Author: yaochen
 * @Date: 2019-06-21 15:28:05
 * @Last Modified by: danding
 * @Last Modified time: 2019-07-31 11:07:35
 */
<template>
  <div class="button-group-container">
    <el-button-group
      :size="'medium'"
      class="button-group"
      :class="[showDivide ? 'showDivide' : '']"
    >
      <el-button
        v-for="(button, index) in localButtons"
        v-show="button.isShow !== false"
        :key="index"
        :class="[button.textColor]"
        :size="button.size || 'medium'"
        :type="button.type"
        :plain="button.plain"
        :round="button.round"
        :circle="button.circle"
        :loading="button.loading"
        :disabled="button.disabled"
        :icon="button.icon"
        :autofocus="button.autofocus"
        :native-type="button['native-type'] || 'button'"
        @click="clickHandle(button)"
        >{{ button.label }}</el-button
      >
    </el-button-group>
  </div>
</template>

<script>
export default {
  props: {
    // 按钮组数据
    buttons: {
      type: Array,
      default: () => [],
      required: true
    },
    // 显示间隔坚线
    showDivide: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      localButtons: []
    };
  },
  watch: {
    buttons: {
      handler: function(val) {
        this.localButtons = val.map(item => ({
          ...item
        }));
      },
      immediate: true
    }
  },
  methods: {
    clickHandle(button) {
      this.$set(button, 'loading', true);
      const callback = button.func;
      if (callback) {
        if (typeof callback === 'string') {
          this.$emit(callback);
          button.loading = false;
        } else if (callback instanceof Function) {
          const result = callback();
          if (result && result.then) {
            result.then(re => {
              button.loading = false;
            });
          } else {
            button.loading = false;
          }
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.button-group-container {
  position: fixed;
  bottom: 40px;
  left: calc(50% + 105px);
  transform: translateX(-50%);
  text-align: center;
  z-index: 100;

  .button-group {
    box-shadow: 0px 1px 8px 0px #d2d2d2;
    border-radius: 4px;
    display: flex;
    flex-wrap: nowrap;
    .el-button {
      border: none;
      position: relative;
    }
  }
}
.showDivide .el-button:not(:last-child)::after {
  content: '';
  width: 10px;
  height: 60%;
  position: absolute;
  background: #e7e7e7;
  top: 0;
  right: 0;
  z-index: 10;
  transform: scaleX(0.1) translateY(33%);
  transform-origin: 100% 0;
}
.primary {
  color: #409eff;
}
.success {
  color: #67c23a;
}
.info {
  color: #909399;
}
.warning {
  color: #e6a23c;
}
.danger {
  color: #f56c6c;
}
</style>
