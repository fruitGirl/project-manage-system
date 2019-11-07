import services from '@/services/project/app-config';

export default {
  async getAppCodeList({ commit }, payload) {
    try {
      const data = await services.appCodeParamInitApi(payload);
      commit('setAppCodeList', data);
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },
  async projectAppLinkModify({ commit }, payload) {
    await services.projectAppLinkModifyApi(payload);
  },
  async getAppLinkQuery({ commit }, payload) {
    try {
      const data = await services.projectAppLinkQueryApi(payload);
      const { project = {}, projectAppLinkList = [] } = data;
      const branchUrlLists = projectAppLinkList.map(i => {
        return `svn cp https://huored.gicp.net:8088/svn/${i.appCode}/trunk   ${i.branchUrl} -m 'init'`;
      });
      commit('setAppLinkQuery', {
        projectData: project,
        projectAppLinkList,
        branchUrlLists
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },
  async projectAppLinkCreate({ commit }, payload) {
    await services.projectAppLinkCreateApi(payload);
  },
  async projectAppLinkDelete({ commit }, payload) {
    await services.projectAppLinkDeleteApi(payload);
  },
  async markCreateBranch({ commit, dispatch, state }, payload) {
    try {
      await services.markCreateBranchApi(payload);
      this.$showSuccessMessage('操作成功');
      const { id } = state.projectData;
      await dispatch('getAppLinkQuery', { projectId: id });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },
  async markMergeBranch({ commit, dispatch, state }, payload) {
    try {
      await services.markMergeBranchApi(payload);
      this.$showSuccessMessage('操作成功');
      const { id } = state.projectData;
      await dispatch('getAppLinkQuery', { projectId: id });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },
  // 获取冲突文件
  async getAttachment({ commit, dispatch, state }, payload) {
    try {
      const data = await services.getAttachmentApi(payload);
      const { attachments } = data;
      commit('setAttachment', {
        attachmentList: attachments
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },
};
