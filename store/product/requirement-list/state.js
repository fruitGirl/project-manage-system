export default () => {
  return {
    defaultSort: {
      // 默认排序规则
      prop: 'date',
      order: 'descending'
    },
    paginator: {
      page: 1,
      items: 0,
      itemsPerPage: 10
    },
    demandLists: [],
    initDemands: {},
    showReqDrawer: false, // 显示需求抽屉
    showUseCaseDrawer: false, // 显示用例抽屉
    isPopover: false,
    storeExecuteUseCaseMsg: {}, // 存储执行的用例详情
    loading: false,
    initTestCaseDatas: {},
    showRequirementDetailDrawer: false, // 显示需求详情抽屉
    showBugDetailDrawer: false, // 显示bug详情抽屉
    showTaskDetailDrawer: false // 任务详情抽屉
  };
};
