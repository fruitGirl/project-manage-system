export default {
  storeDetailMsg(state, { payload }) {
    state.detailMsg = payload;
  },
  storeOperateHistory(state, { payload }) {
    state.operateHistory = payload;
  }
};
