import { ALL_USER_URL } from '@/services/common-config';
import { PRIORITY } from '@/constants/common/config';
import { transArrs } from '@/utils/common';

// 更多搜索查询配置
export const FORM_SETTINGS = [
  {
    label: '项目标题',
    type: 'input',
    initialValue: '',
    field: 'name',
    props: {
      placeholder: '请输入'
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
    label: '项目负责人',
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
  },
  {
    label: '预估开始于',
    type: 'dateRange',
    initialValue: '',
    field: 'GmtEstimateStart',
    span: 12,
    props: {
      placeholder: '请选择',
      type: 'daterange',
      format: 'yyyy-MM-dd'
    }
  },
  {
    label: '截止于',
    type: 'dateRange',
    initialValue: '',
    field: 'GmtEstimateEnd',
    span: 12,
    props: {
      placeholder: '请选择',
      type: 'daterange',
      format: 'yyyy-MM-dd'
    }
  },
  {
    label: '实际开始于',
    type: 'dateRange',
    initialValue: '',
    field: 'GmtActualStart',
    span: 12,
    props: {
      placeholder: '请选择',
      type: 'daterange',
      format: 'yyyy-MM-dd'
    }
  },
  {
    label: '完成于',
    type: 'dateRange',
    initialValue: '',
    field: 'GmtActualEnd',
    span: 12,
    props: {
      placeholder: '请选择',
      type: 'daterange',
      format: 'yyyy-MM-dd'
    }
  }
];

// 主页列表列配置
export const TABLE_COLUMNS = [
  {
    label: 'ID',
    prop: 'id'
  },
  {
    label: '优先级',
    prop: 'priority',
    width: 90,
    sortable: true,
    show: true
  },
  {
    label: '项目名称',
    prop: 'name',
    show: true
  },
  {
    label: '预估起止时间',
    prop: 'gmtEstimate',
    width: 200,
    sortable: true,
    show: true
  },
  {
    label: '实际起止时间',
    prop: 'gmtActual',
    width: 200,
    sortable: true,
    show: true
  },
  {
    label: '状态',
    prop: 'status.message'
  },
  {
    label: '负责人',
    prop: 'projectManage'
  },
  {
    label: '关联产品',
    prop: 'productNum',
    show: true
  },
  {
    label: '团队',
    prop: 'memberNum',
    show: true
  }
];

// 排序映射值
export const SORT_CONFIG = {
  priority_ascending: 'PRIORITY_ASC',
  priority_descending: 'PRIORITY_DESC',
  gmtEstimate_ascending: 'GMT_ESTIMATE_START_ASC',
  gmtEstimate_descending: 'GMT_ESTIMATE_START_DESC',
  gmtActual_ascending: 'GMT_ACTUAL_START_ASC',
  gmtActual_descending: 'GMT_ACTUAL_START_DESC'
};

// 团队列表列配置
export const TEAM_TABLE_COLUMNS = [
  {
    label: '花名',
    prop: 'userName'
  },
  {
    label: '团队角色',
    prop: 'roleName'
  },
  {
    label: '总任务',
    prop: 'allTaskNum'
  },
  {
    label: '未完成',
    prop: 'unfinishedTaskNum'
  },
  {
    label: '可用工日',
    prop: 'days'
  },
  {
    label: '可用工时/日',
    prop: 'hours'
  }
];
