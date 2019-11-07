import { post } from '@/utils/request';

export default {
  getProductHomeDataApi: payload => {
    return post('/project/productHomePageQuery', payload);
  }
};
