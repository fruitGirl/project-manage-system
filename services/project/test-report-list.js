import { post } from '@/utils/request';

export default {
  // 测试报告列表
  getTestReportPageApi: payload =>
  post('/project/testReportPageQuery', payload)
};
