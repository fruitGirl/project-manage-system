import services from '@/services/product/requirement-list';

import useCaseListServices from '@/services/test/use-case-list';

export default {
  // 需求列表
  async getDemandPage({ commit, dispatch, state }, payload) {
    try {
      commit({ type: 'setLoading', payload: true });
      const data = await services.getDemandPageApi(payload);
      const { queryResult = [] } = data;
      const { list = [], paginator = {} } = queryResult;
      commit({
        type: 'setDemandPage',
        payload: {
          list,
          paginator
        }
      });
      commit({ type: 'setLoading', payload: false });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 修改状态
  async modifyDemandStatus({ commit, dispatch, state }, payload) {
    try {
      await services.modifyDemandStatusApi(payload);
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 修改指派人
  async modifyDemandAssignPerson({ commit, dispatch, state }, payload) {
    try {
      await services.modifyDemandAssignPersonApi(payload);
    } catch (err) {
      this.$showErrorMessage(err);
    } finally {
      commit({ type: 'setPopover', payload: false });
    }
  },

  // 提需求
  async createDemand({ commit, dispatch, state }, payload) {
    try {
      const createData = JSON.parse(JSON.stringify(payload));
      delete createData.isCreate;
      await services.createDemandApi(createData);
    } catch (err) {
      this.$showErrorMessage(err);
    } finally {
      const { isCreate } = payload;
      if (!isCreate) commit({ type: 'setReqDrawer', payload: false });
    }
  },

  // 编辑需求回填
  async getInitDemand({ commit, dispatch, state }, payload) {
    try {
      const data = await services.getInitDemandApi(payload);
      const {
        demandDescription = {},
        demand = {},
        parentModuleIds = [],
        attachmentList = [],
        nickName
      } = data;
      const { description } = demandDescription;
      const params = {
        ...demand,
        description,
        parentModuleIds: parentModuleIds[parentModuleIds.length -1],
        attachmentList,
        nickName
      };
      commit({ type: 'setInitDemand', payload: params });
      commit({ type: 'setReqDrawer', payload: true });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 编辑需求
  async modifyDemand({ commit, dispatch, state }, payload) {
    try {
      await services.modifyDemandApi(payload);
    } catch (err) {
      this.$showErrorMessage(err);
    } finally {
      commit({ type: 'setReqDrawer', payload: false });
    }
  },

  // 新建用例
  async saveUseCase({ dispatch, commit, state }, payload) {
    try {
      await useCaseListServices.createUseCaseApi(payload);
      await commit({ type: 'displayUseCaseDrawer', payload: false });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 用例回填
  async getInitDemandTestCase({ commit, dispatch, state }, payload) {
    try {
      const data = await services.getInitDemandTestCaseApi(payload);
      const { demand, product, module } = data;
      const initTestCaseDatas = {
        demandId: demand.id,
        productId: product.id,
        moduleId: module ? module.id : undefined,
        priority: 3
      };
      commit({ type: 'setInitDemandTestCase', payload: initTestCaseDatas });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  }
};
