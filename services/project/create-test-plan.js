import { post } from '@/utils/request';

export default {
  testPlanCreateApi: payload => {
    return post('/project/testPlanCreate', payload);
  },
  testPlanModifyInitPageApi: payload => {
    return post('/project/testPlanModifyInitPage', payload);
  },
  testPlanModifyApi: payload => {
    return post('/project/testPlanModify', payload);
  },
};
