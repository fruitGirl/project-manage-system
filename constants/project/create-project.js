import { formatToTime } from '@/utils/common';

const DAY_STRAMP = 1000 * 60 * 60 * 24;
const NOW_STRAMP = Date.now();
const TODAY = formatToTime(NOW_STRAMP);

export const timeOption = [
  {
    label: '一周',
    getRange() {
      return [TODAY, formatToTime(NOW_STRAMP + 7 * DAY_STRAMP)];
    }
  },
  {
    label: '两周',
    getRange() {
      return [TODAY, formatToTime(NOW_STRAMP + 2 * 7 * DAY_STRAMP)];
    }
  },
  {
    label: '一个月',
    getRange() {
      return [TODAY, formatToTime(NOW_STRAMP + 30 * DAY_STRAMP)];
    }
  },
  {
    label: '二个月',
    getRange() {
      return [TODAY, formatToTime(NOW_STRAMP + 2 * 30 * DAY_STRAMP)];
    }
  },
  {
    label: '半年',
    getRange() {
      return [TODAY, formatToTime(NOW_STRAMP + 6 * 30 * DAY_STRAMP)];
    }
  }
];

export const rules = {
  name: [{ required: true, message: '请输入' }],
  type: [{ required: true, message: '请选择' }],
  gmtEstimate: [{ required: true, message: '请选择' }],
  projectManager: [{ required: true, message: '请选择' }]
};

export const buttons = [
  { label: '取消', textColor: 'primary', func: 'onCancel' },
  { label: '确定', type: 'primary', func: 'onSubmit' }
];
