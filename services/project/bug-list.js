import { post } from '@/utils/request';

export default {
  // 获取buglist
  bugPageQueryApi: payload => {
    return post('/project/bugPageQuery', payload);
  },

  // 激活bug
  activateBugApi: payload => {
    return post('/project/bugActivate', payload);
  },

  // 关闭bug
  closeBugApi: payload => {
    return post('/project/bugClose', payload);
  },

  // 解决bug
  solveBugApi: payload => {
    return post('/project/bugSolve', payload);
  },

  // 新增bug
  bugCreateApi: payload => {
    return post('/project/bugCreate', payload);
  },

  // 删除bug
  bugDeleteApi: payload => {
    return post('/project/bugDelete', payload);
  },

  // 获取bug编辑初始值
  bugModifyInitPageApi: payload => {
    return post('/project/bugModifyInitPage', payload);
  },

  // bug编辑
  bugModifyApi: payload => {
    return post('/project/bugModify', payload);
  },
};
