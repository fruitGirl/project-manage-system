// 表单配置
export const FORM_CONFIG = [
  {
    label: '用例类型',
    type: 'remote-select',
    initialValue: '',
    field: 'field1',
    props: {
      placeholder: '请选择'
    }
  },
  {
    label: '优先级',
    type: 'remote-select',
    initialValue: [],
    field: 'field4',
    props: {
      placeholder: '请选择'
    }
  },
  {
    label: '所属模块',
    type: 'remote-select',
    initialValue: '',
    field: 'field2',
    props: {
      placeholder: '请选择'
    }
  },
  {
    label: '关联需求',
    type: 'remote-select',
    initialValue: [],
    field: 'field3',
    props: {
      placeholder: '请选择'
    }
  }
];
