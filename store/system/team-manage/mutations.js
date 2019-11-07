export default {
  mutationTeamList(state, { payload }) {
    state.teamList = payload;
  },
  mutationPagination(state, { payload }) {
    state.pagination = payload;
  }
};
