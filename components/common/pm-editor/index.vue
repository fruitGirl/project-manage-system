/*
 * @Description: 富文本编辑器
 * @Author: danding
 * @Date: 2019-06-17 10:58:08
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 16:25:15
 */

<template>
  <no-ssr>
    <div v-loading="quillUpdateImg" class="quill-container">
      <el-upload
        class="J-uploader uploader"
        :action="serverUrl"
        :http-request="handleCustomUpload"
        :show-file-list="false"
        :on-success="uploadSuccess"
        accept="image/gif,image/png,image/jpeg"
        :on-error="uploadError"
        :before-upload="beforeUpload"
      >
      </el-upload>
      <quill-editor
        ref="quillEditor"
        :value="content"
        class="quill-content"
        :options="editorOption"
        @change="handleChange"
        @ready="onEditorReady($event)"
      />
    </div>
  </no-ssr>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.bubble.css';
import Quill from 'quill';
import { EditorImagePaste } from '@/components/common/pm-editor/EditorImagePaste';
import { upload } from '@/utils/request';
import { EDITOR_UPLOAD_IMG_URL } from '@/services/common-config';

Quill.register('modules/imageDrop', EditorImagePaste);
const quillEditor = process.client
  ? require('vue-quill-editor').quillEditor
  : null;

export default {
  components: {
    quillEditor
  },
  model: {
    prop: 'value', // 绑定的值，通过父组件传递
    event: 'change' // 自定义事件名
  },
  props: {
    value: {
      // 初始内容值
      type: String,
      default: ''
    }
  },
  data() {
    return {
      content: this.value,
      serverUrl: EDITOR_UPLOAD_IMG_URL,
      quillUpdateImg: false,
      editorOption: {
        modules: {
          imageDrop: {
            handleCustomUpload: async params => {
              this.beforeUpload();
              try {
                const res = await this.handleCustomUpload(params);
                this.uploadSuccess(res);
              } catch (err) {
                this.uploadError();
              }
            }
          },
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ header: 1 }, { header: 2 }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ script: 'sub' }, { script: 'super' }],
              [{ indent: '-1' }, { indent: '+1' }],
              [{ direction: 'rtl' }],
              [{ size: ['small', false, 'large', 'huge'] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ color: [] }, { background: [] }],
              [{ font: [] }],
              [{ align: [] }],
              ['clean'],
              ['link', 'image']
            ],
            handlers: {
              image: value => {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector('.J-uploader input').click();
                } else {
                  this && this.quill.format('image', false);
                }
              }
            }
          }
        },
        placeholder: ''
      }
    };
  },
  watch: {
    value(val) {
      this.content = val;
    }
  },
  mounted() {},
  methods: {
    getContent() {
      // public func 获取内容值
      return this.content;
    },
    handleChange(e) {
      this.content = e.html;
      this.$emit('change', e.html);
    },
    // 富文本编辑器事件
    onEditorReady(editor) {
      this.$emit('onEditor', editor);
    },
    beforeUpload() {
      this.quillUpdateImg = true;
    },
    uploadSuccess(res, file) {
      // 获取富文本组件实例
      const quill = this.$refs.quillEditor.quill;

      // 如果上传成功
      if (res && res.url) {
        // 获取光标所在位置
        const length = quill.getSelection().index;

        // 插入图片  res.info为服务器返回的图片地址
        quill.insertEmbed(length, 'image', `${process.env.baseUrl}${res.url}`);

        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        this.$message.error('图片插入失败');
      }
      this.quillUpdateImg = false;
    },
    handleCustomUpload(res) {
      const formData = new FormData();
      formData.append('file', res.file);
      return upload(this.serverUrl, formData);
    },
    uploadError() {
      // 富文本图片上传失败
      this.quillUpdateImg = false;
      this.$message.error('图片插入失败');
    }
  }
};
</script>

<style scoped lang="less">
@deep: ~'>>>';

.quill-container {
  .uploader {
    display: none;
  }
  @{deep} .ql-editor {
    height: 350px;
  }
}
</style>
