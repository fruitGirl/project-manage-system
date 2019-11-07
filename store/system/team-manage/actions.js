import services from '@/services/system/team-manage';

export default {
  async getTeamListApi({ commit }, payload) {
    const data = await services.getTeamListApi(payload);
    commit({
      type: 'mutationTeamList',
      payload: data.pageList.list
    });
    commit({
      type: 'mutationPagination',
      payload: data.pageList.paginator
    });
  },

  async teamModifyEnabledApi({ commit }, payload) {
    await services.teamModifyEnabledApi(payload);
  }
};
