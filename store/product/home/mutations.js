export default {
  setProductHomeData(state, payload) {
    state.productData = payload.product;
    state.projectList = payload.projectList;
    state.requirementLists = payload.statusList;
    // state.userIdNickNameMap = payload.userIdNickNameMap;
  },
  setReqDrawer(state, { payload }) {
    state.showReqDrawer = payload;
  },
  setProductId(state, { payload }) {
    state.productId = payload;
  }
};
