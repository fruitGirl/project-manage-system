// 文档面包屑和基本信息配置
const pageData = {
  config: [
    {
      label: 'ID',
      field: 'id'
    },
    {
      label: '可见性',
      field: 'visitType'
    },
    {
      label: '所属产品',
      field: 'name'
    },
    {
      label: '所属项分类',
      field: 'ownerObject'
    }
  ],
  paths: [
    {
      path: './document-list',
      name: '文档'
    },
    {
      path: '',
      name: '文档详情'
    }
  ]
};

export default pageData;
