import services from '@/services/test/test-kit';

export default {
  // 测试套件列表
  async getTestSuitePage({ commit }, payload) {
    try {
      commit({ type: 'setKitLoading', payload: true });
      const data = await services.getTestSuitePageApi(payload);
      const { queryResult = [] } = data;
      const {
        list = [],
        paginator = {},
        testSuiteIdAndCaseNumsMap = {}
      } = queryResult;
      const combineLists = list.map(res => {
        return {
          ...res,
          testNum: testSuiteIdAndCaseNumsMap[res.id] || 0
        };
      });
      commit({
        type: 'setTestSuitePage',
        payload: {
          list: combineLists,
          paginator
        }
      });
    } catch (err) {
      this.$showErrorMessage(err);
    } finally {
      commit({ type: 'setKitLoading', payload: false });
    }
  },

  // 测试套件删除,恢复
  async testSuiteModifyEnabled({ commit }, payload) {
    try {
      await services.testSuiteModifyEnabledApi(payload);
    } catch (err) {
      this.$showErrorMessage(err);
    }
  }
};
