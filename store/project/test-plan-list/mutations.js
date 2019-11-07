export default {
  getTestPlanList(state, payload) {
    state.dataSource = payload.dataSource;
    state.pagination = payload.pagination;
  }
};
