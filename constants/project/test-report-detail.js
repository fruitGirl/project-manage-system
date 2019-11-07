export const BASELISTS = [
  {
    label: '项目',
    field: 'projectName'
  },
  {
    label: '预计起止时间',
    field: 'gmtEstimate'
  },
  {
    label: '实际起止时间',
    field: 'gmtActual'
  },
  {
    label: '版本',
    field: 'projectVersionName'
  },
  {
    label: '负责人',
    field: 'managerName'
  },
  {
    label: '发布人',
    field: 'publisherName'
  },
  {
    label: '发布时间',
    field: 'gmtPublish'
  },
  {
    label: '项目成员',
    field: 'memberName'
  }
];
export const TABBASELISTS = [
  {
    label: '测试用例',
    field: 'allCase'
  },
  {
    label: '通过率',
    field: 'passRate'
  },
  {
    label: '通过',
    field: 'successCase'
  },
  {
    label: '未通过',
    field: 'failCase'
  },
  {
    label: '未执行',
    field: 'unexecutedCase'
  },
  {
    label: '产生BUG',
    field: 'allBug'
  },
  {
    label: '处理率',
    field: 'handleRate'
  },
  {
    label: '已关闭',
    field: 'closedBug'
  },
  {
    label: '已处理',
    field: 'resolvedBug'
  },
  {
    label: '激活',
    field: 'activatedBug'
  }
];
// 测试范围表格头部
export const RANGECOLUMN = [
  {
    label: '优先级',
    width: 90,
    prop: 'priority',
    show: true
  },
  {
    label: '总需求',
    prop: 'title'
  },
  {
    label: '状态',
    prop: 'status.message'
  },
  {
    label: '创建',
    prop: 'creatorName'
  },
  {
    label: '指派',
    prop: 'assignedName'
  }
];
// 测试用例表格头部
export const CASECOLUMN = [
  {
    label: '优先级',
    width: 90,
    prop: 'priority',
    show: true
  },
  {
    label: '用例标题',
    prop: 'title'
  },
  {
    label: '类型',
    prop: 'type.message'
  },
  {
    label: '最后执行人',
    prop: 'executor'
  },
  {
    label: '结果',
    prop: 'result.message'
  },
  {
    label: '最后执行时间',
    prop: 'latestDate'
  },
  {
    label: '剩余BUG',
    prop: 'bugNum'
  }
];
