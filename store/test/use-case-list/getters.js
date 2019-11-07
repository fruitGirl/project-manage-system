export default {
  selectedRowKeys(state) {
    return state.selectedRows.map(i => i.id);
  }
};
