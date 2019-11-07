export default {
  mutateList(state, { payload }) {
    state.list = payload;
  },
  mutationPagination(state, { payload }) {
    state.pagination = payload;
  },
  displayBugDetailDrawer(state, payload) {
    state.showBugDetailDrawer = payload;
  },
  displayCreateRequirementDrawer(state, payload) {
    state.showCreateRequirementDrawer = payload;
  },
  displayCreateUseCaseDrawer(state, payload) {
    state.showCreateUseCaseDrawer = payload;
  },
  displayRequirementDetailDrawer(state, payload) {
    state.showRequirementDetailDrawer = payload;
  },
  displayTaskDetailDrawer(state, payload) {
    state.showTaskDetailDrawer = payload;
  },
};
