/*
 * @Description: 文件上传
 * @Author: xiaojian
 * @Date: 2019-07-03 16:56:03
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-06 16:26:12
 */

<template>
  <div>
    <el-upload
      ref="upload"
      action=" "
      :http-request="handleCustomUpload"
      multiple
      :limit="limit"
      :on-exceed="handleExceed"
      :on-change="onChange"
      :on-error="onError"
      :before-upload="beforeUpload"
      :before-remove="beforeRemove"
      :file-list="files"
      :on-preview="onPreview"
      :on-remove="onChange"
      :show-file-list="showFileList"
      :accept="fileTypes.join()"
    >
      <el-button size="small" type="primary">{{ name }}</el-button>
      <!-- <div
        slot="tip"
        class="el-upload__tip"
      >只能上传rar/zip、JPG/PNG/GIF/BMP、word、excel、PPT、PDF,且不大于{{maxSize}}兆</div>-->
    </el-upload>
  </div>
</template>
<script>
import { upload, post } from '@/utils/request';
import { attachmentConfigQueryApi } from '@/services/common-config';
export default {
  props: {
    name: {
      type: String,
      default: '添加附件'
    },
    fileList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    paramsFields: {
      type: [Object, Boolean],
      default: () => false
    },
    action: {
      type: String,
      default: '/home/attachmentUpload'
    },
    showFileList: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      files: [],
      fileTypes: [
        'application/pdf', // .pdf
        'aplication/zip', // .zip
        'application/x-zip-compressed', // .zip
        'application/vnd.ms-powerpoint', // .ppt
        'application/vnd.ms-excel', // .xls
        'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xslx
        'application/msword',
        'image/gif',
        'image/jpeg',
        'image/png',
        'image/bmp'
      ],
      maxSize: 30,
      limit: 3
    };
  },
  watch: {
    fileList: {
      handler(val) {
        this.files = val.map(item => {
          if (!item.name) {
            return {
              ...item,
              name: item.fileName
            };
          }

          return item;
        });
      },
      immediate: true
    }
  },
  created() {
    attachmentConfigQueryApi()
      .then(re => {
        this.fileTypes = re.acceptType.map(item => `.${item}`);
        this.limit = re.acceptNums;
        this.maxSize = re.acceptLength;
      })
      .catch(err => {
        this.$showErrorMessage(err);
      });
  },
  methods: {
    getData() {
      const files = this.files.filter(i => i.response && i.response.fileName);
      return files.map(i => i.response.fileName);
    },
    resetData() {
      this.files = [];
      this.$refs.upload.clearFiles();
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择${this.limit}个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    onChange(file, fileList = []) {
      this.files = fileList;
      this.$emit('change', file, fileList);
    },
    handleCustomUpload(res) {
      const formData = new FormData();
      formData.append('attachment', res.file);
      if (this.paramsFields) {
        for (const i in this.paramsFields) {
          formData.append(i, this.paramsFields[i]);
        }
      }
      return upload(this.action, formData);
    },
    onError(err) {
      this.$showErrorMessage(err);
    },
    beforeRemove(file) {
      const { id } = file;
      if (id) {
        return this.customRemove(id).catch(err => {
          this.$showErrorMessage(err);
          throw err;
        });
      }
      return true;
    },
    async customRemove(id) {
      const result = await post('/home/attachmentDelete', {
        id
      });
      return result;
    },
    beforeUpload(file) {
      const { size, name } = file;

      const type = `.${name.split('.').pop()}`;

      if (this.fileTypes.indexOf(type) === -1 && type !== '') {
        this.$showErrorMessage('请上传正确的文件格式');
        return false;
      }
      if (size / 1024 / 1024 > this.maxSize) {
        this.$showErrorMessage('文件不能大于' + this.maxSize + '兆');
        return false;
      }
      return true;
    },
    onPreview(file) {
      const { href, fileName, resourceId } = file;
      if (href) {
        this.openFile(href, fileName);
      } else if (resourceId) {
        this.openFile(
          `${process.env.baseUrl}/attachment.resource?resourceId=${resourceId}&fileName=${fileName}`,
          fileName
        );
      }
    },
    openFile(url, fileName) {
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.target = '_blank';
      link.click();
    }
  }
};
</script>
