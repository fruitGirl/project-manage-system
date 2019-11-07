import services from '@/services/product/module-setting';

export default {
  async getTreeData({ commit }, payload) {
    try {
      const result = await services.getTreeDataApi(payload);
      const { productModuleList = [] } = result;
      let finalList = JSON.parse(JSON.stringify(productModuleList));
      if (
        finalList[0] &&
        finalList[0].subModuleInfo &&
        finalList[0].subModuleInfo.length === 0
      ) {
        finalList = [];
      }

      commit({ type: 'setTreeData', payload: finalList });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },
  async moduleCreate({ commit }, payload) {
    await services.moduleCreateApi(payload);
  },
  async moduleDelete({ commit }, payload) {
    await services.moduleDeleteApi(payload);
  },
  async moduleEdit({ commit }, payload) {
    await services.moduleEditApi(payload);
  },
  async moduleDrag({ commit }, payload) {
    await services.moduleDragApi(payload);
  }
};
