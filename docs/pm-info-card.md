### PmInfoCard
模块卡片容器

#### Slot
name | 说明  
-|-
title | 标题 | -
content | 内容 | -

#### demo
```
  <pm-info-card>
    <template v-slot:title>
      <span>标题</span>
    </template>
    <template v-slot:content>
      <div>内容</div>
    </template>
  </pm-info-card>
```

 > tip: 效果请详见测试用例的基本信息、操作记录模块

