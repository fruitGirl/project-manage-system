import services from '@/services/product/product-create';

export default {
  async handleProductCreate({ commit, dispatch, rootState }, payload) {
    try {
      await services.productCreateApi(payload);
      await dispatch('common-config/getVisibleProducts', null, { root: true });
      const dependenceId = rootState['common-config'].visibleProducts[0].id;
      await commit(
        'layout/changeSelectedDependenceId',
        { payload: dependenceId },
        { root: true }
      );
      this.$PMRouter.push('/product/home');
    } catch (err) {
      this.$showErrorMessage(err);
    }
  }
};
