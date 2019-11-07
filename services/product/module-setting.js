import { post } from '@/utils/request';

export default {
  getTreeDataApi: payload => {
    return post('/project/productAndModuleTreeQuery', payload);
  },
  moduleCreateApi: payload => {
    return post('/project/moduleCreate', payload);
  },
  moduleEditApi: payload => {
    return post('/project/moduleModify', payload);
  },
  moduleDeleteApi: payload => {
    return post('/project/moduleDelete', payload);
  },
  moduleDragApi: payload => {
    return post('/project/moduleMove', payload);
  },
};
