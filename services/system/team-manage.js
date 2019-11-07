import { post } from '@/utils/request';

export default {
  getTeamListApi: payload => post('/project/teamPageQuery', payload),
  teamModifyEnabledApi: payload => post('/project/teamModifyEnabled', payload)
};
