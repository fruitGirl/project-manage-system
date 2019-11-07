/*
 * @Description: bug配置
 * @Author: danding
 * @Date: 2019-06-20 17:00:51
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-04 17:34:36
 */
import { ALL_USER_URL } from '@/services/common-config';
import { PRIORITY, ALL_PROORITY_VALUES } from '@/constants/common/config';
 import { transArrs } from '@/utils/common';

// 表格列配置
export const COLUMNS = [
  {
    label: '优先级',
    width: 90,
    prop: 'priority',
    sortable: true,
    minWidth: 120
  },
  {
    label: '程度',
    prop: 'severity',
    minWidth: 120,
    sortable: true
  },
  {
    label: 'BUG标题',
    prop: 'title',
    minWidth: 350,
    show: true
  },
  {
    label: 'BUG类型',
    prop: 'type',
    minWidth: 120,
    sortable: true
  },
  {
    label: '来源',
    prop: 'testCaseSourceType',
    minWidth: 150,
    sortable: true
  },
  {
    label: '状态',
    prop: 'status',
    minWidth: 120,
    show: true
  },
  {
    label: '创建人',
    prop: 'creator',
    minWidth: 120,
    sortable: true
  },
  {
    label: '指派给',
    prop: 'assignedPerson',
    minWidth: 120,
    sortable: true
  },
  {
    label: '处理人',
    prop: 'solver',
    minWidth: 120,
    sortable: true
  },
  {
    label: '处理方案',
    prop: 'resolution',
    minWidth: 150,
    sortable: true
  }
];

// 更多搜索查询配置
export const SEARCH_CONFIG = [
  {
    label: 'BUG标题',
    type: 'input',
    initialValue: '',
    field: 'title',
    props: {
      placeholder: '请输入BUG标题查询'
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
    label: 'BUG指派人',
    type: 'remoteSearch',
    initialValue: '',
    field: 'assignedPerson',
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
    initialValue: '',
    field: 'createTime',
    span: 12,
    props: {
      placeholder: '请输入'
    }
  },
  {
    label: '截止于',
    type: 'dateRange',
    initialValue: '',
    field: 'endTime',
    span: 12,
    props: {
      placeholder: '请输入'
    }
  }
];

export const OPERATION = [
  {
    id: '1',
    type: 'text',
    label: '激活',
    func: 'activeHandle'
  },
  {
    id: '2',
    type: 'text',
    label: '处理',
    func: 'disposeHandle'
  },
  {
    id: '3',
    type: 'text',
    label: '关闭',
    func: 'closeHandle'
  },
  {
    id: '4',
    type: 'text',
    label: '编辑',
    func: 'editHandle'
  },
  {
    id: '5',
    type: 'text',
    label: '复制',
    func: 'copyHandle'
  },
  {
    id: '6',
    type: 'text',
    label: '删除',
    func: 'deleteHandle'
  }
];

export const BUGREULES = {
  productId: [{ required: true, message: '请选择所属产品' }],
  assignedPerson: [{ required: true, message: '请选择' }],
  // projectVersionId: [{ required: true, message: '请选择浏览器版本' }],
};

export const BUG_RESOLVED_STATUS = 'RESOLVED'; // bug已处理状态
export const BUG_ACTIVATED_STATUS = 'ACTIVATED'; // bug已激活状态
export const BUG_CLOSED_STATUS = 'CLOSED'; // bug已关闭状态
