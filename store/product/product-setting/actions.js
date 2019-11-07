import services from '@/services/product/product-setting';

export default {
  // 进入页面的初始回填信息
  async handleProductModifyInit({ commit, dispatch, state }, payload) {
    const { data } = payload;
    try {
      const result = await services.productModifyInitApi(data);
      const { product = {}, userBaseInfos = [] } = result;
      const combineUserBaseInfos = userBaseInfos.map(i => {
        return {
          label: i.nickName,
          value: i.userId
        };
      });
      commit('setProductSettingData', {
        productInitData: {
          ...product,
          userBaseInfos: combineUserBaseInfos
        }
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 编辑产品接口
  async handleProductModify({ commit, dispatch, state }, payload) {
    const data = await services.productModifyApi(payload);
    return data;
  }
};
