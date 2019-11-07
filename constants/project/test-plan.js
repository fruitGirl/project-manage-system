const pageData = {
  column: [
    {
      label: 'P',
      prop: 'P'
    },
    {
      label: '计划标题',
      prop: 'planTitle',
      show: true
    },
    {
      label: '创建人',
      prop: 'creater'
    },
    {
      label: '创建时间',
      prop: 'createTime'
    },
    {
      label: '优先级',
      prop: 'priority'
    },
    {
      label: '状态',
      prop: 'state'
    },
    {
      label: '版本',
      prop: 'version'
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
  ],
  settings: [
    {
      label: '创建人',
      type: 'input',
      initialValue: '',
      field: 'field1',
      props: {
        placeholder: '请输入'
      }
    },
    {
      label: '优先级',
      type: 'checkbox',
      initialValue: [],
      field: 'field5',
      span: 12,
      props: {
        dataProvider: [
          { label: '紧急', value: 111 },
          { label: '高', value: 222 },
          { label: '中', value: 333 },
          { label: '低', value: 444 }
        ]
      }
    },
    {
      label: '创建于',
      type: 'dateRange',
      initialValue: '',
      field: 'field3',
      span: 12,
      props: {
        placeholder: '请输入'
      }
    }
  ]
};
export default pageData;
