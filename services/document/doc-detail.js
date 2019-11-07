import { post } from '@/utils/request';

export default {
  getdocDetailQueryApi: payload => {
    return post('/project/docDetailQuery', payload);
  }
};
