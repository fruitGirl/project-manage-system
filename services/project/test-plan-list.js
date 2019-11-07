import { post } from '@/utils/request';

export default {
  // 测试计划列表
  getTestPlanPageApi: payload =>
  post('/project/testPlanPageQuery', payload),

  // 删除计划
  testPlanDeleteApi: payload =>
    post('/project/testPlanDelete', payload),
};
