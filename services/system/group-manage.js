import { post } from '@/utils/request';

export default {
  groupQueryApi: payload => post('/user/groupQuery', payload),
  groupCreateApi: payload => post('/user/groupCreate', payload),
  groupModifyApi: payload => post('/user/groupModify', payload),
  groupUserSetInitApi: payload => post('/user/groupUserSetInit', payload),
  authorityGroupSetApi: payload => post('/user/authorityGroupSet', payload),
  authorityGroupSetInitApi: payload => post('/user/authorityGroupSetInit', payload)
};
