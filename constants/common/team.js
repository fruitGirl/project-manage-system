const pageData = {
  column: [
    {
      label: '花名',
      prop: 'userId',
      show: true
    },
    {
      label: '团队角色',
      prop: 'roleId',
      show: true
    }
  ],
  operation: [
    {
      id: '1',
      type: 'text',
      label: '删除',
      func: 'deleteHandle'
    }
  ]
};
export default pageData;
