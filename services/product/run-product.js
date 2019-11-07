import { post } from '@/utils/request';

export default {
  productRunApi: payload => {
    return post('/project/productRun', payload);
  },
  productStopApi: payload => {
    return post('/project/stopProduct', payload);
  }
};
