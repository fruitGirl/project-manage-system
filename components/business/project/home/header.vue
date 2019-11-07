/*
 * @Description: 项目主页-头部
 * @Author: yaochen
 * @Date: 2019-06-24 15:45:38
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-04 15:37:53
 */

<template>
<div class="pm-module-container">
  <div
    class="header-wrapper pm-flex pm-flex-between pm-flex-center"
  >
    <div>
      <span class="title">{{ projectData.name }}</span>
      <span :class="`arrow-style ${isExpand ? 'el-icon-arrow-down' : 'el-icon-arrow-up'}`" @click="handleInfoShow"></span>
      <pm-separate :is-vertical="false" size="10" />
      <span
        >({{ projectData.shortGmtEstimateStart }} ~
        {{ projectData.shortGmtEstimateEnd }})</span
      >
      
       <pm-separate :is-vertical="false" size="10" />
      <el-tag v-if="projectData.status && projectData.status.message" type="success">
        {{ projectData.status.message }}
      </el-tag>
    </div>
    <div class="pm-flex-1 pm-text-right">
      <el-button
        v-for="btn in btns"
        v-show="btn.isShow !== false"
        :key="btn.label"
        type="text"
        @click="btn.func"
        >{{ btn.label }}</el-button
      >
    </div>
  </div>
  <project-info v-if="isExpand" :project-data="projectData"/>

  <startTaskDialog
      title="开始项目"
      :is-project="true"
      :data="projectData"
      :visible.sync="startTaskDialogVisible"
      @submit-success="
        handleOperationSuccess();
        startTaskDialogVisible = false;
      "
    ></startTaskDialog>
    <finishTaskDialog
      :data="projectData"
      :is-project="true"
      title="完成项目"
      :visible.sync="finishTaskDialogVisible"
      @submit-success="
        handleOperationSuccess();
        finishTaskDialogVisible = false;
      "
    ></finishTaskDialog>
    <delay-dialog
      :data="projectData"
      :visible.sync="delayDialogVisible"
      @submit-success="
        handleOperationSuccess();
        delayDialogVisible = false;
      "
    ></delay-dialog>
    <reasonDialog
      :title="reasonDialogTitle"
      :submit="
        reasonDialogType === 'reasonPause' ? pauseHandler : terminalHandler
      "
      :reason-label="reasonDialogLabel"
      :visible.sync="reasonDialogVisible"
    ></reasonDialog>
    <continue-dialog
      :data="projectData"
      :visible.sync="continueDialogVisible"
      @submit-success="
        handleOperationSuccess();
        continueDialogVisible = false;
      "
    ></continue-dialog>
  </div>
</template>

<script>
import PmSeparate from '@/components/common/pm-separate';
import startTaskDialog from '@/components/business/project/task-list-query/start-task-dialog';
import finishTaskDialog from '@/components/business/project/task-list-query/finish-task-dialog';
import delayDialog from '@/components/business/project/project-setting/delay-dialog';
import reasonDialog from '@/components/business/common/reason-dialog';
import continueDialog from '@/components/business/project/project-setting/continue-dialog.vue';
import proSetServices from '@/services/project/project-setting';
import ProjectInfo from '@/components/business/project/home/project-info.vue';


