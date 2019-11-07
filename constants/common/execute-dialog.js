// 执行结果列表-列配置
export const COLUMN = [
  {
    label: 'ID',
    prop: 'id',
    width: 120
  },
  {
    label: '执行人',
    prop: 'executor'
  },
  {
    label: '执行时间',
    prop: 'gmtModified'
  },
  {
    label: '结果',
    prop: 'result.message'
  },
  {
    label: '数据来源',
    prop: 'executeSourceType.message'
  }
];

// 执行结果详情列表-列配置
export const CELLCOLUMN = [
  {
    label: '编号',
    prop: 'number'
  },
  {
    label: '步骤',
    prop: 'description'
  },
  {
    label: '预期',
    prop: 'expectedResult'
  },
  {
    label: '结果',
    prop: 'executeResult.message'
  },
  {
    label: '实际情况',
    prop: 'actualSituation'
  },
  {
    label: '附件',
    prop: 'fileList',
    show: true
  }
];

// 用例步骤列表-列配置
export const STEPCOLUMN = [
  {
    label: '编号',
    prop: 'number'
  },
  {
    label: '步骤',
    prop: 'stepDescribe'
  },
  {
    label: '预期',
    prop: 'expectedResult'
  },
  {
    label: '结果',
    prop: 'executeResult',
    show: true
  },
  {
    label: '实际情况',
    prop: 'actualSituation',
    show: true
  },
  {
    label: '操作',
    prop: 'operate',
    show: true
  }
];
