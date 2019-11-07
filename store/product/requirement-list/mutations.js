export default {
  setDemandPage(state, { payload }) {
    const { list, paginator } = payload;
    state.demandLists = list;
    state.paginator = paginator;
  },
  setInitDemand(state, { payload }) {
    state.initDemands = payload;
  },

  // 设置提需求抽屉开关
  setReqDrawer(state, { payload }) {
    state.showReqDrawer = payload;
    if (!payload) {
      state.initDemands = {
        priority: 3,
        description: ''
      };
    }
  },

  // 设置用例抽屉开关
  setUseCaseDrawer(state, { payload }) {
    state.showUseCaseDrawer = payload;
  },

  setPopover(state, { payload }) {
    state.isPopover = payload;
  },

  displayUseCaseDrawer(state, { payload }) {
    state.showUseCaseDrawer = payload;
    if (!payload) {
      // 清空存储的编辑用例信息
      state.storeEditUseCaseMsg = null;
    }
  },

  setLoading(state, { payload }) {
    state.loading = payload;
  },
  setInitDemandTestCase(state, { payload }) {
    state.initTestCaseDatas = payload;
  },

  displayRequirementDetailDrawer(state, payload) {
    state.showRequirementDetailDrawer = payload;
  },

  displayBugDetailDrawer(state, payload) {
    state.showBugDetailDrawer = payload;
  },

  displayTaskDetailDrawer(state, payload) {
    state.showTaskDetailDrawer = payload;
  },
  
};
