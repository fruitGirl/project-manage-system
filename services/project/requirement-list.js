import { post } from '@/utils/request';

export default {
  getProjectDemandPageApi: payload => {
    return post('/project/projectDemandLinkPageQuery', payload);
  }
};
