import { post } from '@/utils/request';

export default {
  getTeamDetailQueryApi: payload => post('/project/teamDetailQuery', payload)
};
