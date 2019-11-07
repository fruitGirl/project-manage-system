import homeServices from '@/services/product/home';
import reqListServices from '@/services/product/requirement-list';

export default {
  async getProductHomeData({ commit }, payload) {
    try {
      const data = await homeServices.getProductHomeDataApi(payload);
      commit('setProductHomeData', data);
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 提需求
  async createDemand({ commit, dispatch, state }, payload) {
    try {
      await reqListServices.createDemandApi(payload);
      this.$showSuccessMessage('操作成功');
      dispatch('getProductHomeData', { productId: state.productId });
    } catch (err) {
      this.$showErrorMessage(err);
    } finally {
      commit({ type: 'setReqDrawer', payload: false });
    }
  }
};
