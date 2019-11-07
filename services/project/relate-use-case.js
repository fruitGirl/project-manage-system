import { post } from '@/utils/request';

export default {
  // 关联用例-全部用例列表
  getTestCasePageApi: payload =>
  post('/project/testFormCaseLinkPageQuery', payload),

  // 关联用例
  testFormCaseLinkApi: payload =>
    post('/project/testFormCaseLinkBatchCreate', payload)
};
