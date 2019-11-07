/*
 * @Description: 判断是否授权有效，如果否，跳转登陆
 * @Author: danding
 * @Date: 2019-06-17 11:01:42
 * @Last Modified by: danding
 * @Last Modified time: 2019-06-17 17:47:25
 */

export default function({ store, redirect }) {
  if (!store.getters.isAuthenticated) {
    return redirect('/auth/login');
  }
}
