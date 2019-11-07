import services from '@/services/system/create-team';

export default {
  async createTeamApi({ commit }, payload) {
    await services.createTeamApi(payload);
  }
};
