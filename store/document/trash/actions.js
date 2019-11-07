import services from '@/services/document/document-list';

export default {
  async getLibTypesApi({ commit }, payload) {
    try {
      const data = await services.getLibTypesApi(payload);
      commit({ type: 'mutationLibTypes', payload: data.fullPath });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },
  async getdocPageQueryApi({ commit }, payload) {
    try {
      const data = await services.getdocPageQueryApi(payload);
      const { queryResult } = data;
      const { list = [], paginator = {} } = queryResult;
      commit({
        type: 'mutationList',
        payload: list
      });
      commit({
        type: 'mutationPagination',
        payload: paginator
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },
  async docCreateApi({ commit }, payload) {
    const data = await services.docCreateApi(payload);
    return data;
  },
  async docModifyInitApi({ commit }, payload) {
    try {
      const data = await services.docModifyInitApi(payload);
      commit({
        type: 'mutationEditDocInfo',
        payload: {
          attachmentList: data.attachmentList,
          id: data.doc.id,
          title: data.doc.title,
          docLibId: data.doc.docLibId,
          brief: data.doc.brief,
          visitType: data.doc.visitType.name,
          docLibName: data.docLibName
        }
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },
  async docModifyApi({ commit }, payload) {
    const data = await services.docModifyApi(payload);
    return data;
  },
  async docModifyEnabledApi({ commit }, payload) {
    const data = await services.docModifyEnabledApi(payload);
    return data;
  }
};
