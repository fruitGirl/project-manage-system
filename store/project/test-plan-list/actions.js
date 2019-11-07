import services from '@/services/project/test-plan-list';
import { PRIORITY_MAP } from '@/constants/common/config';
import dateFormat from 'dateformat';

export default {
  async getTestPlanPage({ commit }, payload) {
    try {
      const data = await services.getTestPlanPageApi(payload);
      const result = data.queryResult;
      commit('getTestPlanList', {
        dataSource: result.list.map(item => {
          return {
            ...item,
            gmtCreate: dateFormat(Date.now(item.gmtCreate), 'yyyy-mm-dd'),
            priorityName: PRIORITY_MAP[item.priority], // 优先级名称
          };
        }),
        pagination: result.paginator
      });
    } catch (error) {
      this.$showErrorMessage(error);
    }
  },
  async testPlanDelete({ commint }, payload) {
    await services.testPlanDeleteApi(payload);
  }
};
