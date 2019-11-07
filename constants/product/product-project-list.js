/*
 * @Description: 产品-项目列表常规配置
 * @Author: moran
 * @Date: 2019-06-20 17:15:15
 * @Last Modified by: moran
 * @Last Modified time: 2019-08-23 10:18:30
 */
import { ALL_USER_URL } from '@/services/common-config';
import { transArrs } from '@/utils/common';

export const SETTINGS = [
  {
    label: '项目标题',
    type: 'input',
    initialValue: '',
    field: 'name',
    props: {
      placeholder: '请输入项目标题查询'
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
    label: '项目负责人',
    type: 'remoteSearch',
    initialValue: '',
    field: 'manager',
    props: {
      placeholder: '请输入负责人',
      action: ALL_USER_URL,
      parseStructure(data) {
        return transArrs(data.userList, 'nickName', 'userId');
      }
    }
  },
  {
    label: '创建时间',
    type: 'dateRange',
    initialValue: null,
    field: 'gmtCreate',
    span: 12,
    props: {
      placeholder: '请输入'
    }
  },
  {
    label: '预估开始时间',
    type: 'dateRange',
    initialValue: null,
    field: 'gmtEstimateStart',
    span: 12,
    props: {
      placeholder: '请输入'
    }
  },
  {
    label: '实际开始时间',
    type: 'dateRange',
    initialValue: null,
    field: 'gmtActualStart',
    span: 12,
    props: {
      placeholder: '请输入'
    }
  },
  {
    label: '截止日期',
    type: 'dateRange',
    initialValue: null,
    field: 'gmtEstimateEnd',
    span: 12,
    props: {
      placeholder: '请输入'
    }
  },
  {
    label: '完成时间',
    type: 'dateRange',
    initialValue: null,
    field: 'gmtActualEnd',
    span: 12,
    props: {
      placeholder: '请输入'
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
    label: 'ID',
    prop: 'id',
    width: 80
  },
  {
    label: '优先级',
    width: 100,
    prop: 'priority',
    show: true,
    sortable: 'custom'
  },
  {
    label: '项目名称',
    show: true,
    prop: 'name',
    minWidth: 300,
    align: 'left'
  },
  {
    label: '状态',
    prop: 'statusName',
    sortable: 'custom'
  },
  {
    label: '(预计/实际)结束时间',
    prop: 'endTime',
    width: 210
  },
  {
    label: '负责人',
    prop: 'projectManagerName',
    sortable: 'custom',
    width: 100
  }
];

// 排序配置
export const SORT_CONFIG = {
  priority_ascending: 'PRIORITY_ASC',
  priority_descending: 'PRIORITY_DESC',
  statusName_descending: 'STATUS_DESC',
  statusName_ascending: 'STATUS_ASC',
  projectManagerName_descending: 'PROJECT_MANAGER_DESC',
  projectManagerName_ascending: 'PROJECT_MANAGER_ASC'
};
