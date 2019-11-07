import docDetailServices from '@/services/document/doc-detail';
import { getOperationLogApi } from '@/services/common-config';

const formatLogList = list => {
  return list.map(item => {
    return {
      content: `${item.operator}  ${item.actionType.message}`,
      time: item.gmtCreate,
      memos: [item.memo]
    };
  });
};

export default {
  async getdocDetailQueryApi({ commit }, payload) {
    try {
      const data = await docDetailServices.getdocDetailQueryApi(payload);
      const { doc } = data;
      commit({
        type: 'mutationDocInfo',
        payload: {
          ...doc,
          name: doc.name || '-',
          ownerObject: (doc.ownerObject && doc.ownerObject.message) || '-'
        }
      });
      commit({
        type: 'mutationAttachmentList',
        payload: data.attachmentList
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },
  async getOperationLogApi({ commit }, payload) {
    try {
      const data = await getOperationLogApi(payload);
      commit({
        type: 'mutationOperationList',
        payload: formatLogList(data.operationLogList)
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  }
};
