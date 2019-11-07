export default {
  setDemandPage(state, { payload }) {
    const { list, paginator } = payload;
    state.demandLists = list;
    state.paginator = paginator;
  },
  setLoading(state, { payload }) {
    state.loading = payload;
  },
  displayRequirementDetailDrawer(state, payload) {
    state.showRequirementDetailDrawer = payload;
  },
  displayBugDetailDrawer(state, payload) {
    state.showBugDetailDrawer = payload;
  },
  displayTaskDetailDrawer(state, payload) {
    state.showTaskDetailDrawer = payload;
  },
};
