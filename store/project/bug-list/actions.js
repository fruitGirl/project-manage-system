import services from '@/services/project/bug-list';
import { PRIORITY } from '@/constants/common/config';

export default {
  async bugPageQuery({ commit }, payload) {
    try {
      const data = await services.bugPageQueryApi(payload);
      commit({
        type: 'mutateList',
        payload: data.pageQueryResult.list.map(item => {
          const { assignedPerson = "-", creator = "-", solver = "-", versionType, title } = item;
          PRIORITY.map(level => {
            if (level.value === item.priority) {
              item.priority = level.label;
            }
          });
          return {
            ...item,
            title: versionType ? `[${versionType.message}]${title}` : title,
            priority: item.priority || '-',
            assignedPerson,
            solver,
            creator,
            type: (item.type && item.type.message) || '-',
            status: (item.status && item.status.name) || '-',
            testCaseSourceType: (item.testCaseSourceType && item.testCaseSourceType.message) || '-',
            resolution: (item.resolution && item.resolution.message) || '-',
            severity: (item.severity && item.severity.message) || '-'
          };
        })
      });
      commit({
        type: 'mutationPagination',
        payload: data.pageQueryResult.paginator
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },
  async activateBug({ commit }, payload) {
    await services.activateBugApi(payload);
  },
  async closeBug({ commit }, payload) {
    await services.closeBugApi(payload);
  },
  async solveBug({ commit }, payload) {
    await services.solveBugApi(payload);
  },
  async bugCreate({ commit }, payload) {
    await services.bugCreateApi(payload);
  },
  async bugDelete({ commit }, payload) {
    await services.bugDeleteApi(payload);
  },
  async bugModifyInitPage({ commit }, payload) {
    const data = await services.bugModifyInitPageApi(payload);
    return data;
  },
  async bugModify({ commit }, payload) {
    await services.bugModifyApi(payload);
  }
};
