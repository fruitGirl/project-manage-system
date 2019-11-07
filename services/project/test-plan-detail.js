import { post } from '@/utils/request';

export default {
  // 测试计划详情
  getTestPlanDataApi: payload =>
  post('/project/testPlanDetailQuery', payload)
};
