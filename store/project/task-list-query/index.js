import actions from './actions';
import mutations from './mutations';
import state from './state';

export default {
  name: 'project/task-list-query',
  namespaced: true,
  state,
  mutations,
  actions
};
