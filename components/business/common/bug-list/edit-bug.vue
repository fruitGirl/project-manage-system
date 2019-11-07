/*
 * @Description: bug列表-编辑bug
 * @Author: yaochen
 * @Date: 2019-06-25 12:01:03
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-01 15:23:48
 */

<template>
  <pm-drawer
    :title="title"
    :visible="visible"
    @onCancel="handleCancel"
  >
   <template v-slot:headerRight>
      <el-button type="primary" @click="handleSubmit(false)">保存</el-button>
      <el-button v-if="!isEdit" type="primary" @click="handleSubmit(true)">保存并创建下一个</el-button>
    </template>
    <el-row class="edit-bug" :gutter="32">
      <el-form ref="editBugForm" :rules="rules" :model="form" label-width="6rem">
        <el-col :span="24">
          <el-form-item prop="title" label="标题">
            <el-input
              v-model="form.title"
              autosize
              type="textarea"
              maxlength="50"
              placeholder="请输入标题，最多50字"
            />
          </el-form-item>
          <edit-bug-form ref="bugForm" :is-project-modules="isProjectModules" />
          <pm-separate size="20" />
          <pm-editor v-model="form.steps" />
          <pm-separate size="20" />
          <pm-upload-file :file-list="form.fileList" @change="fileChangeHandler" />
        </el-col>
      </el-form>
    </el-row>
  </pm-drawer>
</template>

<script>
import PmEditor from '@/components/common/pm-editor';
import PmSeparate from '@/components/common/pm-separate';
import PmUploadFile from '@/components/common/pm-upload-file';
import PmDrawer from '@/components/common/pm-drawer.vue';
import EditBugForm from './edit-bug-form.vue';
import { createNamespacedHelpers } from 'vuex';

import {
  getCurDependenceType,
  PROJECT_SELECT_TYPE,
  PRODUCT_SELECT_TYPE
} from '@/constants/layout/index';
const { mapGetters: commonMapGetters } = createNamespacedHelpers(
  'common-config'
);
const defaultTemplate = `<p><strong style="color: rgb(102, 163, 224);">[缺陷描述]：
        </strong></p><p>无</p><p><br></p><p><strong style="color: rgb(102, 163, 224);">[重现步骤]：
        </strong></p><p>无</p><p><br></p><p><strong style="color: rgb(102, 163, 224);">[期望结果]：
        </strong></p><p>无</p><p><br><strong style="color: rgb(102, 163, 224);">[实际结果]：
        </strong></p><p>无</p><p><br></p><p><strong style="color: rgb(102, 163, 224);">[原因定位]：
        </strong></p><p>无</p><p><br></p><p><strong style="color: rgb(102, 163, 224);">[修复建议]：
        </strong></p><p>无</p>`;
export default {
  components: {
    PmEditor,
    PmSeparate,
    PmUploadFile,
    EditBugForm,
    PmDrawer
  },
  props: {
    dependenceId: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    isCopy: {
      type: Boolean,
      default: false
    },
    createFunc: {
      type: Function,
      default: () => {}
    },
    editFunc: {
      type: Function,
      default: () => {}
    },
    bugForm: {
      type: [Object, Boolean],
      default: false
    },
    isProjectModules: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        title: '',
        steps: defaultTemplate,
        fileList: []
      },
      rules: {
        title: { required: true, message: '请填写bug标题' }
      }
    };
  },
  computed: {
    ...commonMapGetters(['projectEnums']),
    isEdit() {
      return !!this.bugForm;
    }
  },
  watch: {
    bugForm: {
      handler(val) {
        this.$nextTick(() => {
          if (val && this.$refs.bugForm && this.$refs.editBugForm) {
            this.$refs.bugForm.setFormField();
            this.$refs.editBugForm.resetFields();
            this.form.title = val.title;
            this.form.steps = val.steps || defaultTemplate;
            this.form.id = val.id;
            this.$refs.bugForm.setFormData({
              ...val,
              priority: val.priority || 3,
              os: val.os && val.os.name,
              browser: val.browser && val.browser.name,
              severity: val.severity && val.severity.name,
              status: val.status && val.status.name,
              type: (val.type && val.type.name) || 'CODE_ERROR'
            });
          }
        });
      },
      immediate: true
    },
    visible(val) {
      this.$nextTick(() => {
         if (!val) {
          if (this.$refs.bugForm && this.$refs.editBugForm) {
            this.$refs.bugForm.setFormField();
            this.$refs.editBugForm.resetFields();
          }
        } else if (!this.bugForm && val) {
          this.resetData();
        }
      });
    }
  },
  methods: {
    handleSubmit(isCreate) {
      const subFormData = this.$refs.bugForm.getFormData();
      if (!subFormData) return;
      this.$refs.editBugForm.validate(valid => {
        if (valid) {
          Reflect.deleteProperty(subFormData, 'title');
          Reflect.deleteProperty(subFormData, 'steps');
          const fileNameList = this.form.fileList
              .filter(item => item.response && item.response.fileName)
              .map(item => {
                return item.response.fileName;
              });
          const form = {
            ...this.form,
            fileList: undefined,
            ...subFormData,
            fileNameList
          };

          if (!this.isEdit || this.isCopy) {
            this.showMessage(
              this.createFunc({ ...form, id: '' }).then(() => {
                this.$emit('onSubmit', isCreate);
              }),
              '提BUG'
            );
          } else {
            this.showMessage(
              this.editFunc(form).then(() => {
                this.$emit('onSubmit');
              }),
              '修改BUG'
            );
          }

          if (isCreate) this.resetData();
        }
      });
    },
    showMessage(req, action) {
      req
        .then(() => {
          this.$message({
            type: 'success',
            message: `${action}成功`
          });
        })
        .catch(err => {
          this.$showErrorMessage(err);
        });
    },
    handleCancel() {
      this.$emit('onCancel');
    },
    fileChangeHandler(file, fileList) {
      this.form.fileList = fileList;
    },
    getDefault() {
      const type = getCurDependenceType();
      const depId = this.dependenceId;
      const result = {
        projectOptions: [],
        productId: '',
        projectId: ''
      };
      if (type === PROJECT_SELECT_TYPE) {
        // 菜单是项目
        result.projectId = depId;
        result.projectOptions = this.projectEnums.filter(
          item => item.value === depId
        );
      } else if (type === PRODUCT_SELECT_TYPE) {
        // 菜单是产品
        result.productId = depId;
      }
      return result;
    },
    // 重置
    resetData() {
      this.form.title = '';
      this.form.steps = defaultTemplate;
      this.$refs.bugForm.resetFormData();
      this.$refs.editBugForm.resetFields();
      const defaultSetting = this.getDefault();
      this.$refs.bugForm.setProjectDefaultOptions(
        defaultSetting.projectOptions
      );
      this.$refs.bugForm.setFormData({
        projectId: defaultSetting.projectId,
        productId: defaultSetting.productId
      });
    }

  }
 
};
</script>

<style lang="less" scoped>
.edit-bug {
  height: 100%;
  .right-module {
    // height: 100%;
    padding: 15px 20px;
    background: #f9fafc;
  }
}
</style>
