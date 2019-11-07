export default {
  mutationOperationList(state, { payload }) {
    state.operationList = payload;
  },
  mutationPagination(state, { payload }) {
    state.pagination = payload;
  },
  mutationActionTypesOptions(state, { payload }) {
    state.actionTypesOptions = payload;
  },
  mutationOperateObjTypesOptions(state, { payload }) {
    state.operateObjTypesOptions = payload;
  }
};
