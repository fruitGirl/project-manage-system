export default {
  setTestFormCasePage(state, { payload }) {
    const { list, paginator } = payload;
    state.testFormCasePages = list;
    state.paginator = paginator;
  },
  setTestLoading(state, { payload }) {
    state.testLoading = payload;
  },
  setCaseLoading(state, { payload }) {
    state.caseLoading = payload;
  },
  setTestFormDetail(state, { payload }) {
    const { testInfo, needTestForms } = payload;
    state.testFormDetail = needTestForms;
    state.testInfo = testInfo;
  },
  initTestCaseBugs(state, { payload }) {
    state.initBugDatas = payload;
  },
  // 执行----
  displayExecuteDialog(state, { payload }) {
    state.showExecuteDialog = payload;
    state.expandRowKeys = [];
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
  storeBugList(state, { payload }) {
    state.bugList = payload;
  },
  displayBugDialog(state, { payload }) {
    state.showBugDialog = payload;
  }
};
