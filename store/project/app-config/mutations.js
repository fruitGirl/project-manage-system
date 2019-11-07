export default {
  setAppCodeList(state, payload) {
    state.allCodeList = payload.allCodeList;
  },
  setAppLinkQuery(state, payload) {
    const { projectData, projectAppLinkList, branchUrlLists } = payload;
    state.projectData = projectData;
    state.projectAppLinkList = projectAppLinkList;
    state.branchUrlLists = branchUrlLists;
  },
  displayBranchsModal(state, payload) {
    state.showBranchsModal = payload;
  },
  setAttachment(state, payload) {
    const { attachmentList } = payload;
    state.attachmentList = attachmentList;
  },
};
