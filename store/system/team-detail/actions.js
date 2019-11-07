import services from '@/services/system/team-detail';

const formatDataTeamDetail = data => {
  return data.memberList.map(item => {
    return {
      id: item.id,
      enabled: item.enabled,
      teamRole: item.roleId || '-',
      name: item.userId || '-'
    };
  });
};

export default {
  async getTeamDetailQueryApi({ commit }, payload) {
    try {
      const data = await services.getTeamDetailQueryApi(payload);
      commit({ type: 'mutationList', payload: formatDataTeamDetail(data) });
      commit({
        type: 'mutationTeamInfo',
        payload: {
          ...data.team,
          creator: data.team.creator || '无',
          modifier:data.team.modifier || '无'
        }
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  }
};
