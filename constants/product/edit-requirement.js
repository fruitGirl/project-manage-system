import reg from '@/utils/regex';

// 大于1000 返回错误
export const lessValue = (rule, val, callback) => {
  if (val > 1000) return callback(new Error());
  return callback();
};

export const RULES = {
  productId: [
    {
      required: true,
      message: '请选择所属产品'
    }
  ],
  estimateHour: [
    {
      pattern: reg.oneNumberPoint,
      message: '请输入最多一位小数的数字',
      trigger: 'blur'
    },
    {
      validator: lessValue,
      message: '请输入不超过1000的数字',
      trigger: 'blur'
    }
  ]
};
