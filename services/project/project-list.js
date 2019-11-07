import { post } from '@/utils/request';

export default {
  getListApi: payload => {
    return post('/project/projectPageQuery', payload);
  },

  getRelateProductApi: payload => {
    return post('/project/projectProductLinkInitPage', payload);
  },

  saveRelateProductApi: payload => {
    return post('/project/projectProductLink', payload);
  },

  getProjectMsgApi: payload => {
    return post('/project/projectModifyInitPage', payload);
  },

  getProjectTeamApi: payload => {
    return post('/project/projectTeamQuery', payload);
  },
};
