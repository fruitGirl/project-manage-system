/*
 * @Description: 判断登陆，跳转首页
 * @Author: danding
 * @Date: 2019-06-17 11:01:07
 * @Last Modified by: danding
 * @Last Modified time: 2019-07-02 18:53:33
 */

export default function({ store, redirect }) {
  if (store.getters.isAuthenticated) {
    return redirect('/');
  }
}
