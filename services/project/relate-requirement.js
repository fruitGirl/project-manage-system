import { post } from '@/utils/request';

export default {
  projectDemandLinkBatchApi: payload => {
    return post('/project/projectDemandLinkBatchCreate', payload);
  },

  projectDemandPageQueryApi: payload => {
    return post('/project/projectDemandPageQuery', payload);
  },
};
