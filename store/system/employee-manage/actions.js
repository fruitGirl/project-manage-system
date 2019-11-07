import services from '@/services/system/employee-manage';

export default {
  async getUserListApi({ commit }, payload) {
    const data = await services.getUserListApi(payload);
    commit({
      type: 'mutationList',
      payload: data.queryResult.list.map(item => {
        item.role =
          (data.userIdAndGroupMap[item.userId] &&
            data.userIdAndGroupMap[item.userId]
              .map(item => item.name)
              .join()) ||
          '-';
        return item;
      })
    });
    commit({
      type: 'mutationPagination',
      payload: data.queryResult.paginator
    });
  },

  async userGroupSetApi({ commit }, payload) {
    const data = await services.userGroupSetApi(payload);
    return data;
  },
  
  async groupUserSetApi({ commit }, payload) {
    const data = await services.groupUserSetApi(payload);
    return data;
  }
};
