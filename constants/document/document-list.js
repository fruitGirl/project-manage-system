const pageData = {
  column: [
    {
      label: '文档标题',
      prop: 'title',
      minWidth: 200,
      show: true,
      align: 'left'
    },
    {
      label: '创建人员',
      prop: 'creator',
      sortable: 'custom',
      minWidth: 100
    },
    {
      label: '创建时间',
      prop: 'shortGmtCreate',
      sortable: 'custom',
      minWidth: 130
    }
  ],
  operation: [
    {
      id: '1',
      label: '编辑',
      type: 'text',
      func: 'editHandle'
    },
    {
      id: '2',
      label: '删除',
      type: 'text',
      func: 'deleteHandle'
    }
  ]
};
export default pageData;
