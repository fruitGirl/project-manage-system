export default {
  setTestCasePage(state, { payload }) {
    const { combineLists, paginator } = payload;
    state.testCasePage = combineLists;
    state.paginator = paginator;
  },
  setTestCaseLoading(state, { payload }) {
    state.useCaseLoading = payload;
  }
};
