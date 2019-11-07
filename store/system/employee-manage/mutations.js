export default {
  mutationList(state, { payload }) {
    state.list = payload;
  },
  mutationPagination(state, { payload }) {
    state.pagination = payload;
  }
};
