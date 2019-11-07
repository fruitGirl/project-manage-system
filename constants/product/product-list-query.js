import { ALL_USER_URL } from '@/services/common-config';
import { transArrs } from '@/utils/common';

// 表单配置项
export const FORM_SETTINGS = [
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
    label: '产品负责人',
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
    label: '创建于',
    type: 'dateRange',
    initialValue: [],
    field: 'date',
    span: 12,
    props: {
      placeholder: '请输入'
    }
  }
];

// 表格表头
export const TABLE_COLUMNS = [
  {
    label: '产品名称',
    prop: 'name',
    show: true
  },
  {
    label: '状态',

    prop: 'status',
    show: true,
    sortable: 'custom'
  },
  {
    label: '总需求',
    prop: 'allDemand'
  },
  {
    label: '未结束需求',
    prop: 'notProcessDemand'
  },
  {
    label: '总项目',
    prop: 'allProject'
  },
  {
    label: '未结束项目',
    prop: 'notFinishProject'
  }
];
export const SORT_MAP = {
  status_descending: 'STATUS_DESC',
  status_ascending: 'STATUS_ASC'
};
