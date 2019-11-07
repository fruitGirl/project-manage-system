/*
 * @Description: 项目设置
 * @Author: yaochen
 * @Date: 2019-07-26 14:32:15
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 14:31:15
 */
<template>
  <div class="project-setting-container">
    <div class="project-info">
      <h1 class="project-name">
        {{ projectInfo.name }}
        <span class="state-tag">{{ projectInfo.status }}</span>
      </h1>
      <p class="time-container">
        <span>{{
          `${projectInfo.creator} 创建于 ${projectInfo.gmtCreate}`
        }}</span>
        <span class="update-time">{{
          `${projectInfo.modifier} 最后更新于 ${projectInfo.gmtModified}`
        }}</span>
      </p>
    </div>
    <div class="tags-container">
      <tag-card
        v-for="(item, index) in localProjectSetting"
        :key="index"
        :title="item.title"
        :info-list="item.infoList"
      >
        <template v-if="item.custom">
          <div class="timeline-container">
            <pm-timelines
              class="project-timelines"
              :activities="operationLogList"
            />
          </div>
        </template>
      </tag-card>
    </div>
    <startTaskDialog
      title="开始项目"
      :is-project="true"
      :data="projectInfo"
      :visible.sync="startTaskDialogVisible"
      @submit-success="dialogConfirmHandler('startTaskDialogVisible')"
    ></startTaskDialog>
    <finishTaskDialog
      :data="projectInfo"
      :is-project="true"
      title="完成项目"
      :visible.sync="finishTaskDialogVisible"
      @submit-success="dialogConfirmHandler('finishTaskDialogVisible')"
    ></finishTaskDialog>
    <delay-dialog
      :data="projectInfo"
      :visible.sync="delayDialogVisible"
      @submit-success="dialogConfirmHandler('delayDialogVisible')"
    ></delay-dialog>
    <continue-dialog
      :data="projectInfo"
      :visible.sync="continueDialogVisible"
      @submit-success="dialogConfirmHandler('continueDialogVisible')"
    ></continue-dialog>
    <reasonDialog
      :title="reasonDialogTitle"
      :submit="
        reasonDialogType === 'reasonPause' ? pauseHandler : terminalHandler
      "
      :reason-label="reasonDialogLabel"
      :visible.sync="reasonDialogVisible"
      @submit-success="dialogConfirmHandler('reasonDialogVisible')"
    ></reasonDialog>
    <pm-button-group
      :show-divide="false"
      :buttons="buttons"
      @editHandle="editHandle"
      @startHandle="startHandle(true)"
      @pauseHandle="pauseHandle"
      @continueHandle="continueHandle(true)"
      @delayHandle="delayHandle(true)"
      @finishHandle="finishHandle(true)"
      @terminateHandle="terminateHandle"
      @copyHandle="copyHandle"
    />
  </div>
</template>

<script>
import TagCard from '@/components/business/project/project-setting/tag-card.vue';
import PmTimelines from '@/components/common/pm-timelines';
import PmButtonGroup from '@/components/common/pm-button-group';
import startTaskDialog from '@/components/business/project/task-list-query/start-task-dialog';
import finishTaskDialog from '@/components/business/project/task-list-query/finish-task-dialog';
import delayDialog from '@/components/business/project/project-setting/delay-dialog';
import continueDialog from '@/components/business/project/project-setting/continue-dialog.vue';
import reasonDialog from '@/components/business/common/reason-dialog';
import pageData from '@/constants/project/project-setting';
import services from '@/services/project/project-setting';
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapState } = createNamespacedHelpers(
  'project/project-setting'
);

const {
  mapActions: commonMapActions,
  mapState: commonMapState
} = createNamespacedHelpers('common-config');

