/*
 * @Description: 查询-更多筛选组件
 * @Author: moran
 * @Date: 2019-06-18 17:55:24
 * @Last Modified by: moran
 * @Last Modified time: 2019-08-01 15:34:56
 */
<template>
  <el-popover
    v-model="isPopover"
    popper-class="more-filter-popover"
    placement="bottom-start"
    :width="width"
    trigger="click"
  >
    <pm-search-bar
      :label-width="labelWidth"
      :settings="settings"
      :span-line="24"
      :is-cancel-show="true"
      :is-show-more="true"
      @onCancel="handleCancle"
      @onSubmit="handleSubmit"
    />
    <div slot="reference">
      更多筛选
      <span
        style="color: #ADADAD; margin-left:5px"
        class="el-icon-caret-bottom"
      ></span>
    </div>
  </el-popover>
</template>

<script>
import PmSearchBar from '@/components/common/pm-search-bar.vue';

export default {
  components: {
    PmSearchBar
  },
  props: {
    labelWidth: {
      type: Number,
      default: 90
    },
    width: {
      // 宽度
      type: Number,
      default: 530
    },
    settings: {
      // 表单配置项
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isPopover: false
    };
  },
  methods: {
    handleCancle() {
      this.isPopover = false;
    },
    handleSubmit(val) {
      this.$emit('onSubmit', val);
      this.isPopover = false;
    }
  }
};
</script>

<style lang="less">
.more-filter-popover {
  font-size: 14px;
  .form-padding {
    padding: 20px 35px 0 35px !important;
  }
  .el-range-editor--small.el-input__inner {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
}
</style>
