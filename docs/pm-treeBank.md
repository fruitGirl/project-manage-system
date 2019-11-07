### PmTreeBank
文档库 模块设置 树组件

#### 何时使用

- 树节点有编辑 删除 添加子节点功能时可使用。

####基本用法
  <pm-tree-bank
    :tree-data="[]"
  >
  </pm-tree-bank>

#### treeBank props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| treeData | 树的数据 | array | [] |  |
| defaultTreeProps | 见下表 | object | {} |  |
| defaultExpandedLevel | 默认展开第几层 | array | [1] |  |
| showCustomNode | 是否显示自定义节点(即节点后面的删除、编辑、添加按钮) | boolean | true |  |
| addNode | 添加子节点的函数 | (node, inputNodeData) => {} 如果返回promise，则会有按钮loading效果 | - |  |
| editNode | 编辑节点的函数 | (node, inputNodeData) => {} 如果返回promise，则会有按钮loading效果| - |  |
| deleteNode | 删除节点的函数 | key => {}| - |  |
| draggable | 是否允许拖拽 | boolean | false |  |
| dragDrop | 拖拽放置函数 | (sourceNode, targetNode, place, event) => {} | - |  |
| forbidDragLevelList | 第几层禁止拖拽 | array | [1] |  |
| forbidDropLevelList | 第几层禁止放置（如果有位置的限制，可以传入对象数组，指明什么位置不能放） | array  | [1]或<br/>[{level:1,place:'inner'}] |  |
| activeTreeNodeId | 当前选中的树节点id | string | '' |  |
| hideEditLevelList | 第几层隐藏节点编辑按钮 | array | [] |  |
| hideAddLevelList | 第几层隐藏节点添加按钮 | array | [] |  |
| hideDeleteLevelList | 第几层隐藏节点删除按钮 | array | [] |  |

#### defaultTreeProps
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| label |指定节点标签为节点对象的某个属性值| string, function(data, node) | - |  |
| children | 指定子树为节点对象的某个属性值 | string | - |  |
| disabled | 指定节点选择框是否禁用为节点对象的某个属性值 | boolean, function(data, node) | - |  |
| isLeaf | 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效 | boolean, function(data, node) | - |  |
#### treeBank methods
| 方法名 | 说明 | 参数
| --- | --- | --- 
| current-change | 当前选中节点变化时触发的事件 | 共两个参数，依次为：当前节点的数据，当前节点的 Node 对象 

#### slot
| name | 说明
| --- | --- 
| no-data | 用来显示暂无数据的插槽

