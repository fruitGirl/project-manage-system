import services from '@/services/project/edit-project';

const formatData = data => {
  const defaultUserOption = [];
  for (const key in data.userIdAndNickNameMap) {
    defaultUserOption.push({
      value: key,
      label: data.userIdAndNickNameMap[key]
    });
  }
  const productIds = data.productLinked.map(item => item.id);
  const {
    name,
    type,
    priority,
    gmtEstimateStart,
    gmtEstimateEnd,
    projectManager,
    productManager,
    testManager,
    developManager,
    visitType,
    description
  } = data.project;
  const form = {
    name,
    type: type.name,
    gmtEstimate: [gmtEstimateStart, gmtEstimateEnd],
    priority,
    productIds,
    projectManager,
    productManager,
    testManager,
    developManager,
    visitType: visitType.name,
    description: description,
    defaultUserOption
  };
  return form;
};

export default {
  async saveProjectMsg({ dispatch, rootState, commit }, payload) {
    try {
      await services.createProjectMsgApi(payload);
      await dispatch('common-config/getProjects', null, { root: true });
      this.$showSuccessMessage('新增成功');
      const dependenceId = rootState['common-config'].projects[0].id;
      await commit(
        'layout/changeSelectedDependenceId',
        { payload: dependenceId },
        { root: true }
      );
      this.$PMRouter.push('/project/home');
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },
  async projectModifyInitPageApi({ commit }, payload) {
    try {
      const data = await services.projectModifyInitPageApi(payload);
      commit({
        type: 'mutationForm',
        payload: formatData(data)
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },
  async projectModifyApi({ commit, dispatch }, payload) {
    try {
      await services.projectModifyApi(payload);
      this.$showSuccessMessage('修改成功');
      await dispatch('common-config/getProjects', null, { root: true });
      this.$PMRouter.back();
    } catch (err) {
      this.$showErrorMessage(err);
    }
  }
};
