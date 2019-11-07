const pageData = {
  paths: [ // 面包屑配置
    {
      path: '/system/team-manage',
      name: '团队管理'
    },
    {
      path: '',
      name: '团队详情'
    }
  ],
  column: [ // 列配置
    {
      label: '花名',
      prop: 'name'
    },
    {
      label: '角色',
      prop: 'teamRole'
    }
  ],
  buttons: [ // 操作按钮配置
    { label: '返回', textColor: 'primary', func: 'backHandle' },
    { label: '删除', textColor: 'primary', func: 'deleteHandle' },
    { label: '编辑', textColor: 'primary', func: 'editHandle' }
  ]
};

export default pageData;
