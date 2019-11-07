const taskListQuery = {
  props: {
    show: {
      type: Boolean,
      default: false,
      require: true
    }
  },
  data() {
    return {
      taskDrawerType: 'add',
      taskDrawerTitle: '建任务',
      taskDrawerVisible: false, // 任务抽屉
      currentRowData: {},
      startTaskDialogVisible: false, // 开始任务弹框
      startTaskDialogTime: '-', // 开始任务预估时间
      finishTaskDialogVisible: false, // 完成任务弹框
      reasonDialogType: 'reasonPause',
      reasonDialogVisible: false // 暂停任务弹框 或者 终止任务弹框
    };
  },
  computed: {
    reasonDialogTitle() {
      return this.reasonDialogType === 'reasonPause' ? '暂停任务' : '终止任务';
    },
    reasonDialogLabel() {
      return this.reasonDialogType === 'reasonPause' ? '暂停原因' : '终止原因';
    }
  },
  methods: {
    checkBtnVisible(rowData, statusList) {
      return !!(
        rowData &&
        rowData.status &&
        statusList.indexOf(rowData.status.name) !== -1
      );
    },
    handleCopyTask(rowData) {
      this.taskDrawerVisible = true;
      this.currentRowData = rowData;
      this.taskDrawerTitle = '复制任务';
      this.taskId = rowData.id;
      this.taskDrawerType = 'copy';
    },
    handleContinue(rowData) {
      return this.continueTask({
        id: rowData.id
      })
        .then(() => {
          this.$showSuccessMessage('操作成功');
          this.handleRefresh();
        })
        .catch(err => {
          this.$showErrorMessage(err);
        });
    },
    handleEditTask(rowData) {
      this.taskDrawerVisible = true;
      this.taskDrawerTitle = '编辑任务';
      this.currentRowData = rowData;
      this.taskId = rowData.id;
      this.taskDrawerType = 'edit';
    },
    handlePause(rowData) {
      this.currentRowData = rowData;
      this.reasonDialogType = 'reasonPause';
      this.reasonDialogVisible = true;
    },
    handleTerminal(rowData) {
      this.currentRowData = rowData;
      this.reasonDialogType = 'reasonTerminal';
      this.reasonDialogVisible = true;
    },
    handleReasonDialogSubmit(formData) {
      const params = {
        id: this.currentRowData.id,
        ...formData
      };
      let func = this.terminalTask;
      if (this.reasonDialogType === 'reasonPause') {
        func = this.pauseTask;
      }
      return new Promise((resolve, reject) => {
        func(params)
          .then(() => {
            this.handleRefresh();
            this.reasonDialogVisible = false;
            resolve();
          })
          .catch(err => {
            this.$showErrorMessage(err);
            reject(err);
          });
      });
    },
    handleStartTask(rowData) {
      this.currentRowData = rowData;
      this.startTaskDialogVisible = true;
    },
    handleStarTaskSuccess() {
      this.startTaskDialogVisible = false;
      this.$showSuccessMessage('操作成功');
      this.handleRefresh();
    },
    handleFinishTask(rowData) {
      this.currentRowData = rowData;
      this.finishTaskDialogVisible = true;
    },
    handleFinishTaskSuccess() {
      this.finishTaskDialogVisible = false;
      this.$showSuccessMessage('操作成功');
      this.handleRefresh();
    }
  }
};

export default taskListQuery;
