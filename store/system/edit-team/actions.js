import services from '@/services/system/edit-team';

export default {
  async getTeamByIdApi({ commit }, payload) {
    try {
      const data = await services.getTeamByIdApi(payload);
      commit({
        type: 'mutationList',
        payload: data.teamMemberList.map(item => {
          return {
            ...item,
            userDefaultOptions: item.userId ? [
              { label: item.nickName || '', value: item.userId }
            ] : []
          };
        })
      });
      commit({ type: 'mutationTeamInfo', payload: data.team });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  async teamModifyApi({ commit }, payload) {
    await services.teamModifyApi(payload);
  },

  async teamMemberDeleteApi({ commit }, payload) {
    await services.teamMemberDeleteApi(payload);
  }
};
