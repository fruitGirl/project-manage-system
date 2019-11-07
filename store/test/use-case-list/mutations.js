export default {
  updateSearchListResult(state, { payload }) {
    const { paginator, savedSearchVals, list } = payload;
    state.paginator = paginator;
    state.savedSearchVals = savedSearchVals;
    state.list = list;
  },
  setTableLoading(state, { payload }) {
    state.loadingTable = payload;
  },
  displayUseCaseDrawer(state, { payload }) {
    state.showUseCaseDrawer = payload;
    if (!payload) {
      // 清空存储的编辑用例信息
      state.storeEditUseCaseMsg = null;
    }
  },
  setEditUseCaseMsg(state, { payload }) {
    state.storeEditUseCaseMsg = payload;
  },
  changeSelections(state, { payload }) {
    state.selectedRows = payload;
  },
  displayExecuteDialog(state, { payload }) {
    state.showExecuteDialog = payload;
    state.expandRowKeys = [];
    if (!payload) {
      state.selectedRows = [];
    }
  },
  setExecuteUseCaseMsg(state, { payload }) {
    state.storeExecuteUseCaseMsg = payload;
  },
  setExecuteResultMsg(state, { payload }) {
    state.storeExecuteResultMsg = payload;
  },
  setExpandRowKeys(state, { payload }) {
    state.expandRowKeys = payload;
  },
  displayResultDialog(state, { payload }) {
    state.showExecuteResultDialog = payload;
    state.expandRowKeys = [];
  },
  displayBugDrawer(state, { payload }) {
    state.showBugDrawer = payload;
  },
  storeTestCaseBugs(state, { payload }) {
    state.storeBugDatas = payload;
  },
  storeBugList(state, { payload }) {
    state.bugList = payload;
  },
  displayBugDialog(state, { payload }) {
    state.showBugDialog = payload;
  },

  // 设置详情抽屉显示和隐藏
  displayUseCaseDetailDrawer(state, { payload }) {
    state.showUseCaseDetailDrawer = payload;
  },

  // 设置用例详情抽屉的信息
  setUseCaseDetailMsg(state, { payload }) {
    state.useCaseDetailMsg = payload;
  },

  // 设置用例操作历史
  storeOperateHistory(state, { payload }) {
    state.operateHistory = payload;
  }
};
