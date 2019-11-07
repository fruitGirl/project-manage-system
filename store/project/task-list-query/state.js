const state = () => {
  return {
    dataSource: [],
    pagination: {
      page: 1,
      itemsPerPage: 10,
      pages: 1
    },
    showTaskDetailDrawer: false, // 显示任务详情抽屉
    selectedTaskId: '', // 当前选择的任务id
    taskData: {},
    demandData: {},
    bugList: [],
    appLinkList: [],
    projectData: {},
    attachmentList: []
  };
};

export default state;
