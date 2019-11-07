import services from '@/services/project/create-test-plan';

export default {
  async testPlanCreate({ commit }, payload) {
    await services.testPlanCreateApi(payload);
  },
  async testPlanModify({ commit }, payload) {
    await services.testPlanModifyApi(payload);
  },
  async testPlanModifyInitPage({ commit }, payload) {
    try {
      const data = await services.testPlanModifyInitPageApi(payload);
      commit('getTestPlanData', {
        testPlanData: {
          ...data.testPlan,
          creatorName: data.creator,
          modifyName: data.modify,
          projectName: data.projectName
        }
      });
    } catch (error) {
      this.$showErrorMessage(error);
    }
  }
};
