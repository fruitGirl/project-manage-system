import { post } from '@/utils/request';

export default {
  productModifyInitApi: payload => {
    return post('/project/productModifyInitPage', payload);
  },
  productModifyApi: payload => {
    return post('/project/productModify', payload);
  },
  productRunApi: payload => {
    return post('/project/productRun', payload);
  },
  productStopApi: payload => {
    return post('/project/stopProduct', payload);
  },
};
