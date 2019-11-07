import { post } from '@/utils/request';

export default {
  getListApi: payload => post('/project/testCasePageQuery', payload),
  createUseCaseApi: payload => post('/project/testCaseCreate', payload),
  editUseCaseApi: payload => post('/project/testCaseModify', payload),
  getUseCaseMsgApi: payload => post('/project/testCaseDetailQuery', payload),
  getExecuteResultApi: payload => post('/project/testCaseExecuteQuery', payload),
  getExecuteDetailResultApi: payload => post('/project/testCaseStepExecuteResultQuery', payload),
  createExecuteResultApi: payload => post('/project/testCaseExecuteResultCreate', payload),
  deleteUseCaseApi: payload => post('/project/testCaseDelete', payload),
  getBugListApi: payload => post('/project/testCaseBugLinkQuery', payload),

  // 删除测试用例步骤
  REMOVE_CASE_STEP_URL: '/project/testCaseStepDelete'
};
