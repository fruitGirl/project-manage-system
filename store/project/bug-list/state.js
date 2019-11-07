export default () => {
  return {
    defaultSort: {
      // 默认排序规则
      prop: 'date',
      order: 'descending'
    },
    pagination: {
      page: 0,
      pages: 1,
      itemsPerPage: 10,
      items: 0
    },
    list: [], // 表单数据
    showReqDrawer: false, // 显示需求抽屉
    showUseCaseDrawer: false, // 显示用例抽屉
    showBugDetailDrawer: false, // 显示详情抽屉
    showCreateRequirementDrawer: false, // 提需求抽屉
    showCreateUseCaseDrawer: false, // 提需求抽屉
    showRequirementDetailDrawer: false, // 显示需求详情抽屉
    showTaskDetailDrawer: false // 任务详情抽屉
  };
};
