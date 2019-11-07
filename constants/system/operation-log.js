const pageData = {
  searchBarSetting: [
    {
      label: '操作人ID',
      type: 'input',
      field: 'operatorId'
    },
    {
      label: '操作人',
      type: 'input',
      field: 'operator'
    },
    {
      label: '内容',
      type: 'input',
      field: 'content'
    },
    {
      label: '动作类型',
      type: 'select',
      field: 'actionType',
      props: {
        placeholder: '',
        dataProvider: []
      }
    },
    {
      label: '操作对象ID',
      type: 'input',
      field: 'operateObjectId'
    },
    {
      label: '操作对象类型',
      type: 'select',
      field: 'operateObjectType',
      props: {
        placeholder: '',
        dataProvider: []
      }
    },
    {
      label: '创建时间',
      type: 'dateRange',
      field: 'createTime',
      props: {
        placeholder: '请输入'
      }
    }
  ],
  column: [
    {
      label: '',
      prop: 'content',
      type: 'expand',
      show: true
    },
    {
      label: 'id',
      prop: 'id'
    },
    {
      label: '操作人id',
      prop: 'operatorId'
    },
    {
      label: '操作人',
      prop: 'operator'
    },
    {
      label: '动作类型',
      prop: 'actionType'
    },
    {
      label: '操作对象类型',
      prop: 'operatObjType'
    },
    {
      label: '操作对象id',
      prop: 'operatObjId'
    },
    {
      label: '创建时间',
      prop: 'createTime'
    }
  ],
  operation: [
    {
      label: '查看日志内容',
      size: 'small',
      func: 'showDetailHandle'
    }
  ]
};
export default pageData;
