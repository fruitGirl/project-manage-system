/*
 * @Description: 用例列表配置
 * @Author: danding
 * @Date: 2019-06-20 17:00:51
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-05 16:53:57
 */

import { PRIORITY } from '@/constants/common/config';
import { ALL_USER_URL } from '@/services/common-config';
import { transArrs } from '@/utils/common';

// 表格列配置
export const COLUMNS = [
  {
    label: '优先级',
    width: 90,
    prop: 'priority',
    show: true,
    sortable: true
  },
  {
    label: '自动化',
    width: 120,
    prop: 'automationName',
    sortable: 'custom'
  },
  {
    label: '用例标题',
    prop: 'title',
    width: 350,
    show: true,
    align: 'left'
  },
  {
    label: '类型',
    prop: 'type.message'
  },
  {
    label: '最后结果',
    prop: 'result.message'
  },
  {
    label: '执行人',
    prop: 'executor'
  },
  {
    label: '最后执行时间',
    prop: 'latestDate',
    width: 160
  },
  {
    label: 'BUG',
    prop: 'bugNum',
    show: true,
    isCustomHeader: true
  }
];

// 更多搜索查询配置
export const SEARCH_CONFIG = [
  {
    label: '用例标题',
    type: 'input',
    initialValue: '',
    field: 'title',
    props: {
      placeholder: '请输入用例标题'
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
    label: '优先级',
    type: 'checkbox',
    initialValue: PRIORITY.map(i => i.value),
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
    field: 'GmtCreate',
    span: 12,
    props: {
      placeholder: '请选择',
      type: 'daterange',
      format: 'yyyy-MM-dd'
    }
  }
];

// 批量操作
export const BATCH_OPERATE_CONFIG = [
  { label: '批量执行', func: 'batchHandle' },
  { label: '创建测试单', func: 'batchCreateTest' },
  { label: '创建套件', func: 'batchCreateKit' }
];

// 排序配置
export const SORT_CONFIG = {
  priority_ascending: 'PRIORITY_ASC',
  priority_descending: 'PRIORITY_DESC',
  automationName_ascending: 'AUTOMATION_STATUS_ASC',
  automationName_descending: 'AUTOMATION_STATUS_DESC',
};

// 用例描述
export const STEP_DESCRIBE = 'STEP_DESCRIBE';
export const TEXT_DESCRIBE = 'TEXT_DESCRIBE';

// 对测试用例步骤排序
export const changeSortNumber = (tableList = []) => {
  const sortedTableList = tableList.map((i, iIndex) => {
    if (i.testCaseStepList && i.testCaseStepList.length) {
      const testCaseStepList = i.testCaseStepList.map((j, jIndex) => {
        return {
          ...j,
          orderNumber: jIndex + 1,
          number: iIndex + 1 + '-' + (jIndex + 1)
        };
      });
      return {
        ...i,
        number: iIndex + 1,
        orderNumber: iIndex + 1,
        testCaseStepList
      };
    }

    return {
      ...i,
      orderNumber: iIndex + 1,
      number: iIndex + 1
    };
  });
  return sortedTableList;
};

// 创建 count 条空数据的测试用例步骤
export const createParentCase = count => {
  const list = [];
  for (let i = 0; i < count; i++) {
    list.push({
      key: Date.now() + '_parent' + i,
      number: i + 1,
      orderNumber: i + 1,
      stepDescribe: '',
      hasChild: false,
      expectedResult: ''
    });
  }
  return list;
};

// 用例详情表单列配置
export const USE_CASE_DETAIL_COLUMN = [
  {
    label: '编号',
    prop: 'number',
    width: 100
  },
  {
    label: '步骤',
    prop: 'stepDescribe'
  },
  {
    label: '预期',
    prop: 'expectedResult'
  }
];

export const BUG_COLUMNS = [
  {
    label: 'BUG标题',
    prop: 'title'
  },
  {
    label: '状态',
    prop: 'status.message'
  },
  {
    label: '指派给',
    prop: 'assignedPerson'
  }
];
