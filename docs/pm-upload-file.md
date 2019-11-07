### PmUploadFile
文件上传组件

#### 何时使用

- 上传附件 图片等

#### 基本用法
  <pm-upload-file
    :fileList="fileList"
    @change="handleChange"
  ></pm-upload-file>
....
methods:{
  ......
  handleChange(file,fileList){
    this.fileList= fileList

  }
}
#### pm-upload-file props
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| fileList | 文件列表数据 | array | [] |  |
