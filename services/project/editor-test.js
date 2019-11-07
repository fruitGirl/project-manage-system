/*
 * @Description: 测试单列表接口
 * @Author: moran
 * @Date: 2019-06-27 10:34:06
 * @Last Modified by: moran
 * @Last Modified time: 2019-06-28 12:08:36
 */
import { post } from '@/utils/request';

export default {
  // 新增测试单
  testFormCreateApi: payload => post('/project/testFormCreate', payload),

  // 测试单编辑回填
  testFormModifyInitApi: payload =>
  post('/project/testFormModifyInitPage', payload),

  // 编辑测试单
  testFormModifyApi: payload => post('/project/testFormModify', payload)
};
