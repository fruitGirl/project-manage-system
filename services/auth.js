import { post } from '@/utils/request';

export const LOGIN_URL = '/home/login';

export default {
  loginApi: payload => {
    return post(LOGIN_URL, payload);
  },

  logoutApi: payload => {
    return post('/home/logout', payload);
  },

  // 刷新权限
  refreshRoleApi: payload => {
    return post('/home/refreshAuthority', payload);
  },
};
