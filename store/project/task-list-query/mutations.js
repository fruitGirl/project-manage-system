export default {
  setTaskListData(state, payload) {
    state.dataSource = payload.dataSource;
    state.pagination = payload.pagination;
  },
  displayTaskDetailDrawer(state, payload) {
    state.showTaskDetailDrawer = payload;
  },
  setSelectedTaskId(state, payload) {
    state.selectedTaskId = payload;
  },
  setTaskData(state, payload) {
    state.taskData = payload.task;
    state.demandData = payload.demand;
    state.bugList = payload.bugList;
    state.appLinkList = payload.appLinkList;
    state.projectData = payload.project;
    state.attachmentList = payload.attachmentList;
  }
};
