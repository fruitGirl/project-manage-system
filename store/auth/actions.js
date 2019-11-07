import services from '@/services/auth';
import qs from 'qs';
import {
  saveUserInfo,
  getToken,
  clearToken,
  getUserInfo
} from '@/utils/auth';
import { resetRecentDependenceId } from '@/utils/storage';

const actions = {
  async handleLogin({ commit }, payload) {
    try {
      const data = await services.loginApi(payload);
      const { user = {} } = data;
      await commit('setUserAuth', getToken(), { root: true });
      const searchObj = qs.parse(window.location.search, {
        ignoreQueryPrefix: true
      });
      let redirectUrl = searchObj.redirectUrl
        ? decodeURIComponent(searchObj.redirectUrl)
        : '/';
      const currentUserInfo = getUserInfo() || {};

      // 切换用户,清空选择的项目/产品，回到首页
      if (user.userId !== currentUserInfo.userId) {
        resetRecentDependenceId();
        redirectUrl = '/';
      }
      saveUserInfo(user);
      this.$router.push(redirectUrl);
    } catch (err) {
      commit({ type: 'changeCodeUrl' });
      this.$showErrorMessage(err);
    }
  },
  async handleLogout({ commit }, payload) {
    try {
      await services.logoutApi(payload);
      await commit('setUserAuth', null, { root: true });
      clearToken();
      window.location.href = '/auth/login';
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },
  async handleRefreshRole({ commit }, payload) {
    try {
      await services.refreshRoleApi(payload);
      window.location.reload();
    } catch (err) {
      this.$showErrorMessage(err);
    }
  }
};

export default actions;