export default {
  components: {
    PmSeparate,
    startTaskDialog,
    finishTaskDialog,
    continueDialog,
    reasonDialog,
    delayDialog,
    ProjectInfo
  },
  props: {
    projectId: {
      type: String,
      default: ''
    },
    projectData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      btns: [
        // 按钮集合配置
        {
          label: '编辑项目',
          type: 'primary',
          func: this.editHandle
        },
        {
          label: '开始项目',
          type: 'primary',
          func: this.startHandle
        },
        {
          label: '暂停项目',
          type: 'primary',
          func: this.pauseHandle
        },
        {
          label: '延期项目',
          type: 'primary',
          func: this.delayHandle
        },
        {
          label: '完成项目',
          type: 'primary',
          func: this.finishHandle
        },
        {
          label: '继续项目',
          type: 'primary',
          func: this.continueHandle
        },
        {
          label: '终止项目',
          type: 'primary',
          func: this.terminateHandle
        },
        {
          label: '复制项目',
          type: 'primary',
          func: this.copyHandle
        }
      ],
      startTaskDialogVisible: false, // 开始项目弹框
      finishTaskDialogVisible: false, // 完成项目弹框
      reasonDialogVisible: false, // 原因弹框
      delayDialogVisible: false, // 原因弹框
      continueDialogVisible: false, // 继续弹框
      reasonDialogType: 'reasonPause',
      isExpand: false
    };
  },
  computed: {
    reasonDialogTitle() {
      return this.reasonDialogType === 'reasonPause' ? '暂停项目' : '终止项目';
    },
    reasonDialogLabel() {
      return this.reasonDialogType === 'reasonPause' ? '暂停原因' : '终止原因';
    },
    statusCode() {
      return this.projectData.statusCode;
    }
  },
  watch: {
    statusCode: {
      handler(val) {
        this.showBtnByStatus(val);
      },
      immediate: true
    }
  },
  methods: {
    showBtnByStatus(val) {
      const buttons = [...this.btns];
      buttons.forEach((item, index) => {
        item.isShow = false;
        if (index === 0 || index === 7) {
          // 编辑和复制显示
          item.isShow = true;
        }
      });
      if (val === 'UNSTART') {
        buttons[1].isShow = true; // 开始按钮
      }
      if (val === 'UNDERWAY' || val === 'DELAYED') {
        buttons[2].isShow = true; // 暂停
        buttons[3].isShow = true; // 延期
        buttons[4].isShow = true; // 完成
      }
      if (val === 'PAUSED') {
        buttons[5].isShow = true; // 继续
      }
      if (
        val === 'UNSTART' ||
        val === 'UNDERWAY' ||
        val === 'DELAYED' ||
        val === 'PAUSED'
      ) {
        buttons[6].isShow = true; // 终止
      }
      this.btns = buttons;
    },
    editHandle() {
      this.$router.push({
        path: './edit-project',
        query: { projectId: this.projectId }
      });
    },
    continueHandle() {
      this.continueDialogVisible = true;
    },
    startHandle() {
      this.startTaskDialogVisible = true;
    },
    pauseHandle() {
      this.reasonDialogType = 'reasonPause';
      this.reasonDialogVisible = true;
    },
    delayHandle() {
      this.delayDialogVisible = true;
    },
    finishHandle() {
      this.finishTaskDialogVisible = true;
    },
    terminateHandle() {
      this.reasonDialogType = 'reasonTerminal';
      this.reasonDialogVisible = true;
    },
    copyHandle() {
      this.$router.push({
        path: './edit-project',
        query: { projectId: this.projectId, isCopy: true }
      });
    },
    pauseHandler(form) {
      return proSetServices.pauseProjectApi({
        id: this.projectId,
        reason: form.reason
      })
        .then(() => {
          this.reasonDialogVisible = false;
          this.handleOperationSuccess();
        })
        .catch(err => {
          this.$showErrorMessage(err);
        });
    },
    terminalHandler(form) {
      return proSetServices.terminateProjectApi({
        id: this.projectId,
        reason: form.reason
      })
        .then(() => {
          this.reasonDialogVisible = false;
          this.handleOperationSuccess();
        })
        .catch(err => {
          this.$showErrorMessage(err);
        });
    },
    handleOperationSuccess() {
      this.$emit('operate-success');
    },
    handleInfoShow() {
      this.isExpand = !this.isExpand;
    }
  }
};
</script>

<style scoped lang="less">
.header-wrapper {
  padding-bottom: 15px;
  padding-right: 30px;
  .title {
    font-weight: bold;
  }
  .status {
    color: #2a8f28;
  }
  .arrow-style {
    color: #1687D9;
    cursor: pointer;
  }
}
</style>
