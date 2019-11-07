import services from '@/services/project/bug-detail';
import { PRIORITY_MAP } from '@/constants/common/config';

export default {
  async bugDetailQuery({ commit }, payload) {
    try {
      const data = await services.bugDetailQueryApi(payload);
      const {
        attachmentList = [],
        bug = {},
        demand = {},
        module = {},
        testCase = {},
        task = {},
        product = {}
      } = data;
      commit('mutateBugInfo', {
        bugInfo: {
          ...bug,
          creatorName: bug.creator || '-',
          modifierName: bug.modifier || '-',
          osMessage: (bug.os && bug.os.message) || '-',
          browserMessage: (bug.browser && bug.browser.message) || '-',
          productName: product.name || '-',
          moduleName: module.name || '-',
          bugTypeMessage: (bug.type && bug.type.message) || '-',
          assginedPersonName: bug.assignedPerson || '-',
          priorityMessage: PRIORITY_MAP[bug.priority] || '-',
          severityMessage: (bug.severity && bug.severity.message) || '-',
          statusMessage: (bug.status && bug.status.message) || '-'
        },
        attachmentList,
        demand,
        testCase,
        task
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  }
};
