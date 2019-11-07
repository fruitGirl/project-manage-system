import { post } from '@/utils/request';

export default {
  getProjectHomeDataApi: payload => {
    return post('/project/projectHomePageQuery', payload);
  }
};
