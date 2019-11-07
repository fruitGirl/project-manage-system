export default {
  setProjects(state, { payload }) {
    state.projects = payload;
  },
  setProducts(state, { payload }) {
    state.products = payload;
  },
  setTaskList(state, { payload }) {
    // 获取 id name
    //  state.taskLists = payload;
    state.itemTabLists[0].showLists = payload;
  },
  setMyBugList(state, { payload }) {
    state.itemTabLists[1].showLists = payload;
  },
  setMyTestList(state, { payload }) {
    state.itemTabLists[2].showLists = payload;
  },
  setMyWattingDemandList(state, { payload }) {
    state.productTabLists[0].showLists = payload;
  },
  setUnassignedDemandList(state, { payload }) {
    state.productTabLists[1].showLists = payload;
  },
  getProductProjectStatusNum(state, { payload }) {
    const { productLists, projectLists, countParams } = payload;
    state.productStatus = productLists;
    state.projectStatus = projectLists;
    state.countParams = countParams;
  },
  setUserHomePage(state, { payload }) {
    const { moduleData, userName } = payload;
    state.userHomeLists = moduleData;
    state.userName = userName;
  },
  setUnfinishLists(state, { payload }) {
    state.simpleInfos = payload;
  },
  displayUnfinishDrawer(state, { payload }) {
    state.showUnfinishDrawer = payload;
  },
};
