export default {
  mutationDocInfo(state, { payload }) {
    state.docInfo = payload;
  },
  mutationAttachmentList(state, { payload }) {
    state.attachmentList = payload;
  },
  mutationOperationList(state, { payload }) {
    state.operationLogList = payload;
  }
};
