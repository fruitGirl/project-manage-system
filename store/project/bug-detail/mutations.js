export default {
  mutateBugInfo(state, payload) {
    state.bugInfo = payload.bugInfo;
    state.attachmentList = payload.attachmentList;
    state.demand = payload.demand;
    state.testCase = payload.testCase;
    state.task = payload.task;
  }
};
