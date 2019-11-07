import service from '@/services/project/relate-use-case';
import services from '@/services/test/relate-use-case';

export default {
  // 测试单关联用例
  async testFormCaseLink({ commit, dispatch, state }, payload) {
    try {
      await service.testFormCaseLinkApi(payload);
      this.$PMRouter.back();
      this.$showSuccessMessage('关联用例成功');
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },
  // 测试套件关联用例
  async createTestSuiteCaseLink({ commit, dispatch, state }, payload) {
    try {
      await services.createTestSuiteCaseLinkApi(payload);
      this.$PMRouter.back();
      this.$showSuccessMessage('关联用例成功');
    } catch (err) {
      this.$showErrorMessage(err);
    }
  }
};
