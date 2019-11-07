export default {
  getProjectHomeData(state, payload) {
    const {
      bugStatusNumMap,
      taskTypeAndDetailList,
      taskStatusNumMap,
      testReportList,
      project,
      statusList,
      taskList,
    } = payload;
    state.bugStatusNumMap = bugStatusNumMap;
    state.taskTypeAndDetailList = taskTypeAndDetailList;
    state.taskStatusNumMap = taskStatusNumMap;
    state.testReportList = testReportList;
    state.projectData = project;
    state.statusList = statusList;
    state.taskList = taskList;
  },
  setProjectBaseInfo(state, { payload }) {
    state.projectBaseInfo = payload;
  },
  setBaseInfoLoading(state, { payload }) {
    state.baseInfoLoading = payload;
  }
};
