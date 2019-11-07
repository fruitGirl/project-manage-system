import { post } from '@/utils/request';

export default {
  // 需求列表查询
  getDemandPageApi: payload => post('/project/demandPageQuery', payload),

  // 修改状态
  modifyDemandStatusApi: payload =>
    post('/project/demandModifyStatus', payload),

  // 修改指派人
  modifyDemandAssignPersonApi: payload =>
    post('/project/demandModifyAssignPerson', payload),

  // 提需求
  createDemandApi: payload => post('project/demandCreate', payload),

  // 编辑需求回填
  getInitDemandApi: payload => post('/project/demandModifyInit', payload),

  // 编辑需求
  modifyDemandApi: payload => post('/project/demandModify', payload),

  // 取消关联
  removeRelateDemandApi: payload =>
    post('/project/projectDemandLinkBatchRemove', payload),

  // 需求转用例回填
  getInitDemandTestCaseApi: payload =>
  post('/project/demandTestCaseCreateInitPage', payload)
};
