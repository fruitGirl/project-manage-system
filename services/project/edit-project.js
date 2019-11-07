import { post } from '@/utils/request';

export default {
  createProjectMsgApi: payload => {
    return post('/project/projectCreate', payload);
  },

  saveProjectMsgApi: payload => {
    return post('/project/projectModify', payload);
  },

  projectModifyApi: payload => {
    return post('/project/projectModify', payload);
  },

  projectModifyInitPageApi: payload => {
    return post('/project/projectModifyInitPage', payload);
  },
};
