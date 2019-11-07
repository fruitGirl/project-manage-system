/*
 * @Description: 需求列表配置
 * @Author: danding
 * @Date: 2019-06-20 17:00:51
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-04 12:31:22
 */
import { ALL_USER_URL } from '@/services/common-config';
import { transArrs } from '@/utils/common';
// 表格列配置
export const COLUMNS = [
  {
    label: '优先级',
    width: 140,
    prop: 'priority',
    sortable: 'custom',
    show: true
  },
  {
    label: '需求',
    show: true,
    prop: 'title',
    align: 'left',
    minWidth: 350,
  },
  {
    label: '状态',
    prop: 'status',
    sortable: 'custom',
    width: 160,
    show: true
  },
  {
    label: '创建者',
    prop: 'creator',
    width: 160,
    sortable: 'custom'
  },
  {
    label: '指派',
    prop: 'assignedPerson',
    width: 160,
    show: true,
    sortable: 'custom'
  }
];

// 更多搜索查询配置
export const SEARCH_CONFIG = [
  {
    label: '需求标题',
    type: 'input',
    initialValue: '',
    field: 'title',
    props: {
      placeholder: '请输入需求标题查询'
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
    label: '需求指派人',
    type: 'remoteSearch',
    initialValue: '',
    field: 'assignedPerson',
    props: {
      placeholder: '请输入',
      action: ALL_USER_URL,
      parseStructure(data) {
        return transArrs(data.userList, 'nickName', 'userId');
      }
    }
  },
  {
    label: '优先级',
    type: 'checkbox',
    initialValue: [1, 2, 3, 4],
    field: 'priorityList',
    span: 12,
    props: {
      dataProvider: [
        { label: '紧急', value: 1 },
        { label: '高', value: 2 },
        { label: '中', value: 3 },
        { label: '低', value: 4 }
      ]
    }
  },
  {
    label: '创建于',
    type: 'dateRange',
    initialValue: '',
    field: 'GmtCreate',
    span: 12,
    props: {
      placeholder: '请输入'
    }
  },
  {
    label: '开始于',
    type: 'dateRange',
    initialValue: '',
    field: 'GmtEstimateStart',
    span: 12,
    props: {
      placeholder: '请输入'
    }
  },
  {
    label: '截止于',
    type: 'dateRange',
    initialValue: '',
    field: 'GmtDeadline',
    span: 12,
    props: {
      placeholder: '请输入'
    }
  }
];

// 排序配置
export const SORT_CONFIG = {
  priority_ascending: 'PRIORITY_ASC',
  priority_descending: 'PRIORITY_DESC',
  status_descending: 'STATUS_DESC',
  status_ascending: 'STATUS_ASC',
  creator_descending: 'CREATOR_DESC',
  creator_ascending: 'CREATOR_ASC',
  assignedPerson_descending: 'ASSIGNED_PERSON_DESC',
  assignedPerson_ascending: 'ASSIGNED_PERSON_ASC',
  gmtEstimateStart_descending: 'GMT_ESTIMATE_START_DESC',
  gmtEstimateStart_ascending: 'GMT_ESTIMATE_START_ASC'
};
