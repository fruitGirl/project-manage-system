export default {
  mutationLibTypes(state, { payload }) {
    state.libTypes = payload;
  },
  mutationList(state, { payload }) {
    state.list = payload;
  },
  mutationPagination(state, { payload }) {
    state.pagination = payload;
  },
  mutationEditDocInfo(state, { payload }) {
    state.editDocInfo = payload;
  },
  setActiveNodeId(state, { payload }) {
    state.activeNodeId = payload;
  },
  setActiveTabVal(state, { payload }) {
    state.activeTabVal = payload;
  }
};
