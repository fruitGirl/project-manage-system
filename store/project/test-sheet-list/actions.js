import services from '@/services/project/test-sheet-list';

export default {
  // 测试单列表查询
  async getTestFormPageQuery({ commit, dispatch, state }, payload) {
    try {
      commit({ type: 'setLoading', payload: true });
      const data = await services.testFormPageQueryApi(payload);
      const { queryResult = [] } = data;
      const { list = [], paginator = {} } = queryResult;
      const combineList = list.map(i => {
        const { status, testProgress, executedCase, allCase, successCase, passingRate } = i;
        return {
          ...i,
          statusName: status.message,
          progress: `${Math.round(testProgress * 100)}%(${executedCase}/${
            allCase
          })`,
          pass: `${Math.round(passingRate * 100)}%(${successCase}/${
            allCase
          })`
        };
      });
      commit({
        type: 'getTestQuery',
        payload: {
          list: combineList,
          paginator
        }
      });
    } catch (err) {
      this.$showErrorMessage(err);
    } finally {
      commit({ type: 'setLoading', payload: false });
    }
  },

  // 完成测试
  async finishTestForm({ commit }, payload) {
    try {
      await services.finishTestFormApi(payload);
      this.$showSuccessMessage('完成测试成功');
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 关闭测试单
  async closeTestForm({ commit }, payload) {
    try {
      await services.closeTestFormApi(payload);
      this.$showSuccessMessage('关闭成功!');
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 获取bug列表
  async getBugsList({ dispatch, commit, state }, payload) {
    const {
      bugs = []
    } = await services.getTestFormBugLinkApi(payload);
    const combineList = bugs.map(i => {
      return {
        ...i,
        assignedPerson: i.assignedPerson || '-'
      };
    });

    await commit({ type: 'storeBugList', payload: combineList });
    await commit({ type: 'displayBugDialog', payload: true });
  }
};
