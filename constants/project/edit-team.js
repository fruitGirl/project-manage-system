const pageData = {
  paths: [
    {
      path: '/project/team-manage',
      name: '团队'
    },
    {
      path: '',
      name: '团队管理'
    }
  ],
  buttons: [
    { label: '取消', textColor: 'primary', func: 'cancelHandle' },
    { label: '保存', type: 'primary', func: 'saveHandle' }
  ],
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
    },
    {
      label: '可用工日',
      prop: 'days',
      show: true
    },
    {
      label: '可用工时/日',
      prop: 'hours',
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
