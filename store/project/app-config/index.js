import actions from './actions';
import mutations from './mutations';
import state from './state';
import getters from './getters';

export default {
  name: 'project/app-config',
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
