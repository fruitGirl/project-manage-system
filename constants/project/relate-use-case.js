/*
 * @Description: 项目-关联用例
 * @Author: moran
 * @Date: 2019-06-21 16:58:34
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-05 16:53:38
 */
import { ALL_USER_URL } from '@/services/common-config';
import { transArrs } from '@/utils/common';

export const ALLRELATESETTINGS = [
  {
    label: '用例标题',
    type: 'input',
    initialValue: '',
    field: 'title',
    props: {
      placeholder: '请输入用标题查询'
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
    align: 'left'
  },
  {
    label: '类型',
    prop: 'typeName',
    sortable: 'custom',
    width: 130,
  },
  {
    label: '最后结果',
    prop: 'result.message',
    width: 120,
  },
  {
    label: '执行人',
    prop: 'executorName',
    width: 130,
  },
  {
    label: '最后执行时间',
    prop: 'latestDate',
    width: 150,
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
