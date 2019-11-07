import services from '@/services/project/test-plan-detail';
import { getOperationLogApi } from '@/services/common-config';
import { PRIORITY_MAP } from '@/constants/common/config';

export default {
  async getTestPlanData({ commit }, payload) {
    try {
      const data = await services.getTestPlanDataApi(payload);
      const { testPlan } = data;
      commit('getTestPlanData', {
        attachmentList:
          data.attachmentList.map(item => {
            return {
              resourceId: item.resourceId,
              fileName: item.fileName
            };
          }) || [],
        testPlanData: {
          ...testPlan,
          creatorName: data.creator,
          modifyName: data.modify,
          projectName: data.projectName,
          priorityMessage: PRIORITY_MAP[testPlan.priority]
        }
      });
    } catch (error) {
      this.$showErrorMessage(error);
    }
  },
  async getOperationLog({ commit }, payload) {
    try {
      const data = await getOperationLogApi(payload);
      commit('getOperationLogData', data);
    } catch (err) {
      this.$showErrorMessage(err);
    }
  }
};
