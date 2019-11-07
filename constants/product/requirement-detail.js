export const PATHS = [
  {
    path: '/product/requirement-list',
    name: '需求列表'
  },
  {
    path: '',
    name: '需求详情'
  }
];

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

// 基本信息配置
export const BASEINFOLIST = [
  {
    label: '创建人',
    field: 'creator'
  },
  {
    label: '状态',
    field: 'statusName'
  },
  {
    label: '所属产品',
    field: 'productName'
  },
  {
    label: '指派给',
    field: 'assignedPersonName'
  },
  {
    label: '预期',
    field: 'gmtEstimate'
  },
  {
    label: '所属模块',
    field: 'moduleName'
  }
];

export const CASECOLUMNS = [
  {
    label: '用例名称',
    prop: 'title',
    show: true
  },
  {
    label: '用例状态',
    prop: 'enabledName',
    width: 100
  }
];

export const BUGCOLUMNS = [
  {
    label: 'BUG名称',
    prop: 'title',
    show: true
  },
  {
    label: 'bug状态',
    prop: 'status.message',
    width: 100
  }
];

export const TASKCOLUMNS = [
  {
    label: '任务名称',
    prop: 'name',
    show: true
  },
  {
    label: '任务状态',
    prop: 'status.message',
    width: 100
  }
];

// 关联项目
export const PROJECTCOLUMNS = [
  {
    label: '项目名称',
    prop: 'name',
    show: true
  },
  {
    label: '项目状态',
    prop: 'status.message',
    width: 100
  }
];
