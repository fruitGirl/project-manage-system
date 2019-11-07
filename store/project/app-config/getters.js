export default {
  branchList(state) { // 分支列表
    return state.projectAppLinkList.map(i => i.branchUrl);
  }
};
