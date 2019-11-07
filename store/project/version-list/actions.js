import services from '@/services/project/version-list';

export default {
  async getProjectVersionListApi({ commit }, payload) {
    try {
      const data = await services.getProjectVersionListApi(payload);
      const { projectVersionList = [] } = data;
      commit({
        type: 'setProjectVersionList',
        payload: projectVersionList.map(item => {
          return {
            ...item,
            needName: `[${item.type.message}]${item.name}`,
            typeMessage: item.type.message
          };
        })
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },
  async projectVersionCreateApi({ commit }, payload) {
    await services.projectVersionCreateApi(payload);
  },
  async projectVersionModifyApi({ commit }, payload) {
    await services.projectVersionModifyApi(payload);
  },
  async projectVersionDeleteApi({ commit }, payload) {
    await services.projectVersionDeleteApi(payload);
  }
};
