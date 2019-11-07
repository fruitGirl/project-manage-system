import { post } from '@/utils/request';

export default {
  // 测试套件列表
  getTestSuitePageApi: payload => post('/project/testSuitePageQuery', payload),

  // 测试套件删除,恢复
  testSuiteModifyEnabledApi: payload => post('/project/testSuiteModifyEnabled', payload),

  // 新增测试套件
  testSuiteCreateApi: payload => post('/project/testSuiteCreate', payload)
};
