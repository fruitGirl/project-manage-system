import services from '@/services/test/editor-kit';

export default {
  // 新增测试套件
  async testSuiteCreate({ commit }, payload) {
    try {
      await commit({ type: 'setTestLoading', payload: true });
      await services.testSuiteCreateApi(payload);
      this.$showSuccessMessage('新增测试套件成功');
      this.$PMRouter.push('/test/test-kit');
    } catch (err) {
      this.$showErrorMessage(err);
    } finally {
      await commit({ type: 'setTestLoading', payload: false });
    }
  },

  // 编辑测试套件
  async testSuiteModify({ commit }, payload) {
    try {
      await commit({ type: 'setTestLoading', payload: true });
      await services.testSuiteModifyApi(payload);
      this.$showSuccessMessage('编辑测试套件成功');
      this.$PMRouter.push('/test/test-kit');
    } catch (err) {
      this.$showErrorMessage(err);
    } finally {
      await commit({ type: 'setTestLoading', payload: false });
    }
  },

  // 回填测试套件
  async testSuiteModifyInit({ commit }, payload) {
    try {
      await commit({ type: 'setTestLoading', payload: true });
      const data = await services.testSuiteModifyInitApi(payload);
      const { testSuite = {} } = data;
      commit({ type: 'initTestSuiteModify', payload: testSuite });
    } catch (err) {
      this.$showErrorMessage(err);
    } finally {
      await commit({ type: 'setTestLoading', payload: false });
    }
  }
};
