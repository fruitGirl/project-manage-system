import { post } from '@/utils/request';

export default {
  getUserListApi: payload => post('/user/userPageQuery', payload),
  userGroupSetApi: payload => post('/user/userGroupSet', payload),
  groupUserSetApi: payload => post('/user/groupUserSet', payload)
};
