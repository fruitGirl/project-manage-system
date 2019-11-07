import services from '@/services/system/role-manage';

export default {
  async getRoleQueryApi({ commit }, payload) {
    try {
      const data = await services.getRoleQueryApi(payload);
      commit({
        type: 'mutationList',
        payload: data.roleList
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  async roleModifyApi({ commit }, payload) {
    await services.roleModifyApi(payload);
  },

  async roleCreateApi({ commit }, payload) {
    await services.roleCreateApi(payload);
  }
};
