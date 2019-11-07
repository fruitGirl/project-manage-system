import { ALL_USER_URL } from '@/services/common-config';
import { PRIORITY } from '@/constants/common/config';
import { transArrs } from '@/utils/common';

// 表单配置项
export const FORM_SETTINGS = [
  {
    label: '任务标题',
    type: 'input',
    initialValue: '',
    field: 'name',
    props: {
      placeholder: '请输入任务标题查询'
    }
  },
  {
    label: '创建人',
    type: 'remoteSearch',
    initialValue: '',
    field: 'creator',
    props: {
      placeholder: '请输入',
      action: ALL_USER_URL,
      parseStructure(data) {
        const { userList } = data;
        return transArrs(userList, 'nickName', 'userId');
      }
    }
  },
  {
    label: '任务指派人',
    type: 'remoteSearch',
    initialValue: '',
    field: 'manager',
    props: {
      placeholder: '请输入',
      action: ALL_USER_URL,
      parseStructure(data) {
        const { userList } = data;
        return transArrs(userList, 'nickName', 'userId');
      }
    }
  },
  {
    label: '优先级',
    type: 'checkbox',
    initialValue: [1, 2, 3, 4],
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
  },
  {
    label: '预估开始于',
    type: 'dateRange',
    initialValue: [],
    field: 'gmtEstimateStart',
    span: 12,
    props: {
      placeholder: '请输入'
    }
  },
  {
    label: '截止于',
    type: 'dateRange',
    initialValue: [],
    field: 'gmtEstimateEnd',
    span: 12,
    props: {
      placeholder: '请输入'
    }
  },
  {
    label: '实际开始于',
    type: 'dateRange',
    initialValue: [],
    field: 'gmtActualStart',
    span: 12,
    props: {
      placeholder: '请输入'
    }
  },
  {
    label: '完成于',
    type: 'dateRange',
    initialValue: [],
    field: 'gmtActualEnd',
    span: 12,
    props: {
      placeholder: '请输入'
    }
  }
];

// 表格表头
export const TABLE_COLUMNS = [
  {
    label: '优先级',
    prop: 'priority',
    width: 100,
    sortable: 'custom',
    show: true
  },
  {
    label: '类型',
    width: 100,
    prop: 'type',
    show: true,
    sortable: 'custom'
  },
  {
    label: '任务标题',
    prop: 'name',
    show: true,
    align: 'left'
  },
  {
    label: '状态',
    width: 120,
    prop: 'status',
    show: true,
    sortable: 'custom'
  },
  {
    label: '截止',
    width: 160,
    prop: 'shortGmtEstimateEnd',
    sortable: 'custom'
  },
  {
    label: '指派给',
    width: 120,
    prop: 'assignedPerson',
    sortable: 'custom'
  },
  {
    label: '工时/h',
    width: 120,
    isCustomHeader: true,
    prop: 'hours',
    show: true
  },
  {
    label: '完成人',
    width: 140,
    prop: 'finishedPerson',
  }
];

// 排序配置
export const SORT_MAP = {
  status_descending: 'STATUS_DESC',
  status_ascending: 'STATUS_ASC',
  priority_descending: 'PRIORITY_DESC',
  priority_ascending: 'PRIORITY_ASC',
  type_descending: 'TYPE_DESC',
  type_ascending: 'TYPE_ASC',
  assignedPerson_descending: 'ASSIGNED_PERSON_DESC',
  assignedPerson_ascending: 'ASSIGNED_PERSON_ASC',
  gmtEstimateStart_descending: 'GMT_CREATE_DESC',
  gmtActualStart_ascending: 'GMT_CREATE_ASC',
  shortGmtEstimateEnd_descending: 'GMT_ESTIMATE_END_DESC',
  shortGmtEstimateEnd_ascending: 'GMT_ESTIMATE_END_ASC',
};

// 详情基本信息的配置
export const DETAIL_INFO_CONFIG = [
  {
    label: '项目',
    field: 'projectName'
  },
  {
    label: '状态',
    field: 'statusMessage'
  },
  {
    label: '负责人',
    field: 'assignedPersonName'
  },
  {
    label: '完成人',
    field: 'finishedPerson'
  },
  {
    label: '关联模块',
    field: 'demandName'
  },
  {
    label: '日期',
    field: 'date'
  },
  {
    label: '预估工时',
    field: 'estimateHours'
  },
  {
    label: '实际工时',
    field: 'actualHours'
  }
];

// 完成状态
export const FINISH_STATUS = 'FINISHED';
