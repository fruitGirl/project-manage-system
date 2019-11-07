export default {
  mutationAllEnabledUser(state, { payload }) {
    state.allEnabledUser = payload;
  },
  mutationForm(state, { payload }) {
    state.form = payload;
  }
};
