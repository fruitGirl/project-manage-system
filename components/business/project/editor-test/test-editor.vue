/*
 * @Description: 新增测试单-标题以及编辑器
 * @Author: moran
 * @Date: 2019-06-28 12:00:55
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 16:26:56
 */
<template>
  <div class="pm-test-editor">
    <el-form
      ref="editor"
      size="small"
      label-width="100px"
      :model="editorForm"
      :rules="rules"
    >
      <el-form-item label="标题" prop="testTitle">
        <el-input
          v-model="editorForm.testTitle"
          autosize
          type="textarea"
          :maxlength="50"
          :rows="1"
          placeholder="请输入标题，最多50字"
        />
      </el-form-item>
      <el-form-item label="测试单描述">
        <div style="height:500px">
          <pm-editor ref="autotext" :value="editorForm.editorContent"/>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import PmEditor from '@/components/common/pm-editor';
import { EDITORRULES } from '@/constants/project/editor-test';
export default {
  components: {
    PmEditor
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    forms: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      rules: EDITORRULES,
      editorForm: {
        testTitle: this.name,
        editorContent: ''
      }
    };
  },
  watch: {
    forms: {
      handler(val) {
        const { name, description } = val;
        this.editorForm = {
          ...this.editorForm,
          testTitle: name,
          editorContent: description
        };
      },
      deep: true
    }
  },
  methods: {
    getFormValue() {
      // 组件公共方法
      let editorData = false;
      this.$refs.editor.validate(valid => {
        if (valid) {
          editorData = {
            name: this.editorForm.testTitle,
            description: this.$refs.autotext.getContent()
          };
        }
      });
      return editorData;
    }
  }
};
</script>
