/*
 * @Description: 登陆配置
 * @Author: danding
 * @Date: 2019-06-17 11:00:25
 * @Last Modified by: danding
 * @Last Modified time: 2019-07-02 15:21:38
 */

import reg from '@/utils/regex';

// 背景图片
export const BG_IMGS = '/images/login/login_bg.png';

// 验证码图片地址
export const BASE_CODE_IMG_URL = `${process.env.baseUrl}/loginCheckCode.resource`;

// 表单规则
export const RULES = {
  cell: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'change'
    },
    {
      pattern: reg.cell,
      message: '请输入正确的手机号格式',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'change'
    }
  ],
  checkCode: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'change'
    },
    {
      pattern: reg.number,
      message: '请输入数字'
    },
    {
      min: 4,
      max: 4,
      message: '请输入4位数验证码',
      trigger: 'blur'
    }
  ]
};
