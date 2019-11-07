export default () => {
  return {
    paginator: {
      page: 1,
      items: 0,
      itemsPerPage: 10
    },
    demandLists: [],
    loading: false,
    showRequirementDetailDrawer: false, // 显示需求详情抽屉
    showBugDetailDrawer: false, // 显示bug详情抽屉
    showTaskDetailDrawer: false // 任务详情抽屉
  };
};
