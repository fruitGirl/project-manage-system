import actions from './actions';
import mutations from './mutations';
import state from './state';

export default {
  // name: 'system/operation-log/xxx',
  namespaced: true,
  state,
  mutations,
  actions
};
