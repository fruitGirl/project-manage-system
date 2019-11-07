/*
 * @Description: 提需求/编辑需求
 * @Author: moran 
 * @Date: 2019-10-25 18:30:23 
 * @Last Modified by: moran
 * @Last Modified time: 2019-10-28 16:50:08
 */
<template>
  <pm-drawer
    :title="title"
    :visible="visible"
    class="edit-requirement"
    @onCancel="onCancel"
  >
   <template v-slot:headerRight>
      <el-button type="primary" @click="onSubmit(false)">保存</el-button>
      <el-button v-if="isEdit" type="primary" @click="onSubmit(true)">保存并创建下一个</el-button>
    </template>
    <el-row  :gutter="32">
      <el-col :span="24">
        <el-form ref="editor" size="small" :model="editorForm" label-width="80px">
          <el-form-item
            label="标题"
            prop="title"
            :rules="[{ required: true, message: '请输入标题' }]"
          >
            <el-input
              v-model.trim="editorForm.title"
              autosize
              type="textarea"
              :maxlength="50"
              :rows="1"
              placeholder="请输入标题，最多50字"
            />
          </el-form-item>
          <form-requirement
            ref="requirementForm"
            :forms="forms"
            :product-id="productId"
            :init-fill-data="initFillData"
          />
          <el-form-item>
            <pm-editor ref="autotext" v-model="description" />
          </el-form-item>
        </el-form>
        <pm-upload-file ref="uploadRef" :file-list="forms.attachmentList" />
      </el-col>
    </el-row>
  </pm-drawer>
</template>

<script>
import PmEditor from '@/components/common/pm-editor';
import FormRequirement from '@/components/business/common/requirement-list/form-requirement.vue';
import PmUploadFile from '@/components/common/pm-upload-file/index.vue';
import PmDrawer from '@/components/common/pm-drawer.vue';

export default {
  components: {
    PmEditor,
    FormRequirement,
    PmUploadFile,
    PmDrawer
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    forms: {
      type: Object,
      default: () => {}
    },
    productId: {
      type: [String, Number],
      default: ''
    },
    initFillData: {
      type: Object,
      default: () => {}
    },
    isEdit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      editorForm: {
        title: ''
      },
      description:
        '<p><strong style="color: rgb(102, 163, 224);">用户场景：</strong></p><p>无</p><p><br></p><p><strong style="color: rgb(102, 163, 224);">需求描述：</strong></p><p>无</p><p><br></p><p><strong style="color: rgb(102, 163, 224);">原型链接：</strong></p><p>无</p>'
    };
  },
  watch: {
    forms: {
      handler(val) {
        this.editorForm.title = val.title;
        this.description = val.description;
      },
      deep: true
    },
    visible(val) {
      if (!val) this.resetData();
    }
  },
  methods: {
    onCancel() {
      this.$emit('onCancel');
    },
    onSubmit(isCreate) {
      const formData = this.$refs.requirementForm.getFormData();
      const fileNameList = this.$refs.uploadRef.getData();
      this.$refs.editor.validate(valid => {
        if (valid && formData) {
          const needData = {
            ...formData,
            title: this.editorForm.title,
            description: this.$refs.autotext.getContent(),
            fileNameList
          };
          this.$emit('onSubmit', needData, isCreate);
          if (isCreate) this.resetData();
        }
      });
    },
    resetData() {
      this.$refs.editor.resetFields();
      this.description =
        '<p><strong style="color: rgb(102, 163, 224);">用户场景：</strong></p><p>无</p><p><br></p><p><strong style="color: rgb(102, 163, 224);">需求描述：</strong></p><p>无</p><p><br></p><p><strong style="color: rgb(102, 163, 224);">原型链接：</strong></p><p>无</p>';
      this.forms.attachmentList = [];
      this.$refs.requirementForm.resetData();
    }
  }
};
</script>

<style lang="less" scoped>
@deep: ~'>>>';
.edit-requirement {
  height: 100%;
  padding-right: 15px;
  .right-module {
    height: 100%;
    padding: 15px 20px;
    background: #f9fafc;
  }
  @{deep}.ql-toolbar.ql-snow,
  @{deep}.ql-container.ql-snow {
    border: 1px solid #dcdfe6 !important;
  }
  @{deep}.ql-container.ql-snow {
    border-top: none !important;
  }
  .title-left {
    float: left;
  }
  .title-right {
    float: right;
    margin-right: 15px;
  }
}
</style>
