const mutations = {
  // 设置顶部菜单栏数据
  setTopMenus(state, { payload }) {
    state.topMenus = payload;
  },

  // 设置侧边栏菜单数据
  setSiderMenus(state, { payload }) {
    state.siderMenus = payload;
  },

  // 切换侧边栏的缩放
  changeCollapse(state, payload) {
    state.isCollapse = payload;
  },

  // 切换顶部菜单栏菜单
  changeSelectedTopItem(state, { payload }) {
    state.selectedTopId = payload;
  },

  // 切换菜单
  handleSelectMenu(state, payload) {
    state.selectedSiderIdx = payload;
  },

  // 是否显示侧边栏菜单
  displaySiderMenus(state, payload) {
    if (!payload) {
      state.siderMenus = [];
    }
    state.isShowSiderMenus = payload;
  },

  // 切换侧边栏下拉的数据
  changeSelectedDependenceId(state, { payload }) {
    state.selectedDependenceId = payload;
  },

  // 设置侧边栏的下拉
  setDependenceData(state, { payload }) {
    state.dependenceData = payload;
  }
};

export default mutations;
