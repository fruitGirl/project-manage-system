import { post } from '@/utils/request';

export default {
  getTeamByIdApi: payload => post('/project/teamModifyInit', payload),
  teamModifyApi: payload => post('/project/teamModify', payload),
  teamMemberDeleteApi: payload => post('/project/teamMemberDelete', payload)
};
