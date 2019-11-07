import services from '@/services/product/product-list-query';

export default {
  async getProductList({ commit, dispatch, state }, payload) {
    try {
      const data = await services.productListApi(payload);
      commit({
        type: 'setProductList',
        payload: {
          dataSource: data.pageQueryResult.list,
          pagination: data.pageQueryResult.paginator
        }
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  }
};
