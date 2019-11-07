import services from '@/services/project/project-list';

export default {
  // 获取关联产品
  async getRelateProduct({ commit, state }, payload) {
    try {
      const data = await services.getRelateProductApi(payload);
      const { linkedProduct = [], products = [] } = data;
      await commit({
        type: 'setRelateProduct',
        payload: {
          linkedProduct,
          products
        }
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 保存关联产品
  async saveRelateProduct({ commit, state, dispatch }, payload) {
    try {
      await services.saveRelateProductApi(payload);
      this.$showSuccessMessage('保存成功');
    } catch (err) {
      this.$showErrorMessage(err);
    }
  }
};
