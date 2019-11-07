export default {
  setTestSuitePage(state, { payload }) {
    const { list, paginator } = payload;
    state.testSuitePage = list;
    state.paginator = paginator;
  },
  setKitLoading(state, { payload }) {
    state.kitLoading = payload;
  }
};
