const pageData = {
  column: [
    {
      label: '角色名',
      prop: 'name'
    },
    {
      label: '有效性',
      prop: 'enabled',
      show: true
    }
  ],
  operation: [
    {
      id: '1',
      type: 'text',
      label: '编辑',
      func: 'editHandle'
    }
  ]
};
export default pageData;
