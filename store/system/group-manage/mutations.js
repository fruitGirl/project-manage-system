export default {
  mutationList(state, { payload }) {
    state.list = payload;
  },
  setTransData(state, { selectOptions, transAllList, transItems }) {
    state.transData = {
      selectOptions,
      transAllList,
      transItems
    };
  }
};
