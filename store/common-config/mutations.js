const mutations = {
  setProjects(state, { payload }) {
    state.projects = payload;
  },
  setProducts(state, { payload }) {
    state.products = payload;
  },
  setProductByModuleTree(state, { payload }) {
    state.productByModuleTree = payload;
  },
  setModulesByProduct(state, { payload }) {
    state.modulesByproduct = payload;
  },
  setProjectVersion(state, { payload }) {
    state.projectVersion = payload;
  },
  setEnabledUsers(state, { payload }) {
    state.enabledUsers = payload;
  },
  setEnabledRoles(state, { payload }) {
    state.enabledRoles = payload;
  },
  setProductAndModuleTree(state, { payload }) {
    state.productAndModuleTree = payload;
  },
  setProjectByProduct(state, { payload }) {
    state.projectByProduct = payload;
  },
  setOperationLog(state, { payload }) {
    state.operationLogs = payload;
  },
  // 操作记录loading
  setOperateLoading(state, { payload }) {
    state.operateLoading = payload;
  },
  setDemandUsers(state, { payload }) {
    state.demandUsers = payload;
  },
  setTestFormUsers(state, { payload }) {
    state.testFormUsers = payload;
  },
  setVisibleProducts(state, { payload }) {
    state.visibleProducts = payload;
  },
  setProductsByProject(state, { payload }) {
    state.productsByProject = payload;
  },
};

export default mutations;
