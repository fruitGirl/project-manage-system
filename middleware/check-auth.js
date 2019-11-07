/*
 * @Description: 设置登陆授权信息
 * @Author: danding
 * @Date: 2019-06-17 11:02:17
 * @Last Modified by: danding
 * @Last Modified time: 2019-07-02 18:51:32
 */

import { getUserFromCookie, getToken } from '@/utils/auth';

export default function({ store, req }) {
  const isServer = process.server;
  if (isServer && !req) return;
  const loggedUser = isServer
    ? getUserFromCookie(req)
    : getToken();
  store.commit('setUserAuth', loggedUser);
}
