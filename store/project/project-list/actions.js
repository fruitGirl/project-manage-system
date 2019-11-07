import services from '@/services/project/project-list';
import editProServices from '@/services/project/edit-project';
import cloneDeep from 'lodash.clonedeep';

export default {
  // 查询项目列表
  async handleSubmit({ commit, state }, payload) {
    try {
      await commit({ type: 'setTableLoading', payload: true });
      const { savedSearchVals } = state;
      const searchVals = {
        ...savedSearchVals,
        currentPage: 1,
        ...payload
      };
      const data = await services.getListApi(searchVals);
      const {
        pageQueryResult = {},
      } = data;
      const { list = [], paginator = {} } = pageQueryResult;
      const combineList = list.map(i => {
        return {
          ...i,
          productNum: i.productNum,
          memberNum: i.memberNum,
          projectManage: i.projectManager
        };
      });
      commit({
        type: 'updateSearchListResult',
        payload: {
          list: combineList,
          paginator,
          savedSearchVals: cloneDeep(searchVals)
        }
      });
    } catch (err) {
      this.$showErrorMessage(err);
    } finally {
      await commit({ type: 'setTableLoading', payload: false });
    }
  },

  // 获取关联产品
  async getRelateProduct({ commit, state }, payload) {
    try {
      const data = await services.getRelateProductApi({ projectId: payload.id });
      const { linkedProduct = [], products = [] } = data;
      await commit({
        type: 'setRelateProduct',
        payload: {
          linkedProduct,
          products
        }
      });
      await commit({ type: 'displayRelateProductDrawer', payload: true });
      await commit({ type: 'setCurHandleProject', payload });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 保存关联产品
  async saveRelateProduct({ commit, state, dispatch }, payload) {
    try {
      await services.saveRelateProductApi(payload);
      await commit({ type: 'displayRelateProductDrawer', payload: false });
      await dispatch('handleSubmit');
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 获取项目详情
  async getProjectMsg({ commit, state }, payload) {
    try {
      const data = await services.getProjectMsgApi(payload);
      const { productLinked, project, userIdAndNickNameMap = {} } = data;
      const { gmtEstimateStart, gmtEstimateEnd, type, visitType } = project;
      const productIds = productLinked.map(i => i.id) || [];
      const gmtEstimate = [gmtEstimateStart, gmtEstimateEnd];
      const defaultUserOption = Object.keys(userIdAndNickNameMap).map(i => {
        return {
          label: userIdAndNickNameMap[i],
          value: i
        };
      });
      await commit({
        type: 'setCurEditProject',
        payload: {
          ...project,
          type: type.name,
          visitType: visitType.name,
          productIds,
          gmtEstimate,
          defaultUserOption // 负责人的花名
        }
      });
      await commit({ type: 'displayProjectMsgDrawer', payload: true });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 保存项目信息
  async saveProjectMsg({ commit, state, dispatch }, payload) {
    try {
      delete payload.gmtEstimate;
      delete payload.status;
      delete payload.defaultUserOption;
      await editProServices.saveProjectMsgApi(payload);
      this.$showSuccessMessage('修改成功');
      await commit({ type: 'displayProjectMsgDrawer', payload: false });
      await dispatch('handleSubmit');
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 获取项目详情
  async getProjectTeam({ commit, state }, payload) {
    try {
      const data = await services.getProjectTeamApi(payload);
      await commit({ type: 'storeTeamMsg', payload: data });
      await commit({ type: 'displayTeamDrawer', payload: true });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  }
};
