import useCaseListServices from '@/services/test/use-case-list';
import { PRIORITY } from '@/constants/common/config';
import { filterEnumsLabel } from '@/utils/common';
import { changeSortNumber } from '@/constants/test/use-case-list';
import { getOperationLogApi } from '@/services/common-config';

export default {
  async getDetailInfo({ commit }, payload) {
    try {
      const data = await useCaseListServices.getUseCaseMsgApi(payload);
      const {
        testCase = {},
        module = {},
        user = {},
        product = {},
        bugs = [],
        demand
      } = data;
      const { attachmentList = [] } = data;
      let { describeType = {}, type, priority, testCaseSteps = [] } = testCase;
      const { gmtCreate } = testCase;
      priority = filterEnumsLabel(PRIORITY)(priority);
      describeType = describeType.message;
      type = type.name;
      const moduleName = module.name;
      const productName = product.name;
      const { nickName } = user;
      testCaseSteps = changeSortNumber(testCaseSteps);
      testCase.testCaseSteps = testCaseSteps;
      commit({
        type: 'storeDetailMsg',
        payload: {
          attachmentList,
          type,
          describeType,
          testCase,
          moduleName,
          productName,
          nickName,
          priority,
          gmtCreate,
          bugs,
          requirement: demand ? [demand] : []
        }
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  async getOperateHistory({ commit }, payload) {
    try {
      const params = {
        operateObjectType: 'TEST_CASE',
        operateObjectId: payload.testCaseId
      };
      const data = await getOperationLogApi(params);
      const { operationLogList = [] } = data;
      const operateHistory = operationLogList.map(item => {
        return {
          content: `${item.operator}  ${item.actionType.message}`,
          time: item.gmtCreate,
          memos: [item.memo]
        };
      });
      commit({ type: 'storeOperateHistory', payload: operateHistory });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  async handleDelete({ commit, dispatch, state }, payload) {
    try {
      await useCaseListServices.deleteUseCaseApi(payload);
      this.$showSuccessMessage('删除成功!');
      this.$PMRouter.back();
    } catch (err) {
      this.$showErrorMessage(err);
    }
  }
};
