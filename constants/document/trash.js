const pageData = {
  column: [
    // {
    //   label: 'ID',
    //   prop: 'id'
    // },
    {
      label: '文档标题',
      prop: 'title',
      show: true
    },
    {
      label: '创建人员',
      prop: 'creator'
    },
    {
      label: '删除时间',
      prop: 'gmtModified'
    }
  ],
  operation: [
    {
      label: '恢复',
      type: 'text',
      func: 'recoverHandle'
    }
  ]
};
export default pageData;
