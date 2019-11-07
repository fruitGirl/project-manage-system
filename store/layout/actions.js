import services from '@/services/layout';
import {
  FIX_TOP_MENU,
  TOP_MENU_CONFIG,
  PROJECT_SELECT_TYPE,
  PRODUCT_SELECT_TYPE
} from '@/constants/layout';
import qs from 'qs';
import { getRecentDependenceId } from '@/utils/storage';

// 格式化侧边栏下拉数据成下拉标准格式
const formatEmumToOpts = (data) => {
  return data.map(i => {
    const { id, name } = i;
    return {
      label: name,
      value: id
    };
  });
};

const actions = {
  // 获取顶部菜单栏
  async getTopMenus({ commit }, payload) {
    try {
      const data = await services.getTopMenusApi(payload);
      let { topMenuList = [] } = data;
      topMenuList = topMenuList.map(i => {
        const { id, name } = i;
        return {
          label: name,
          value: String(id)
        };
      });
      topMenuList.unshift(FIX_TOP_MENU);
      await commit({ type: 'setTopMenus', payload: topMenuList });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 获取侧边栏
  async getSiderMenus({ commit, dispatch, getters }, payload) {
    try {
      const { topMenuId, isManualTrigger } = payload;

      // 非手动选择顶部菜单栏，请求侧边栏数据
      if (!isManualTrigger) {
        const data = await services.getSideMenusApi(payload);
        const { mainMenuList = [] } = data;
        const combineList = mainMenuList.map(i => {
          const { sortMenus } = i;
          const children = sortMenus || [];
          delete i.sortMenus;
          return {
            ...i,
            children
          };
        });
        await commit({ type: 'setSiderMenus', payload: combineList });
      }

      const matchedItem = TOP_MENU_CONFIG.find(i => i.id === topMenuId);
      let dependenceId = '';
      const { dependence } = matchedItem;

      // 侧边栏下拉显示项目类型
      if (dependence === PROJECT_SELECT_TYPE) {
        await dispatch('getProjects');
        dependenceId = getters.firstDependenceId;
      } else if (dependence === PRODUCT_SELECT_TYPE) { // 产品类型
        await dispatch('getProducts');
        dependenceId = getters.firstDependenceId;
      }

      // 手动触发顶部菜单栏时，跳转至相应的模块首页
      if (isManualTrigger) {
        dependenceId = getRecentDependenceId(dependence) || dependenceId;
        window.location.href = `${matchedItem.redirect}?dependenceId=${dependenceId}`;
        return;
      } else {
        const searchObj = qs.parse(window.location.search, {
          ignoreQueryPrefix: true
        });
        dependenceId = searchObj.dependenceId || dependenceId;
      }
      await commit({
        type: 'changeSelectedDependenceId',
        payload: dependenceId
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 选择顶部菜单栏
  async changeTopMenuItem({ commit, dispatch }, payload) {
    try {
      await commit({ type: 'changeSelectedTopItem', payload });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 获取侧边栏产品下拉数据
  async getProducts({ commit }, payload) {
    try {
      const data = await services.getProductsApi(payload);
      const { products = [], stopProducts = [], otherProducts = [] } = data;
      const allProduct = [
        {
          label: '与我相关',
          options: formatEmumToOpts(products)
        },
        {
          label: '其他',
          options: formatEmumToOpts(otherProducts)
        },
        {
          label: '停止运营',
          options: formatEmumToOpts(stopProducts)
        }
      ];
      commit({ type: 'setDependenceData', payload: allProduct });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 获取侧边栏项目下拉数据
  async getProjects({ commit }, payload) {
    try {
      const data = await services.getProjectsApi(payload);
      const { projects = [], otherProjects = [], finishProject = [] } = data;
      const allProject = [
        {
          label: '与我相关',
          options: formatEmumToOpts(projects)
        },
        {
          label: '其他',
          options: formatEmumToOpts(otherProjects)
        },
        {
          label: '已结束',
          options: formatEmumToOpts(finishProject)
        }
      ];
      commit({ type: 'setDependenceData', payload: allProject });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },
};

export default actions;
