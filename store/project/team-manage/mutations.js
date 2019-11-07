export default {
  mutationMemberList(state, { payload }) {
    state.memberList = payload;
  },
  mutationTeamInfo(state, { payload }) {
    state.teamInfo = payload;
  }
};
