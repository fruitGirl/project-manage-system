export default {
  getTestPlanData(state, payload) {
    state.testPlanData = payload.testPlanData;
    state.attachmentList = payload.attachmentList;
  },
  getOperationLogData(state, payload) {
    state.operationLogList = payload.operationLogList;
  }
};
