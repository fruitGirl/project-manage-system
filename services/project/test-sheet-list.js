/*
 * @Description: 测试单列表接口
 * @Author: moran
 * @Date: 2019-06-27 10:34:06
 * @Last Modified by: moran
 * @Last Modified time: 2019-10-29 15:11:19
 */
import { post } from '@/utils/request';

export default {
  // 测试单列表查询
  testFormPageQueryApi: payload =>
  post('/project/testFormPageQuery', payload),

  // 完成测试
  finishTestFormApi: payload => post('/project/testFormFinish', payload),

  // 关闭测试单
  closeTestFormApi: payload => post('/project/testFormClose', payload),

  // bug列表
  getTestFormBugLinkApi: payload =>
  post('/project/testFormBugLinkQuery', payload)
};
