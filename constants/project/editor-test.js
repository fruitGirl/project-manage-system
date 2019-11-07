export const RULES = {
  productId: [
    {
      required: true,
      message: '请选择所属产品'
    }
  ],
  timeLine: [
    {
      required: true,
      message: '请选择起止时间',
      trigger: 'blur'
    }
  ]
};

export const EDITORRULES = {
  name: [
    {
      required: true,
      message: '请输入标题'
    }
  ]
};
