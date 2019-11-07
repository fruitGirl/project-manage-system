/*
 * @Description: 项目-测试计划-新增计划
 * @Author: yaochen
 * @Date: 2019-06-25 11:45:11
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 18:12:37
 */
<template>
  <div class="page-transparent-container">
    <el-form ref="form" :model="formData" label-width="6rem">
      <div class="create-test-plan-container">
        <div class="editor-content-wrap page-content-container">
          <el-form-item label=" " label-width="0" prop="name">
            <el-input
              v-model="formData.name"
              placeholder="请输入标题，最多50个字"
              maxlength="50"
            ></el-input>
          </el-form-item>
          <pm-editor v-model="formData.content" class="editor" />
          <pm-upload-file
            class="upload-file"
            :file-list="fileList"
            @change="uploadChangeHandle"
          />
        </div>
        <div class="form-wrap page-content-container">
          <el-form-item label="所属项目：" prop="projectId">
            <pm-remote-search
              v-model="formData.projectId"
              field-text="projectList"
              :parse-structure="formatProjectSearch"
              :default-option="
                testPlanId
                  ? [
                      {
                        value: testPlanData.projectId,
                        label: testPlanData.projectName
                      }
                    ]
                  : defaultProject
              "
              action="/project/projectQueryByName"
            ></pm-remote-search>
          </el-form-item>
          <el-form-item label="优先级：" prop="priority">
            <el-select v-model="formData.priority">
              <el-option
                v-for="item in priorityList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <pm-button-group :buttons="buttons" />
  </div>
</template>
<script>
import PmEditor from '@/components/common/pm-editor';
import pmRemoteSearch from '@/components/common/pm-remote-search';
import PmUploadFile from '@/components/common/pm-upload-file';
import { PRIORITY } from '@/constants/common/config';
import PmButtonGroup from '@/components/common/pm-button-group';
import { createNamespacedHelpers } from 'vuex';
const { mapActions, mapState } = createNamespacedHelpers(
  'project/create-test-plan'
);

const { mapGetters: commonMapGetters } = createNamespacedHelpers(
  'common-config'
);
export default {
  head() {
    return {
      title: '项目_新增测试计划'
    };
  },
  components: {
    PmEditor,
    pmRemoteSearch,
    PmButtonGroup,
    PmUploadFile
  },
  data() {
    return {
      // buttons: [
      //   { label: '取消', textColor: 'primary', func: this.cancelHandle },
      //   { label: '存草稿', textColor: 'primary', func: this.saveDraftHandle },
      //   { label: '发布', textColor: 'primary', func: this.publishHandle }
      // ],
      priorityList: PRIORITY,
      formData: {
        name: '',
        content: '',
        projectId: '',
        priority: 3
      },
      fileList: [],
      gotoUrl: '/project/test-plan-list',
      testPlanId: this.$route.query.testPlanId
    };
  },

  computed: {
    ...mapState(['testPlanData']),
    ...commonMapGetters(['projectEnums']),
    buttons() {
      const arr = [
        { label: '取消', textColor: 'primary', func: this.cancelHandle },
        { label: '存草稿', textColor: 'primary', func: this.saveDraftHandle },
        { label: '发布', textColor: 'primary', func: this.publishHandle }
      ];
      if (
        this.testPlanData.status &&
        this.testPlanData.status.name === 'PUBLISH'
      ) {
        arr.splice(1, 1);
      }
      return arr;
    },
    defaultProject() {
      return this.projectEnums.filter(
        item => item.value === this.$route.query.dependenceId
      );
    }
  },
  watch: {
    testPlanData(val) {
      const { name, priority, content, projectId } = val;
      this.formData = {
        name,
        priority,
        content,
        projectId
      };
    }
  },
  mounted() {
    if (this.testPlanId) {
      this.testPlanModifyInitPage({ testPlanId: this.testPlanId });
    } else {
      this.formData.projectId = this.$route.query.dependenceId;
    }
  },
  methods: {
    ...mapActions([
      'testPlanCreate',
      'testPlanModifyInitPage',
      'testPlanModify'
    ]),
    formatFileNameList(fileList) {
      return fileList.map(item => {
        if (item.response) {
          return item.response.fileName;
        }
      });
    },
    uploadChangeHandle(file, fileList) {
      this.fileList = fileList;
    },
    cancelHandle() {
      this.$PMRouter.push(this.gotoUrl);
    },
    saveDraftHandle() {
      let fn = this.testPlanCreate;
      const params = {
        ...this.formData,
        status: 'DRAFT',
        fileNameList: this.formatFileNameList(this.fileList)
      };
      if (this.testPlanId) {
        fn = this.testPlanModify;
        params.id = this.testPlanId;
      }
      return fn(params)
        .then(() => {
          this.$showSuccessMessage('保存成功');
        })
        .catch(err => {
          this.$showErrorMessage(err);
        });
    },
    publishHandle() {
      let fn = this.testPlanCreate;
      const params = {
        ...this.formData,
        status: 'PUBLISH',
        fileNameList: this.formatFileNameList(this.fileList)
      };
      if (this.testPlanId) {
        fn = this.testPlanModify;
        params.id = this.testPlanId;
      }
      return fn(params)
        .then(() => {
          this.$showSuccessMessage('发布成功');
          this.$PMRouter.push(this.gotoUrl);
        })
        .catch(err => {
          this.$showErrorMessage(err);
        });
    },
    formatProjectSearch(data, fieldText) {
      return data[fieldText].map(item => {
        return {
          label: item.name,
          value: item.id
        };
      });
    }
  }
};
</script>
<style lang="less" scoped>
@deep: ~'>>>';

.create-test-plan-container {
  display: flex;
  justify-content: space-around;
  .editor {
    margin-top: 15px;
  }
  .editor-content-wrap {
    flex: 1;
    margin: 0;
    min-width: 650px;
  }
  .upload-file {
    margin-top: 10px;
  }
  .form-wrap {
    width: 400px;
    margin: 0;
    margin-left: 15px;
    @{deep} .el-select {
      width: 100%;
    }
  }
}
</style>
