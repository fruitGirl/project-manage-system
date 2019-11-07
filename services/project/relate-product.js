import { post } from '@/utils/request';

export default {
  serviceApi: payload => {
    return post('', payload);
  }
};

