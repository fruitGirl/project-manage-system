export default {
  updateSearchListResult(state, { payload }) {
    const { paginator, savedSearchVals, list } = payload;
    state.paginator = paginator;
    state.savedSearchVals = savedSearchVals;
    state.list = list;
  },
  displayRelateProductDrawer(state, { payload }) {
    state.showRelateProduct = payload;
  },
  setRelateProduct(state, { payload }) {
    const { linkedProduct, products } = payload;
    state.relateProductData = linkedProduct;
    state.allProducts = products;
  },
  setCurHandleProject(state, { payload }) {
    state.curSelectedProject = payload;
  },
  setCurEditProject(state, { payload }) {
    state.curEditProject = payload;
  },
  setTableLoading(state, { payload }) {
    state.loadingTable = payload;
  },
  displayProjectMsgDrawer(state, { payload }) {
    state.showProjectMsgDrawer = payload;
  },
  storeTeamMsg(state, { payload }) {
    state.teamMsg = payload;
  },
  displayTeamDrawer(state, { payload }) {
    state.showTeamDrawer = payload;
  }
};
