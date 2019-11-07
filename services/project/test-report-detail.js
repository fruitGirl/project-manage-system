import { post } from '@/utils/request';

export default {
  // 测试范围
  getTestFormTestDemandApi: payload =>
  post('/project/testFormTestDemandQuery', payload),

  // 测试用例
  getTestFormTestCaseQueryApi: payload =>
  post('/project/testFormTestCaseQuery', payload),

  // 基本信息
  getTestReportDetailApi: payload =>
  post('/project/testReportDetailQuery', payload),

  // 可编辑详情页信息获取
  getTestEditorReportDetailApi: payload =>
  post('/project/testFormReportQuery', payload),

  // 编辑
  testReportCreateApi: payload =>
    post('/project/testReportCreate', payload)
};
