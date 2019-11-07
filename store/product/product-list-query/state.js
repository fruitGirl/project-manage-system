const state = () => {
  return {
    // 表格数据
    dataSource: [],
    // 表格分页
    pagination: {
      page: 1,
      pages: 1,
      itemsPerPage: 10
    }
  };
};

export default state;
