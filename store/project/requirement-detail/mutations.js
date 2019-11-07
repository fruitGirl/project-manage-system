export default {
  setDemandDetail(state, { payload }) {
    const { demandDescripts, baseInfos } = payload;
    state.baseInfos = baseInfos;
    state.demandDescripts = demandDescripts;
  },
  setDemandRelateCase(state, { payload }) {
    state.testCaseList = payload;
  },
  setDemandRelateBug(state, { payload }) {
    state.bugList = payload;
  },
  setDemandRelateTask(state, { payload }) {
    state.taskList = payload;
  },
  setLoading(state, { payload }) {
    state.loading = payload;
  },
  setRelateLoading(state, { payload }) {
    state.relateLoading = payload;
  }
};
