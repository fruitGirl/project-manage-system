const pageData = {
  column: [
    {
      label: '名称',
      prop: 'needName',
      align: 'left'
    },
    {
      label: '创建人员',
      prop: 'creator'
    },
    {
      label: '更新时间',
      prop: 'gmtModified'
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
