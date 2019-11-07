/*
 * @Description: 新建任务&编辑任务抽屉
 * @Author: xiaojian
 * @Date: 2019-06-24 14:30:55
 * @Last Modified by: danding
 * @Last Modified time: 2019-10-31 17:21:07
 */
<template>
  <pm-drawer
    :title="title"
    :visible="isVisible"
    :loading="submitLoading"
    width="850px"
    @onCancel="onCancel"
  >
    <template v-slot:headerRight>
      <el-button type="primary" @click="onSubmit(false)">保存</el-button>
      <el-button
        v-show="showAgainAddBtn"
        type="primary"
        @click="onSubmit(true)"
      >保存并新增下一个</el-button>
    </template>
    <el-form
      ref="form"
      :model="formData"
      label-width="90px"
      :rules="rules"
    >
      <div class="drawer-content-wrap">
        <div class="editor-content-wrap">
          <el-form-item label="任务标题" prop="name">
            <el-input
              v-model="formData.name"
              placeholder="请输入标题，最多50个字"
              maxlength="50"
            />
          </el-form-item>
        </div>
      </div>
    </el-form>
    <task-drawer-form
      ref="taskDrawerForm"
      :project-name="projectName"
      :project-id="projectId"
      :prop-demand-default-option="demandDefaultOption"
      :prop-user-search-default-option="userSearchDefaultOption"
    />
    <el-form label-width="90px">
      <el-form-item label="任务详情">
        <pm-editor v-model="formData.description" class="editor" />
      </el-form-item>
      <el-form-item label=" ">
        <pm-upload-file
          class="upload-file"
          :file-list="fileList"
          @change="handleFileChange"
        />
      </el-form-item>
    </el-form>
  </pm-drawer>
</template>

<script>
import PmDrawer from '@/components/common/pm-drawer.vue';
import PmEditor from '@/components/common/pm-editor';
import PmUploadFile from '@/components/common/pm-upload-file';
import { post } from '@/utils/request';
import tasklistServices from '@/services/project/task-list-query';
import { PRIORITY } from '@/constants/common/config';
import cloneDeep from 'lodash.clonedeep';
import TaskDrawerForm from './task-drawer-form.vue';

export default {
  components: {
    PmDrawer,
    PmEditor,
    TaskDrawerForm,
    PmUploadFile
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'add' // add  edit   copy
    },
    projectId: {
      type: String,
      default: ''
    },
    projectName: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isVisible: false,
      priorityList: PRIORITY, // 优先级
      submitLoading: false,
      userSearchDefaultOption: [],
      demandDefaultOption: [],
      fileList: [],
      formData: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '请输入标题' }]
      }
    };
  },
  computed: {
    showAgainAddBtn() {
      return !this.id;
    }
  },
  watch: {
    visible: {
      handler(val) {
        this.isVisible = val;

        // 关闭抽屉，并且抽屉内的表单对象存在
        if (!val && this.$refs.taskDrawerForm && this.$refs.form) {
          this.resetDrawerForm();
        }
      },
      immediate: true
    },
    isVisible(val) {
      if (val) {
        this.id && this.getInitData(this.id);
        this.$nextTick(() => {
          this.$refs.taskDrawerForm.setProjectId(this.projectId);
        });
        this.formData = { ...this.formData, projectId: this.projectId };
        if (!this.id) this.fileList = [];
      }
      this.$emit('update:visible', val);
    }
  },
  methods: {
    getInitData(id) {
      let url = '/project/taskModifyInitPage';
      if (this.type === 'copy') {
        url = '/project/taskCopyInitPage';
      }
      post(url, {
        taskId: id
      })
        .then(data => {
          const {
            task,
            nickName,
            attachmentList = [],
            demand,
            taskAppLinkList = []
          } = data;
          if (demand) {
            this.demandDefaultOption = [
              {
                label: demand.title,
                value: demand.id
              }
            ];
          }
          const formatedForm = this.formatData(task, nickName);
          this.$refs.taskDrawerForm.setFormData({
            ...formatedForm,
            linkedAppCode: taskAppLinkList.map(item => {
              const { appCode, workContent } = item;
              return {
                workContent,
                appCode
              };
            })
          });
          this.formData = {
            name: formatedForm.name,
            description: formatedForm.description
          };
          this.fileList = attachmentList;
        })
        .catch(err => {
          this.isVisible = false;
          this.$showErrorMessage(err);
        });
    },
    formatData(data, nickName) {
      const { type, gmtEstimateStart, gmtEstimateEnd } = data;
      const newType = type.name;
      let dateRange = [];
      if (gmtEstimateStart) {
        dateRange = [gmtEstimateStart, gmtEstimateEnd];
      }
      this.deleteKey(data, [
        'status',
        'actualHours',
        'pausePerson',
        'modifier',
        'gmtCreate',
        'gmtAssigned',
        'gmtModified',
        'gmtActualStart',
        'enabled',
        'creator'
      ]);
      this.userSearchDefaultOption = [
        {
          label: nickName,
          value: data.assignedPerson
        }
      ];
      return {
        ...data,
        dateRange,
        type: newType
      };
    },
    deleteKey(object, keys) {
      keys.forEach(item => {
        delete object[item];
      });
    },
    onCancel() {
      this.isVisible = false;
    },

    // 重置抽屉表单值
    resetDrawerForm() {
      this.fileList = [];
      this.$refs.form.resetFields();
      this.$refs.taskDrawerForm.resetFormData();
      this.$refs.taskDrawerForm.setProjectId(this.projectId);
      this.formData = {
        name: '',
        description: '',
      };
    },

    /**
     * 保存抽屉信息
     *
     * @params { Boolen } isAgainAdd 是否需要新增下一个
     */
    onSubmit(isAgainAdd = false) {
      const subFormData = this.$refs.taskDrawerForm.getFormData();
      this.$refs.form.validate(valid => {
        if (valid && subFormData) {
          const form = {
            ...subFormData,
            name: this.formData.name,
            description: this.formData.description
          };
          this.submitLoading = true;
          this.handleSubmit({
            ...form,
          })
            .then(() => {
              this.submitLoading = false;
              this.isVisible = isAgainAdd;
              isAgainAdd && this.resetDrawerForm();
            });
        }
      });
    },
    formatDateRange(data) {
      if (!data.dateRange) return;
      data.gmtEstimateStart = data.dateRange[0];
      data.gmtEstimateEnd = data.dateRange[1];
      delete data.dateRange;
      return data;
    },
    formatFileListToSubmit() {
      return this.fileList
        .map(item => {
          if (item.response) {
            return item.response.fileName;
          }
        });
    },
    async handleSubmit(params) {
      try {
        const paramsCopy = this.formatDateRange(cloneDeep(params));
        let fn;
        switch (this.type) {
          case 'add':
            fn = tasklistServices.taskCreateApi;
            break;
          case 'edit':
            fn = tasklistServices.taskModifyApi;
            break;
          case 'copy':
            fn = tasklistServices.taskCreateApi;
            break;
          default:
            break;
        }
        await fn({
          ...paramsCopy,
          fileNameList: this.formatFileListToSubmit()
        });
        this.$showSuccessMessage('操作成功');
        this.$emit('submit-success');
      } catch (error) {
        this.$showErrorMessage(error);
      }
    },
    handleFileChange(file, fileList) {
      this.fileList = fileList;
    },
  }
};
</script>

<style lang="less" scoped>
.drawer-content-wrap {
  display: flex;
  justify-content: space-around;
}

.upload-file {
  margin-top: 10px;
}

.editor-content-wrap {
  width: 100%;
}
</style>
