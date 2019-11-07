### PmRemoteSelect
获取远程数据的下拉框

#### 属性
参数 | 说明 | 类型 | 可选值 | 默认值
-|-|-|-|-
action | 接口 | string | - | -
placeholder | placeholder | string | - | 请选择
value | 下拉框的值 | string、number、array | - | -
filterable | 是否可搜索 | boolean | - | false
isTransparentBorder | 输入框是否透明边框（无边框） | boolean | - | true
needAllOpt | 是否包含全部选择项 | boolean | - | true
allOptText | 全部选择项的文本 | string | - | 全部
isMultiple | 是否多选模式 | boolean | - | false
clearable | 是否可清除 | boolean | - | false
parseStructure | 解析重构数据结构，重组成lable, value 形式 | function | - | 如下

`tip: parseStructure 函数说明`
```
function parseStructure(data, allOptText, needAllOpt) {
  const needData = [];
  for (const i in data.fullPath) {
    needData.push({
      label: i,
      value: data.fullPath[i]
    });
  }
  if (needAllOpt && allOptText) {
    needData.unshift({ label: allOptText, value: null });
  }
  return needData;
} 
```
