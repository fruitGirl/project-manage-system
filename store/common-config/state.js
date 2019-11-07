const state = () => {
  return {
    enabledUsers: [], // 所有人员
    enabledRoles: [], // 所有角色
    products: [], // 所有参与的产品
    projects: [], // 所有参与的项目(有效)
    modulesByproduct: [],
    projectVersion: [],
    productAndModuleTree: [],
    projectByProduct: [],
    operationLogs: [],
    productByModuleTree: [], // 产品下的模块树
    operateLoading: false,
    demandUsers: [], // 需求人员
    testFormUsers: [], // 测试单指派人
    visibleProducts: [], // 所有参与的产品(可见)
    productsByProject: []
  };
};

export default state;