export default {
  head: {
    title: '设置-项目'
  },
  components: {
    TagCard,
    PmButtonGroup,
    startTaskDialog,
    finishTaskDialog,
    reasonDialog,
    delayDialog,
    continueDialog,
    PmTimelines
  },
  data() {
    return {
      buttons: [],
      startTaskDialogVisible: false, // 开始项目弹框
      finishTaskDialogVisible: false, // 完成项目弹框
      reasonDialogVisible: false, // 原因弹框
      delayDialogVisible: false, // 延期弹框
      continueDialogVisible: false, // 继续弹框
      selectedDependenceId: '',
      reasonDialogType: 'reasonPause'
    };
  },
  computed: {
    ...mapState(['projectSetting', 'projectInfo']),
    ...commonMapState(['operationLogs']),
    // 转数据-操作记录
    operationLogList() {
      return this.operationLogs.map(item => {
        return {
          content: `${item.operator}  ${item.actionType.message}`,
          time: item.gmtCreate,
          memos: [item.memo]
        };
      });
    },
    statusCode() {
      return this.projectInfo.statusCode;
    },
    reasonDialogTitle() {
      return this.reasonDialogType === 'reasonPause' ? '暂停项目' : '终止项目';
    },
    reasonDialogLabel() {
      return this.reasonDialogType === 'reasonPause' ? '暂停原因' : '终止原因';
    },
    // 加上操作记录
    localProjectSetting() {
      return [
        ...this.projectSetting,
        {
          title: '记录',
          custom: true,
          infoList: this.operationLogList
        }
      ];
    }
  },
  watch: {
    // 根据项目status，动态显示按钮
    statusCode: {
      handler(val) {
        this.showBtnByStatus(val);
      },
      immediate: true
    }
  },
  created() {
    this.selectedDependenceId = this.$route.query.dependenceId;
    this.query();
    this.loadLog();
  },
  methods: {
    ...commonMapActions(['getOperationLog']),
    ...mapActions(['getProjectDetailApi']),
    showBtnByStatus(val) {
      // 开始按钮
      const buttons = JSON.parse(JSON.stringify(pageData.buttons));
      if (val !== 'UNSTART') {
        buttons[0].isShow = false;
        buttons[1].isShow = false;
      }
      if (!(val === 'UNDERWAY' || val === 'DELAYED')) {
        buttons[2].isShow = false;
        buttons[3].isShow = false;
        buttons[4].isShow = false;
      }
      if (!(val === 'PAUSED')) {
        buttons[5].isShow = false;
      }
      if (
        !(
          val === 'UNSTART' ||
          val === 'UNDERWAY' ||
          val === 'DELAYED' ||
          val === 'PAUSED'
        )
      ) {
        buttons[6].isShow = false;
      }
      this.$set(this, 'buttons', buttons);
    },
    // 加载Logs操作记录
    loadLog() {
      this.getOperationLog({
        operateObjectType: 'PROJECT',
        operateObjectId: this.selectedDependenceId
      });
    },
    // 加载项目数据
    query() {
      this.getProjectDetailApi({
        projectId: this.selectedDependenceId
      });
    },
    // 修改项目跳转页面
    editHandle() {
      this.$router.push({
        path: './edit-project',
        query: { projectId: this.selectedDependenceId }
      });
    },
    // 开始项目弹框
    startHandle(visible) {
      this.startTaskDialogVisible = visible;
    },
    // 继续项目弹框
    continueHandle(visible) {
      this.continueDialogVisible = visible;
    },
    // 暂停项目弹框
    pauseHandle() {
      this.reasonDialogType = 'reasonPause';
      this.reasonDialogVisible = true;
    },
    // 延期项目弹框
    delayHandle(visible) {
      this.delayDialogVisible = visible;
    },
    // 完成项目弹框
    finishHandle(visible) {
      this.finishTaskDialogVisible = visible;
    },
    // 终止项目弹框
    terminateHandle() {
      this.reasonDialogType = 'reasonTerminal';
      this.reasonDialogVisible = true;
    },
    // 复制项目跳转页面
    copyHandle() {
      this.$router.push({
        path: './edit-project',
        query: { projectId: this.selectedDependenceId, isCopy: true }
      });
    },
    // 暂停项目回调
    pauseHandler(form) {
      return services.pauseProjectApi({
        id: this.projectInfo.id,
        reason: form.reason
      })
        .then(() => {
          this.reasonDialogVisible = false;
        })
        .catch(err => {
          this.$showErrorMessage(err);
        });
    },
    // 终止项目回调
    terminalHandler(form) {
      return services.terminateProjectApi({
        id: this.projectInfo.id,
        reason: form.reason
      })
        .then(() => {
          this.reasonDialogVisible = false;
        })
        .catch(err => {
          this.$showErrorMessage(err);
        });
    },
    dialogConfirmHandler(visible) {
      this[visible] = false;
      this.query();
      this.loadLog();
    }
  }
};
</script>

<style lang="less" scoped>
.tags-container {
  display: flex;
  flex-wrap: wrap;
  padding: 15px 0 0 15px;
  padding-top: 0;
}
.time-container {
  color: rgba(0, 0, 0, 0.42745098);
  font-size: 14px;
  margin-bottom: 16px;
  background: #fff;
  padding: 6px;
  padding-left: 10px;
  box-shadow: 0px 1px 6px 1px #e7e7e7;
  .update-time {
    margin-left: 30px;
  }
}
.project-name {
  font-size: 18px;
  padding: 10px;
  background: #fff;
  border-top: 1px solid #e2e2e2;
  border-bottom: 1px solid #e2e2e2;
  position: relative;
}
.timeline-container {
  width: 100%;
  height: 300px;
  overflow: auto;
}
</style>
<style lang="less">
.tags-container {
  .tag-card-container {
    margin: 0;
    margin-right: 15px;
    margin-bottom: 15px;
    padding: 15px;
  }
}
.project-timelines {
  .el-timeline-item {
    padding-bottom: 2px;
  }
}
</style>
