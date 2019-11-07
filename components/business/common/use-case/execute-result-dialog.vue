/*
 * @Description: 测试-执行结果弹框
 * @Author: moran
 * @Date: 2019-06-25 16:09:59
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 12:16:23
 */

<template>
  <el-dialog
    custom-class="execute-dialog-wrapper"
    title="执行结果"
    width="1000px"
    :visible="visible"
    @close="handleCloseDialog"
  >
    <execute-result
      :data-provider="storeExecuteResultMsg"
      :expand-row-keys="expandRowKeys"
      @getResultDetail="getResultDetail"
      @transferBug="transferBug"
    />
  </el-dialog>
</template>

<script>
import ExecuteResult from '@/components/business/common/execute-result.vue';

export default {
  components: {
    ExecuteResult
  },
  props: {
    visible: {
      type: Boolean,
      require: true
    },
    storeExecuteResultMsg: {
      // 结果列表的数据
      type: Object,
      default: () => ({})
    },
    expandRowKeys: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  methods: {
    handleCloseDialog() {
      this.$emit('onHide');
    },
    getResultDetail(id) {
      this.$emit('getResultDetail', id);
    },
    transferBug(payload) {
      this.$emit('transferBug', payload);
    }
  }
};
</script>
<style lang="less" scoped>
@deep: ~'>>>';

@{deep} .execute-dialog-wrapper {
  .modal-body {
    .el-dropdown-link {
      cursor: pointer;
      color: #409eff;
    }
    .attention {
      font-weight: bold;
    }
    .btn-box {
      text-align: center;
      margin: 20px 0;
      height: 60px;
      border-bottom: solid 1px #e6e6e6;
    }
  }
}
</style>
