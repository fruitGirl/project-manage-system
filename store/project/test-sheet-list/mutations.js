export default {
  getTestQuery(state, { payload }) {
    const { list, paginator } = payload;
    state.testSheets = list;
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
