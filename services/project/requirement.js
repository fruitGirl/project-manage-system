import { post } from '@/utils/request';

export default {
  getTreeByPrductId: payload => {
    return post('/project/moduleTreeQuery', payload);
  },

  // 模块树的根据名字模糊查询 productId=1&name=3
  getTreeByPrductIdAndName: payload => {
    return post('/project/moduleNameFuzzyQuery', payload);
  },
};
