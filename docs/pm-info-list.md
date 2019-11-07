### PmInfoList
多行文本信息展示

#### 属性
参数 | 说明 | 类型 | 可选值 | 默认值
-|-|-|-|-
config | 信息配置 | array | - | []
data | 信息值 | object | - | {}
labelClass | label class | string | - | - 
valueClass | value class | string | - | -
isVertical | 是否单行展示一条信息 | boolean | - | true

#### demo
```
<pm-info-list :config="config" :data="data" />

<script>
  export default {
    data() {
      return {
        config: [  
          {
            label: '总任务',
            field: 'total'
          },
          {
            label: '未开始',
            field: 'unstart'
          },
          {
            label: '进行中',
            field: 'underway'
          }
        ],
        data: {
          total: 1,
          unstart: '是',
          underway: '否'
        }
      }
    }
  }
</script>
```

`tip: 详见用例详情的基本信息`
