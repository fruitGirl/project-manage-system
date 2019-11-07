import { post } from '@/utils/request';

export default {
  // 开始测试
  startTestFormApi: payload => post('/project/testFormStart', payload),

  // 测试用例查询列表
  getTestFormCasePageApi: payload =>
  post('/project/testFormCasePageQuery', payload),

  // 测试单详情
  getTestFormDetailApi: payload =>
  post('/project/testFormDetailQuery', payload),

  // 批量取消关联
  removeTestFormCaseApi: payload =>
    post('/project/testFormCaseLinkBatchRemove', payload),

  // 回填提bug
  initTestCaseBugApi: payload =>
  post('/project/testCaseBugCreateInitPage', payload),

  // bug列表
  getBugQueryBySourceApi: payload =>
  post('/project/bugQueryBySource', payload)
};
