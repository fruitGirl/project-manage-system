export default {
  setProductList(state, { payload }) {
    state.dataSource = payload.dataSource;
    state.pagination = payload.pagination;
  }
};
