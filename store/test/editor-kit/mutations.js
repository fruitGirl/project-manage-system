export default {
  initTestSuiteModify(state, { payload }) {
    state.testSuiteModifyDetail = payload;
  },
  setTestLoading(state, { payload }) {
    state.testLoading = payload;
  }
};
