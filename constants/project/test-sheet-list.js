/*
 * @Description: 测试单列表常规配置
 * @Author: moran
 * @Date: 2019-06-20 17:14:43
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-04 18:38:25
 */
import { ALL_USER_URL } from '@/services/common-config';
import { transArrs } from '@/utils/common';
import { PRIORITY, ALL_PROORITY_VALUES } from '@/constants/common/config';

// 表单更多筛选配置项
export const SETTINGS = [
  {
    label: '测试单标题',
    type: 'input',
    initialValue: '',
    field: 'title',
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
    label: '测试单负责人',
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
    initialValue: '',
    field: 'gmtCreate',
    span: 12,
    props: {
      placeholder: '请输入'
    }
  },
  {
    label: '预估开始时间',
    type: 'dateRange',
    initialValue: '',
    field: 'gmtEstimateStart',
    span: 12,
    props: {
      placeholder: '请输入'
    }
  },
  {
    label: '截止日期',
    type: 'dateRange',
    initialValue: '',
    field: 'gmtEstimateEnd',
    span: 12,
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
  }
];

// 表格头部
export const COLUMN = [
  {
    label: '优先级',
    prop: 'priority',
    show: true,
    width:130,
    sortable: 'custom'
  },
  {
    label: '测试单标题',
    show: true,
    prop: 'name',
    align: 'left',
    width: 220
  },
  {
    label: '归属项目',
    prop: 'projectName',
    sortable: 'custom',
    width: 180
  },
  {
    label: '状态',
    prop: 'statusName',
    sortable: 'custom',
  },
  {
    label: '测试进度',
    prop: 'progress',
    isCustomHeader: true,
  },
  {
    label: '通过率',
    prop: 'pass',
    isCustomHeader: true,
  },
  {
    label: '剩余BUG',
    prop: 'bugNum',
    width: 80,
    isCustomHeader: true,
    show: true
  }
];

// 排序映射值
export const SORT_CONFIG = {
  priority_ascending: 'PRIORITY_ASC',
  priority_descending: 'PRIORITY_DESC',
  projectName_ascending: 'PROJECT_ID_ASC',
  projectName_descending: 'PROJECT_ID_DESC',
  statusName_ascending: 'STATUS_ASC',
  statusName_descending: 'STATUS_DESC'
};
