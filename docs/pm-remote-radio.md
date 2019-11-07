### PmRemoteRadio
获取远程数据的 radio group

#### 属性
参数 | 说明 | 类型 | 可选值 | 默认值
-|-|-|-|-
value | radio group 的值 | string、number、array | - | -
action | 接口 | string | - | -
parseStructure | 解析重构数据结构，重组成lable, value 形式 | function | - | 如下

`tip: parseStructure 函数说明`
```
function parseStructure(data) => {
    const dataProvider = [];
    for (const i in data.fullPath) {
      dataProvider.push({
        label: i,
        value: data.fullPath[i]
      });
    }
    return dataProvider;
  }
```
