import services from '@/services/project/team-manage';

export default {
  async getProjectMemberApi({ commit }, payload) {
    try {
      const data = await services.getProjectMemberApi(payload);
      const {
        developManager = "-",
        productManager = "-",
        projectManager = "-",
        testManager = "-",
        name
      } = data.project;
      commit({
        type: 'mutationMemberList',
        payload: data.projectMemberInfoList.map(item => {
          return {
            id: item.id,
            name: item.userName || '',
            role: item.roleName || '',
            userId: item.userId || '',
            roleId: item.roleId || '',
            days: item.days || '',
            hours: item.hours || '',
            totalEstimatedHours: item.totalEstimatedHours || '',
            estimateLeftHours:
              item.totalEstimatedHours - item.taskEstimateHours || '',
            actualHoursConsumed: item.actualHoursConsumed || '',
            userDefaultOptions: item.userId ? [
              { label: item.userName || '', value: item.userId }
            ] : []
          };
        })
      });
      commit({
        type: 'mutationTeamInfo',
        payload: {
          developManager,
          productManager,
          projectManager,
          testManager,
          name
        }
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  async projectMemberModifyApi({ commit }, payload) {
    await services.projectMemberModifyApi(payload);
  },
  async projectMemberDeleteApi({ commit }, payload) {
    await services.projectMemberDeleteApi(payload);
  }
};
