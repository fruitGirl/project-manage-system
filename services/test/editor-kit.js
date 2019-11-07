import { post } from '@/utils/request';

export default {
  // 新增测试套件
  testSuiteCreateApi: payload => post('/project/testSuiteCreate', payload),

  // 编辑测试套件
  testSuiteModifyApi: payload => post('/project/testSuiteModify', payload),

  // 回填测试套件
  testSuiteModifyInitApi: payload => post('/project/testSuiteModifyInitPage', payload)
};
