### PmTableNest
可展开表格

#### 参数
- column->正常列header
- cellColumn->伸缩列header
- data->源数据

#### 用法如下

```
<pm-table-nest
:column="column"
:cellColumn="cellColumn"
:data="data"
></pm-table-nest>


参数格式实例
 data: [
    {
      id: 1,
      name: '我是名字啊',
      desc: '我是描述啊',
      expandData: [
        {
          name: 'sdsss',
          number: "编号",
          step: 'sjdhfkbwsjf奥赛辅导我不维和防暴 较蒋介石的机会是不是地方'
        }
      ]
    },
    {
      id: 2,
      name: '我是名字啊2',
      desc: '我是描述啊2',
      expandData: [
        {
          name: 'sdszxcsd哦对平民ss',
          number: "的钉钉",
          step: '的卡卡卡卡卡'
        }
      ]
    }
  ],
 cellColumn: [
    {
      label: '编号',
      prop: 'number',
      width: 120
    },
    {
      label: '步骤',
      prop: 'step'
    },
    {
      label: '名字',
      prop: 'name'
    },
  ],
  column: [
    {
      label: '商品名称',
      prop: 'name',
      width: 120
    },
    {
      label: '描述',
      prop: 'desc'
    }
  ],
```
