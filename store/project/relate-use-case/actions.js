import services from '@/services/project/relate-use-case';

export default {
  // 全部用例列表
  async getTestCasePage({ commit, dispatch, state }, payload) {
    try {
      commit({ type: 'setTestCaseLoading', payload: true });
      const data = await services.getTestCasePageApi(payload);
      const { queryResult = {} } = data;
      const { list, paginator } = queryResult;
      const combineLists = list.map(i => {
        const { automation, type, automationStatus, executor } = i;
        const automationName = automation ? automationStatus.message : '手动';
        return {
          ...i,
          automationName,
          executorName: executor,
          typeName: type.message
        };
      });
      commit({
        type: 'setTestCasePage',
        payload: {
          combineLists,
          paginator
        }
      });
    } catch (err) {
      this.$showErrorMessage(err);
    } finally {
      commit({ type: 'setTestCaseLoading', payload: false });
    }
  },

  // 关联用例
  async testFormCaseLink({ commit, dispatch, state }, payload) {
    try {
      await services.testFormCaseLinkApi(payload);
      this.$showSuccessMessage('关联用例成功');
      this.$PMRouter.back();
    } catch (err) {
      this.$showErrorMessage(err);
    }
  }
};
