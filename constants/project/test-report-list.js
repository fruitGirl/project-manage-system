/*
 * @Description: 产品-项目列表常规配置
 * @Author: moran
 * @Date: 2019-06-20 17:15:15
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-06 10:06:39
 */
import { ALL_USER_URL } from '@/services/common-config';
import { transArrs } from '@/utils/common';
export const SETTINGS = [
  {
    label: '报告标题',
    type: 'input',
    initialValue: '',
    field: 'name',
    props: {
      placeholder: '请输入报告标题查询'
    }
  },
  {
    label: '发布时间',
    type: 'dateRange',
    initialValue: '',
    field: 'timeFormat'
  },
  {
    label: '发布人',
    type: 'remoteSearch',
    initialValue: '',
    field: 'publisher',
    props: {
      placeholder: '请输入发布人',
      action: ALL_USER_URL,
      parseStructure(data) {
        return transArrs(data.userList, 'nickName', 'userId');
      }
    }
  }
];
// 表格头部
export const COLUMN = [
  {
    label: '报告标题',
    show: true,
    prop: 'name',
    align: 'left'
  },
  {
    label: '项目',
    prop: 'projectName',
    width: 250
  },
  {
    label: '测试进度',
    prop: 'progress'
  },
  {
    label: '通过率',
    prop: 'passRate'
  },
  {
    label: 'BUG',
    prop: 'bugNum',
    isCustomHeader: true,
    show: true
  },
  {
    label: '负责人',
    prop: 'managerName',
    sortable: 'custom'
  },
  {
    label: '更新时间',
    prop: 'gmtModified',
    sortable: 'custom'
  }
];

// 排序映射值
export const SORT_CONFIG = {
  managerName_ascending: 'MANAGER_ASC',
  managerName_descending: 'MANAGER_DESC',
  gmtModified_ascending: 'GMT_MODIFIED_ASC',
  gmtModified_descending: 'GMT_MODIFIED_DESC'
};
