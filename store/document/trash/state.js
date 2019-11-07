export default () => {
  return {
    list: [],
    libTypes: [],
    editDocInfo: null,
    pagination: {
      page: 0,
      pages: 1,
      itemsPerPage: 10,
      items: 0
    },
    activeTabVal: '',
    activeNodeId: ''
  };
};
