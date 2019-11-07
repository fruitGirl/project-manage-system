### PmTimelines
时间线组件

#### 属性
参数 | 说明 | 类型 | 可选值 | 默认值
-|-|-|-|-
activities | 时间线数组(具体参数如activities具体说明) | arrary | - | []

#### activities属性
参数 | 说明 | 类型 | 可选值 | 默认值
-|-|-|-|-
type | 节点类型 | string | primary / success / warning / danger / info | -
size | 节点尺寸 | string | normal / large | normal
color | 节点颜色 | string | hsl / hsv / hex / rgb  | '#dbdbdb'
icon | 节点图标 | string | — | ''
timestamp | 时间戳 | string | — | ''
placement | 时间戳位置 | string | top / bottom | bottom

#### demo
```
  <pm-timelines :activities="operationLogList"/>
```