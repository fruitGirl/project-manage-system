import { post } from '@/utils/request';

export default {
  createTeamApi: payload => post('/project/teamCreate', payload)
};
