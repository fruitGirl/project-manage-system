export default {
  getPageLists(state, { payload }) {
    const { projectPageLists, paginator } = payload;
    state.projectPageLists = projectPageLists;
    state.paginator = paginator;
  },
  setLoading(state, { payload }) {
    state.loading = payload;
  }
};
