import { post } from '@/utils/request';

export default {
  productListApi: payload => {
    return post('/project/productPageQuery', payload);
  }
};
