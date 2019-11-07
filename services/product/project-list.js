import { post } from '@/utils/request';

export default {
  // 产品-项目列表查询
  productProjectPageQueryApi: payload => {
    return post('/project/productProjectPageQuery', payload);
  }
};
