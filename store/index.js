/*
 * @Description: store集合
 * @Author: danding
 * @Date: 2019-06-17 11:03:16
 * @Last Modified by: danding
 * @Last Modified time: 2019-06-25 16:36:28
 */
import cloneDeep from 'lodash.clonedeep';

export default {
  state: () => ({
    userAuth: undefined, // 用户登录令牌
    originRootState: {}
  }),

  mutations: {
    setUserAuth(state, payload) {
      state.userAuth = payload;
    },
    resetModuleState(state, payload) {
      // 页面切换，重置之前的页面state
      try {
        const { moduleName } = payload;
        const { originRootState } = state;
        if (!moduleName) {
          return;
        }

        if (moduleName === '/') {
          const homeState = cloneDeep(originRootState.home);
          state.home = homeState;
          return;
        }

        if (moduleName.length && moduleName.indexOf('/') === 0) {
          let stateModuleName = moduleName.slice(1);
          stateModuleName = stateModuleName.split('/');
          const folderName = stateModuleName[0];
          const pageName = stateModuleName[1];
          state[folderName][pageName] = cloneDeep(
            originRootState[folderName][pageName]
          );
        }
      } catch (err) {
        console.log('err=', err);
      }
    },
    storeRootState(state, payload) {
      state.originRootState = cloneDeep(state);
    }
  },

  getters: {
    isAuthenticated(state) {
      // 是否登录状态
      return !!state.userAuth;
    }
  },

  actions: {}
};
