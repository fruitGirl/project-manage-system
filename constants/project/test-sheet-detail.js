import { ALL_USER_URL } from '@/services/common-config';
import { transArrs } from '@/utils/common';
export const SETTINGS = [
  {
    label: '用例标题',
    type: 'input',
    initialValue: '',
    field: 'title',
    props: {
      placeholder: '请输入用例标题查询'
    }
  },
  {
    label: '创建人',
    type: 'remoteSearch',
    initialValue: '',
    field: 'creator',
    props: {
      placeholder: '请输入创建人',
      action: ALL_USER_URL,
      parseStructure(data) {
        return transArrs(data.userList, 'nickName', 'userId');
      }
    }
  },
  {
    label: '创建日期',
    type: 'dateRange',
    initialValue: '',
    field: 'gmtCreate',
    span: 12,
    props: {
      placeholder: '请选择创建日期'
    }
  },
  {
    label: '优先级',
    type: 'checkbox',
    initialValue: [1, 2, 3, 4],
    field: 'priorities',
    span: 12,
    props: {
      dataProvider: [
        { label: '紧急', value: 1 },
        { label: '高', value: 2 },
        { label: '中', value: 3 },
        { label: '低', value: 4 }
      ]
    }
  }
];

// 表格头部
export const COLUMN = [
  {
    label: '优先级',
    width: 90,
    prop: 'priority',
    show: true,
    sortable: 'custom'
  },
  {
    label: '自动化',
    width: 120,
    prop: 'automationName',
    sortable: 'custom'
  },
  {
    label: '用例标题',
    show: true,
    prop: 'title',
    width: 200,
  },
  {
    label: '类型',
    prop: 'typeName',
    sortable: 'custom',
    minWidth: 80
  },
  {
    label: '执行人',
    prop: 'executor',
    minWidth: 80
  },
  {
    label: '结果',
    prop: 'result.message',
    minWidth: 60,
  },
  {
    label: '最后执行时间',
    prop: 'latestDate',
    minWidth: 120,
  },
  {
    label: 'BUG',
    prop: 'bugNum',
    minWidth: 80,
    isCustomHeader: true,
    show: true
  }
];

export const PATHS = [
  {
    path: '/project/test-sheet-list',
    name: '测试单列表'
  },
  {
    path: '',
    name: '测试单详情'
  }
];

// 排序映射值
export const SORT_CONFIG = {
  priority_ascending: 'PRIORITY_ASC',
  priority_descending: 'PRIORITY_DESC',
  typeName_ascending: 'TYPE_ASC',
  typeName_descending: 'TYPE_DESC',
  automationName_ascending: 'AUTOMATION_STATUS_ASC',
  automationName_descending: 'AUTOMATION_STATUS_DESC',
};

export const BASELISTS = [
  {
    label: '名称',
    field: 'name'
  },
  {
    label: '项目',
    field: 'projectName'
  },
  {
    label: '所属模块',
    field: 'moduleName'
  },
  {
    label: '创建人',
    field: 'creator'
  },
  {
    label: '负责人',
    field: 'manager'
  },
  {
    label: '创建时间',
    field: 'gmtCreate'
  },
  {
    label: '预计起止时间',
    field: 'gmtEstimate'
  },
  {
    label: '实际起止时间',
    field: 'gmtActual'
  }
];

export const buttons = [
  { label: '返回', textColor: 'primary', func: 'back' },
  { label: '编辑', textColor: 'primary', func: 'editor', isShow: true },
  { label: '开始测试', textColor: 'primary', func: 'startTest' },
  { label: '完成测试', textColor: 'primary', func: 'finishTest' },
  { label: '关闭测试', textColor: 'primary', func: 'closeTest' },
  { label: '生成报告', textColor: 'primary', func: 'report' },
  { label: '复制测试单', textColor: 'primary', func: 'copyTest' },
  { label: 'BUG列表', textColor: 'primary', func: 'bugList' }
];

