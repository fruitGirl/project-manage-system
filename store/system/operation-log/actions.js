import services from '@/services/system/operation-log';

export default {
  async getOperationLogApi({ commit }, payload) {
    try {
      const data = await services.getOperationLogApi(payload);
      commit({ type: 'mutationOperationList', payload: data.pageList.list });
      commit({
        type: 'mutationPagination',
        payload: data.pageList.paginator
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  async getActionTypesOptionsApi({ commit }, payload) {
    try {
      const params = {
        fullPath:
          'com.bench.app.pm.api.web.base.core.model.log.enums.OperationLogOperateActionTypeEnum'
      };
      const data = await services.getSelectionOptionsApi(params);

      commit({
        type: 'mutationActionTypesOptions',
        payload: data.fullPath
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  async getOperateObjTypesOptionsApi({ commit }, payload) {
    try {
      const params = {
        fullPath:
          'com.bench.app.pm.api.web.base.core.model.log.enums.OperationLogOperateObjectTypeEnum'
      };
      const data = await services.getSelectionOptionsApi(params);
      commit({
        type: 'mutationOperateObjTypesOptions',
        payload: data.fullPath
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  }
};
