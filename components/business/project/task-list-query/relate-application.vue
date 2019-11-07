/*
 * @Description: 关联应用
 * @Author: xiaojian
 * @Date: 2019-07-01 14:49:12
 * @Last Modified by: danding
 * @Last Modified time: 2019-11-05 14:25:42
 */
<template>
  <div>
    <pm-dialog
      :modal-append-to-body="false"
      :visible.sync="showDialog"
      title="关联应用"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <div
        v-for="item in displayAppCodes"
        :key="item.appCode"
        class="link-code-wrapper pm-flex pm-flex-between"
      >
        <el-checkbox v-model="item.checked">{{ item.appCode }}</el-checkbox>
        &nbsp;
        <el-input
          v-model="item.workContent"
          class="purpose"
          placeholder="目的"
        />
      </div>
    </pm-dialog>
      <el-tooltip
        v-for="item in selectedAppCodes"
        :key="item.appCode"
        :content="item.workContent"
        :disabled="!item.workContent"
        placement="top"
      >
        <el-tag closable @close="removeTag(item.appCode)">
          {{ item.appCode }}
        </el-tag>
      </el-tooltip>
    <a href="javascript:;" @click="onAdd">添加</a>
  </div>
</template>

<script>
import { LINK_TASK_APP_URL } from '@/services/common-config';
import PmDialog from '@/components/common/pm-dialog.vue';
import { post } from '@/utils/request';

export default {
  components: {
    PmDialog
  },
  model: {
    prop: 'value', // 绑定的值，通过父组件传递
    event: 'change' // 自定义事件名
  },
  props: {
    value: {
      type: Array,
      default: () => {
        return [];
      }
    },
    projectId: {
      type: [Number, String],
      default: ''
    }
  },
  data() {
    return {
      LINK_TASK_APP_URL,
      showDialog: false,
      allLinkCode: [], // 所有的关联应用
      selectedAppCodes: [], // 选中的关联应用
      displayAppCodes: [], // 弹窗的数据源
    };
  },
  watch: {
    value(val = []) {
      this.selectedAppCodes = val;
      this.setDisplayAppCodes();
    },
    projectId: {
      // 请求关联应用数据
      async handler(val) {
        // 项目id不存在，不请求数据
        if (!val) return;
        try {
          const data = await post(LINK_TASK_APP_URL, {
            projectId: val
          });
          this.allLinkCode = data.appCodeList.map(item => {
            return {
              appCode: item,
              checked: false,
              workContent: undefined
            };
          });
          this.setDisplayAppCodes();
        } catch (err) {
          console.log('err=', err);
        }
      },
      immediate: true
    }
  },
  methods: {
    // 添加
    onAdd() {
      this.showDialog = true;
    },

    // 删除标签
    removeTag(key) {
      const matchIdx = this.selectedAppCodes.findIndex(i => i.appCode === key);
      this.selectedAppCodes.splice(matchIdx, 1);
      this.$emit('change', this.selectedAppCodes);
      this.setDisplayAppCodes();
    },

    // 弹窗确认
    handleConfirm() {
      this.showDialog = false;
      this.selectedAppCodes = this.displayAppCodes.filter(i => i.checked);
      this.$emit('change', this.selectedAppCodes);
    },

    // 弹窗取消
    handleCancel() {
      this.showDialog = false;
      this.setDisplayAppCodes();
    },

    // 设置弹窗展示的应用
    setDisplayAppCodes() {
      this.displayAppCodes = this.allLinkCode.map(i => {
        const matchItem = this.selectedAppCodes.find(
           j => ((j.appCode === i.appCode) && j.checked)
        );
        return {
          ...i,
          ...matchItem
        };
      });
    }
  }
};
</script>

<style lang="less" scoped>
  @deep: ~'>>>';

  .link-code-wrapper {
    margin-bottom: 15px;
    .purpose {
      width: 180px;
    }
  }
  @{deep} .el-tag + .el-tag {
    margin-left: 10px;
  }
</style>
