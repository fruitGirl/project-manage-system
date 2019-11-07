import { post } from '@/utils/request';

export default {
  getProjectMemberApi: payload => {
    return post('/project/projectMemberQuery', payload);
  },

  projectMemberModifyApi: payload => {
    return post('/project/projectMemberModify', payload);
  },

  projectMemberDeleteApi: payload => {
    return post('/project/projectMemberDelete', payload);
  },
};
