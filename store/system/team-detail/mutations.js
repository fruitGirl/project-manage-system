export default {
  mutationList(state, { payload }) {
    state.list = payload;
  },
  mutationTeamInfo(state, { payload }) {
    state.teamInfo = payload;
  }
};
