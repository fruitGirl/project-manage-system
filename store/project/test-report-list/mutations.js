export default {
  setTestReportPage(state, { payload }) {
    const { list, paginator } = payload;
    state.testReportPage = list;
    state.paginator = paginator;
  },
  setLoading(state, { payload }) {
    state.loading = payload;
  },
  storeBugList(state, { payload }) {
    state.bugList = payload;
  },
  displayBugDialog(state, { payload }) {
    state.showBugDialog = payload;
  }
};
