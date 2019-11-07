import { PRIORITY, ALL_PROORITY_VALUES } from '@/constants/common/config';

export const FORM_SETTINGS = [
  {
    label: '计划标题',
    type: 'input',
    initialValue: '',
    field: 'name',
    props: {
      placeholder: '请输入'
    }
  },
  {
    label: '创建人',
    type: 'input',
    initialValue: '',
    field: 'creator',
    props: {
      placeholder: '请输入'
    }
  },
  {
    label: '优先级',
    type: 'checkbox',
    initialValue: ALL_PROORITY_VALUES,
    field: 'priorities',
    span: 12,
    props: {
      dataProvider: PRIORITY
    }
  },
  {
    label: '创建于',
    type: 'dateRange',
    initialValue: [],
    field: 'gmtCreate',
    span: 12,
    props: {
      placeholder: '请输入'
    }
  }
];

export const COLUMN = [
  {
    label: '优先级',
    prop: 'priorityName',
    width: 120,
  },
  {
    label: '计划标题',
    prop: 'name',
    minWidth: 300,
    align: 'left',
    show: true
  },
  {
    label: '创建人',
    prop: 'creator'
  },
  {
    label: '创建时间',
    prop: 'gmtCreate',
    width: 180
  },
  {
    label: '状态',
    prop: 'enabled',
    show: true
  },
  {
    label: '版本',
    prop: 'status',
    show: true
  }
];
export const VERSION_LIST = [
  {
    value: '',
    label: '全部'
  },
  {
    value: 'DRAFT',
    label: '草稿'
  },
  {
    value: 'PUBLISH',
    label: '正式'
  }
];
