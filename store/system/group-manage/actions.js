import services from '@/services/system/group-manage';

export default {
  async groupQueryApi({ commit }, payload) {
    try {
      const data = await services.groupQueryApi(payload);
      commit({
        type: 'mutationList',
        payload: data.groupList
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  async groupModifyApi({ commit }, payload) {
    await services.groupModifyApi(payload);
  },

  async groupCreateApi({ commit }, payload) {
    await services.groupCreateApi(payload);
  },
  async authorityGroupSetApi({ commit }, payload) {
    await services.authorityGroupSetApi(payload);
  },
  async groupUserSetInitApi({ commit }, payload) {
    try {
      const data = await services.groupUserSetInitApi(payload);
      commit({
        type: 'setTransData',
        selectOptions: data.groupList.map(item => {
          return {
            value: item.id,
            label: item.name
          };
        }),
        transAllList: data.userList.map(item => {
          return {
            value: item.userId,
            label: item.nickName
          };
        }),
        transItems: data.userIds
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },
  async authorityGroupSetInitApi({ commit }, payload) {
    try {
      const data = await services.authorityGroupSetInitApi(payload);
      commit({
        type: 'setTransData',
        selectOptions: data.groupList.map(item => {
          return {
            value: item.id,
            label: item.name
          };
        }),
        transAllList: data.authorityList.map(item => {
          return {
            value: item.id,
            label: item.name
          };
        }),
        transItems: data.authorityIds
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  }
};
