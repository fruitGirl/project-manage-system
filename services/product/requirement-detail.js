import { post } from '@/utils/request';

export default {
  // 需求详情 - 基本信息以及附件
  getDemandDetailApi: payload =>
  post('/project/demandDetailQuery', payload),
  // 关联用例
  getDemandRelateCaseApi: payload =>
  post('/project/testCaseQueryByDemandId', payload),
  // 关联bug
  getDemandRelateBugApi: payload =>
  post('/project/bugQueryByDemandId', payload),
  // 关联任务
  getDemandRelateTaskApi: payload =>
  post('/project/taskQueryByDemandId', payload)
};
