import { post } from '@/utils/request';

export default {
  // 测试套件关联用例
  createTestSuiteCaseLinkApi: payload => post('/project/testSuiteCaseLinkBatchCreate', payload)
};
