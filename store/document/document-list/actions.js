import services from '@/services/document/document-list';

export default {
  async getLibTypesApi({ commit }, payload) {
    try {
      const data = await services.getLibTypesApi(payload);
      const { fullPath = [] } = data;
      await commit({ type: 'mutationLibTypes', payload: fullPath });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },
  async getdocPageQueryApi({ commit }, payload) {
    try {
      const data = await services.getdocPageQueryApi(payload);
      const { list = [], paginator = {} } = data.queryResult;
      await commit({
        type: 'mutationList',
        payload: list
      });
      await commit({
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
      await commit({
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
