import { post } from '@/utils/request';

export default {
  // 产品列表
  getparticipationProductApi: payload =>
    post('/project/productQueryParticipation', payload),

  // 项目列表
  getparticipationProjectApi: payload =>
    post('/project/projectQueryParticipation', payload),

  // 任务列表
  getTaskQueryByProjectIdApi: payload =>
    post('/project/myUnfinishedTaskQueryByProjectId', payload),

  // bug列表
  getBugQueryByProjectIdApi: payload =>
    post('/project/myUnfinishedBugQueryByProjectId', payload),

  // 测试列表
  getTestFormQueryByProjectIdApi: payload =>
    post('/project/myUnfinishedTestFormQueryByProjectId', payload),

  // 待处理需求
  getMyWattingDemandApi: payload =>
    post('/project/myWattingDemandQueryByProductId', payload),

  // 未指派需求
  getUnassignedDemandApi: payload =>
    post('/project/unassignedDemandQueryByProductId', payload),

  // 产品统计
  getProductProjectStatusNumApi: payload =>
    post('/project/productProjectStatusNumQuery', payload),

  // 主页头部信息
  getUserHomePageApi: payload => post('/project/userHomePageQuery', payload),

  // 头部详细list
  getUserHomePageSimpleInfoApi: payload => post('/project/userHomePageSimpleInfoQuery', payload),
};
