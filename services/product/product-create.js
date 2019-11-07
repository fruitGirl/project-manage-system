import { post } from '@/utils/request';

export default {
  productCreateApi: payload => {
    return post('/project/productCreate', payload);
  }
};
