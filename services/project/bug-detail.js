import { post } from '@/utils/request';

export default {
  bugDetailQueryApi: payload => {
    return post('/project/bugDetailQuery', payload);
  }
};

