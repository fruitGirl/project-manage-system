import {
  getProductsApi,
  getProjectsApi,
  getProductByModuleTreeApi,
  getModulesByProductApi,
  getProjectVersionApi,
  getAllEnabledUserApi,
  getProductAndModuleTreeApi,
  getTreeByTypeApi,
  getuserGroupApi,
  getProjectByProductApi,
  getRoleQueryApi,
  getOperationLogApi,
  demandAssignPersonApi,
  testFormAssignPersonApi,
  getVisibleProductsApi,
  getProductsByProjectApi,
  deleteFileApi
} from '@/services/common-config';
import { tansData } from '@/utils/common';

const actions = {
  // 获取产品下拉数据
  async getProducts({ commit, dispatch, state }, payload) {
    try {
      const data = await getProductsApi(payload);
      const { products = [] } = data;
      commit({ type: 'setProducts', payload: products });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 获取侧边栏产品下拉数据
  async getVisibleProducts({ commit, dispatch, state }, payload) {
    try {
      const data = await getVisibleProductsApi(payload);
      const { products = [] } = data;
      commit({ type: 'setVisibleProducts', payload: products });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 获取项目下拉数据
  async getProjects({ commit, dispatch, state }, payload) {
    try {
      const data = await getProjectsApi(payload);
      const { projects = [] } = data;
      commit({ type: 'setProjects', payload: projects });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 获取产品下的模块树数据
  async getProductByModuleTree({ commit, dispatch, state }, payload) {
    try {
      const data = await getProductByModuleTreeApi(payload);
      const { subModuleInfo = [] } = data;
      commit({ type: 'setProductByModuleTree', payload: subModuleInfo });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 获取产品下的模块数据
  async getModulesByProduct({ commit, dispatch, state }, payload) {
    try {
      const data = await getModulesByProductApi(payload);
      const { moduleList = [] } = data;
      commit({ type: 'setModulesByProduct', payload: moduleList });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 获取项目下的版本号
  async getProjectVersion({ commit, dispatch, state }, payload) {
    try {
      const data = await getProjectVersionApi(payload);
      const { projectVersionList = [] } = data;
      commit({ type: 'setProjectVersion', payload: projectVersionList });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 获取所有可用人员数据
  async getAllEnabledUserApi({ commit }, payload) {
    try {
      const data = await getAllEnabledUserApi(payload);
      commit({
        type: 'setEnabledUsers',
        payload: tansData(data.userIdAndNickNameMap, true)
      });
      return data;
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 需求指派人
  async demandAssignPerson({ commit }, payload) {
    try {
      const data = await demandAssignPersonApi(payload);
      const { labelValueObjects } = data;
      commit({
        type: 'setDemandUsers',
        payload: labelValueObjects
      });
      return data;
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 测试单指派人
  async testFormAssignPerson({ commit }, payload) {
    try {
      const data = await testFormAssignPersonApi(payload);
      const { labelValueObjects } = data;
      commit({
        type: 'setTestFormUsers',
        payload: labelValueObjects
      });
      return data;
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 获取所有角色
  async getRoleQueryApi({ commit }, payload) {
    try {
      const data = await getRoleQueryApi(payload);
      commit({
        type: 'setEnabledRoles',
        payload: data.roleList.map(item => {
          return {
            value: item.id,
            label: item.name
          };
        })
      });
      return data;
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 获取组
  async getuserGroupApi({ commit }, payload) {
    try {
      const data = await getuserGroupApi(payload);
      return data;
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 获取树
  async getTreeByTypeApi({ commit, dispatch, state }, payload) {
    try {
      const data = await getTreeByTypeApi(payload);
      return data;
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 产品模块级联
  async getProductAndModuleTree({ commit, dispatch, state }, payload) {
    try {
      const data = await getProductAndModuleTreeApi(payload);
      const { productModuleList = [] } = data;
      const productModuleLists = productModuleList.map(res => {
        return {
          ...res,
          isProduct: `product${res.id}`
        };
      });
      commit({ type: 'setProductAndModuleTree', payload: productModuleLists });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 产品下的项目
  async getProjectByProduct({ commit, dispatch, state }, payload) {
    try {
      const data = await getProjectByProductApi(payload);
      const { projectList = [] } = data;
      commit({ type: 'setProjectByProduct', payload: projectList });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 操作日志
  async getOperationLog({ commit, dispatch, state }, payload) {
    try {
      commit({ type: 'setOperateLoading', payload: true });
      const data = await getOperationLogApi(payload);
      const { operationLogList = [] } = data;
      commit({ type: 'setOperationLog', payload: operationLogList });
      commit({ type: 'setOperateLoading', payload: false });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 获取项目下的产品下拉数据
  async getProductsByProject({ commit, dispatch, state }, payload) {
    try {
      const data = await getProductsByProjectApi(payload);
      const { productList = [] } = data;
      commit({ type: 'setProductsByProject', payload: productList });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 删除文件
  async deleteFile({ commit }, payload) {
    try {
      await deleteFileApi(payload);
      this.$showSuccessMessage('删除成功');
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },
};

export default actions;
