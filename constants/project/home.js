// 任务状态
export const FINISHED = "FINISHED"; // 任务已结束

// bug状态
export const ACTIVATED = "ACTIVATED"; // 已激活
export const RESOLVED = "RESOLVED"; // 已处理
export const CLOSED = "CLOSED"; // 已关闭

// 任务详情配置
export const TASK_INFO = [
  {
    label: '总任务',
    field: 'total'
  },
  {
    label: '未开始',
    field: 'unstart'
  },
  {
    label: '进行中',
    field: 'underway'
  },
  {
    label: '已延期',
    field: 'delayed'
  },
  {
    label: '已暂停',
    field: 'paused'
  },
  {
    label: '已完成',
    field: 'finished'
  }
];

// bug详情配置
export const BUG_INFO = [
  {
    label: '总BUG',
    field: 'total'
  },
  {
    label: '激活',
    field: 'activated'
  },
  {
    label: '已处理',
    field: 'resolved'
  },
  {
    label: '已关闭',
    field: 'closed'
  }
];

// 任务列表列配置
export const TABLE_COLUMNS = [
  {
    prop: 'name',
    label: '名称',
    width: 250
  },
  {
    prop: 'assignedPersonName',
    label: '负责人',
    width: 100
  },
  {
    prop: 'status',
    label: '状态',
    width: 80
  },
  {
    prop: 'days',
    label: '总天数',
    width: 60
  },
  {
    prop: 'shortGmtActualStart',
    label: '实际开始时间',
    width: 140
  },
  {
    prop: 'remainDays',
    label: '剩余天数',
    width: 70
  }
];


// 项目信息
export const PROJECT_INFO =  [
  {
    label: '项目类型',
    field: 'type'
  },
  {
    label: '优先级',
    field: 'priority'
  },
  {
    label: '关联产品',
    field: 'linkedProducts'
  },
  {
    label: '项目描述',
    field: 'description'
  },
  {
    label: '访问权限',
    field: 'visitType'
  }
];

// 负责人
export const MANAGER = [
  {
    label: '项目负责人',
    field: 'projectManager'
  },
  {
    label: '产品负责人',
    field: 'productManager'
  },
  {
    label: '开发负责人',
    field: 'developManager'
  },
  {
    label: '测试负责人',
    field: 'testManager'
  }
];

// 时间
export const TIME_INFO = [
  {
    label: '预估起止时间',
    field: 'gmtEstimate'
  },
  {
    label: '实际起止时间',
    field: 'gmtActual'
  },
  {
    label: '预估上线',
    field: 'gmtExpectEnd'
  },
  {
    label: '预估总工时',
    field: 'estimateHours'
  },
  {
    label: '已消耗工时',
    field: 'actualHours'
  },
  {
    label: '剩余工时',
    field: 'remainHours'
  }
];


