// 获取侧边栏下拉的名称
const getDependenceName = (state) => {
  const { dependenceData = [], selectedDependenceId } = state;
  for (let i = 0; i < dependenceData.length; i++) {
    const { options = [] } = dependenceData[i];
    const matchItem = options.find(j => j.value === selectedDependenceId);
    if (matchItem) {
      return matchItem.name;
    }
  }
  return '';
};

export default {
  // 侧边栏下拉第一个选择项的主键
  firstDependenceId(state) {
    const { dependenceData = [] } = state;
    const relateData = dependenceData[0] || {};
    const { options = [] } = relateData;
    return options[0] ? options[0].value : '';
  },

  // 侧边栏下拉的名称
  dependenceName(state) {
    return getDependenceName(state);
  },

  // 侧边栏下拉的项目名称
  dependenceProjectName(state) {
    return getDependenceName(state);
  },

  // 侧边栏下拉的产品名称
  dependenceProductName(state) {
    return getDependenceName(state);
  },
  siderMenuAuthorityCodes(state) {
    return state.siderMenus.reduce((total, current) => {
      if (current.children && current.children.length) {
        total.push(...current.children.map(item => item.authorityCode));
      }
      return total;
    }, []);
  }
};
