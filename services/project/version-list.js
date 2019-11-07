import { post } from '@/utils/request';

export default {
  getProjectVersionListApi: payload => {
    return post('/project/projectVersionQuery', payload);
  },

  projectVersionCreateApi: payload => {
    return post('/project/projectVersionCreate', payload);
  },

  projectVersionModifyApi: payload => {
    return post('/project/projectVersionModify', payload);
  },

  projectVersionDeleteApi: payload => {
    return post('/project//projectVersionDelete', payload);
  },
};
