import services from '@/services/project/test-report-list';
import serviceSheetList from '@/services/project/test-sheet-list';

export default {
  // 测试报告列表
  async getTestReportPage({ commit, dispatch, state }, payload) {
    try {
      commit({ type: 'setLoading', payload: true });
      const data = await services.getTestReportPageApi(payload);
      const { pageQueryResult = {} } = data;
      const { list = [], paginator } = pageQueryResult;
      const combineLists = list.map(res => {
        return {
          ...res,
          passRate: `${Math.round(res.passingRate * 100)}%(${
            res.successCase
          }/${res.executedCase})`,
          progress: `${Math.round(res.testProgress * 100)}%(${
            res.executedCase
          }/${res.allCase})`
        };
      });
      commit({
        type: 'setTestReportPage',
        payload: {
          list: combineLists,
          paginator
        }
      });
    } catch (err) {
      this.$showErrorMessage(err);
    } finally {
      commit({ type: 'setLoading', payload: false });
    }
  },

  // 获取bug列表
  async getBugsList({ dispatch, commit, state }, payload) {
    const {
      bugs = [],
    } = await serviceSheetList.getTestFormBugLinkApi(payload);
    const combineList = bugs.map(i => {
      return {
        ...i,
        assignedPerson: i.assignedPerson || '-'
      };
    });

    await commit({ type: 'storeBugList', payload: combineList });
    await commit({ type: 'displayBugDialog', payload: true });
  }
};
