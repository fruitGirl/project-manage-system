import service from '@/services/project/editor-test';

export default {
  // 新增测试单
  async testFormCreate({ commit }, payload) {
    try {
      await service.testFormCreateApi(payload);
      this.$showSuccessMessage('新增测试单成功');
      this.$PMRouter.push('/test/test-sheet-list');
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },
  // 编辑测试单
  async testFormModify({ commit }, payload) {
    try {
      await service.testFormModifyApi(payload);
      this.$showSuccessMessage('编辑测试单成功');
      this.$PMRouter.back();
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },
  // 回填编辑测试单
  async testFormModifyInit({ commit }, payload) {
    try {
      const data = await service.testFormModifyInitApi(payload);
      const { testForm = {} } = data;
      commit({ type: 'getTestModify', payload: testForm });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  }
};
