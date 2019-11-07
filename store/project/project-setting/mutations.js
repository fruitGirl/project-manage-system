export default {
  mutationProjectSetting(state, { payload }) {
    state.projectSetting = payload;
  },
  mutationProjectInfo(state, { payload }) {
    state.projectInfo = payload;
  }
};
