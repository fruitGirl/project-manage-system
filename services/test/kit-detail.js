import { post } from '@/utils/request';

export default {
  // 测试套件详情关联用例列表
  getTestSuiteCasePageApi: payload => post('/project/testSuiteCasePageQuery', payload),

  // 取消关联
  removetestSuiteCaseLinkApi: payload => post('/project/testSuiteCaseLinkBatchRemove', payload)
};
