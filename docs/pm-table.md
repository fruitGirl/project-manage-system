### PmTable 组件

#### Table Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| data | 显示的数据 | Array | [] |  |
| column | 列数据 | Array | [] |  |
| operationWidth | 操作列的宽度 | Number | 100 |  |
| defaultSort | 默认排序 | Object | {} |  |
| expand | 是否默认展开所有行，当 Table 中存在 type="expand" 的 Column 的时候有效 默认展开所有行 | Boolean | true |  |
| showExpand | 是否有展开 | Boolean| false |  |
| isOperation | 是否需要操作列 | Boolean | true |  |
| isPagination | 是否需要分页 | Boolean | true |  |
| isSelect | 是否需要多选框 | Boolean | false |  |
| rowKey | 行数据id | Function, String | 'id' |  |
| showHeader | 是否显示表格标题 | Boolean  | true |  |
| pagination | 分页参数 | Object | { page: 1, itemsPerPage: 10, pages: 10 } |  |
| stripe | 是否为斑马纹 table | Boolean | false |  |
| childrenField | 渲染嵌套数据的配置选项 children的数据 | String | 'children' |  |
| expandRowKeys | 展开行的 keys 数组 | Array | [] |  |
| loading | 加载表格 | Boolean | false |  |
| operation | 操作列数据 | Array | [] |  |
| border | 是否有边框 | Boolean | true |  |


#### Table Methods
| 方法名 | 说明 | 参数
| --- | --- | --- 
| sort | 点击排序时触发 | 共1个参数，当前列的数据 
| pageChange | 分页查询触发 | 共1个参数，返回一个对象，里面包含{ pageSize: '', currentPage: '' }
| selectChange | 可选表单选择数据时触发 | 共1个参数，选择行的数据
| expandChange | 当用户对某一行展开或者关闭的时候会触发该事件（展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded） | row, (expandedRows | expanded)
| clearRow | 清除选中数据 | 共1个参数，选择行的数据


#### Table-column Scoped Slot
| name | 说明
| --- | --- 
| 列的变量名 | 用来显示列的数据的插槽
| 列的变量名_header | 用来显示列的数据的其他样式的插槽
| operation | 用来显示操作列的插槽

#### 注意
- 如果列数据里需要自定义模板,列数据需要加入show:true,比如column:[{show:true,prop: "date",label: "日期"}]
- 如果头部需要加入hover显示, 列数据需要加入isCustomHeader: true, 比如[{isCustomHeader:true,prop: "date",label: "日期"}] 用法<template v-slot:date_header></template>
- operation操作列:如果需要定义按钮样式,尺寸以及方法必须要传入id,操作列数据需要传入,
比如operation:[{id: "1",type: "text",size: "small",label: "查看",func: "handleCheck"}]
type:按钮类型 el-button 的type;size:按钮尺寸 el-button size;label:按钮文字;func: 点击按钮触发的父组件

#### 用法如下
```

<pm-table
:data="data"
:column="column"
:operation="operation"
:pagination="pagination"
@handleCheck="handleCheck"
@sort="handleSort"
@pageChange="handlePageChange">
  // 自定义列是需要插槽写入
  <template slot="name" slot-scope="props">
    <div style="color: red">{{props.rowData.row.name}}</div>
  </template>
  <template v-slot:operation="{ rowData }">
    <el-button type="text">完成</el-button>
  </template>
</pm-table>
  
```
