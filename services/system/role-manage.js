import { post } from '@/utils/request';

export default {
  getRoleQueryApi: payload => post('/user/roleQuery', payload),
  roleCreateApi: payload => post('/user/roleCreate', payload),
  roleModifyApi: payload =>  post('/user/roleModify', payload)
};
