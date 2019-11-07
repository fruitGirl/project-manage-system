const URGENT_PRIORITY = 1;
const HIGH_PRIORITY = 2;
export const MIDDLE_PRIORITY = 3;
const LOW_PRIORITY = 4;

// 优先级枚举
export const PRIORITY = [
  { label: '紧急', value: URGENT_PRIORITY },
  { label: '高', value: HIGH_PRIORITY },
  { label: '中', value: MIDDLE_PRIORITY },
  { label: '低', value: LOW_PRIORITY }
];

// 优先级映射
export const PRIORITY_MAP = {
  [URGENT_PRIORITY]: '紧急',
  [HIGH_PRIORITY]: '高',
  [MIDDLE_PRIORITY]: '中',
  [LOW_PRIORITY]: '低'
};

// 优先级所有值
export const ALL_PROORITY_VALUES = [
  URGENT_PRIORITY,
  HIGH_PRIORITY,
  MIDDLE_PRIORITY,
  LOW_PRIORITY
];

// 有效性枚举
export const ENABLED = [
  {
    value: 'all',
    label: '全部'
  },
  {
    value: 'enabled',
    label: '有效'
  },
  {
    value: 'disabled',
    label: '无效'
  }
];
