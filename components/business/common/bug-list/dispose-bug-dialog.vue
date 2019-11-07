/*
 * @Description: bug列表-处理BUG弹框
 * @Author: yaochen
 * @Date: 2019-07-10 11:06:42
 * @Last Modified by: moran
 * @Last Modified time: 2019-10-30 10:06:50
 */
<template>
  <div>
    <pm-dialog
      width="1000px"
      :visible.sync="isVisible"
      title="处理BUG"
      @confirm="handleConfirm"
    >
      <el-form
        ref="disposeForm"
        label-width="6rem"
        :rules="rules"
        :model="form"
      >
        <el-form-item label="处理方案:" prop="disposeScheme">
          <pm-remote-select
            v-model="form.disposeScheme"
            :need-all-opt="false"
            :is-transparent-border="false"
            :action="BUG_RESOLUTION_URL"
          />
        </el-form-item>
        <el-form-item label="解决版本:" prop="disposeVersion">
          <pm-remote-search
            v-model="form.disposeVersion"
            :default-option="localProjectVersion"
          />
        </el-form-item>
        <el-form-item label="详细描述:" prop="content">
          <pm-editor v-model="form.content" />
        </el-form-item>
        <el-form-item label="附件:" prop="fileList">
          <pm-upload-file :file-list="form.fileList" @change="fileChangeHandler" />
        </el-form-item>
      </el-form>
    </pm-dialog>
  </div>
</template>

<script>
import PmEditor from '@/components/common/pm-editor';
import PmDialog from '@/components/common/pm-dialog.vue';
import dialogMixin from '@/mixins/dialog-mixin';
import PmRemoteSelect from '@/components/common/pm-remote-select';
import PmRemoteSearch from '@/components/common/pm-remote-search';
import PmUploadFile from '@/components/common/pm-upload-file';
import { BUG_RESOLUTION_URL } from '@/services/common-config';
import { createNamespacedHelpers } from 'vuex';
import { BUG_RESOLVED_STATUS } from '@/constants/common/bug-list';

const {
  mapActions: commonMapActions,
  mapState: commonMapState
} = createNamespacedHelpers('common-config');
export default {
  components: {
    PmDialog,
    PmEditor,
    PmUploadFile,
    PmRemoteSearch,
    PmRemoteSelect
  },
  mixins: [dialogMixin],
  props: {
    bugId: {
      type: String,
      default: '',
      required: true
    },
    submitHandler: {
      type: Function,
      default: () => {},
      required: true
    },
    dependenceId: {
      type: [Number, String],
      default: ''
    }
  },
  data() {
    return {
      BUG_RESOLUTION_URL,
      form: {
        content: '',
        fileList: [],
        disposeScheme: BUG_RESOLVED_STATUS,
        disposeVersion: undefined
      },
      rules: {
        disposeScheme: { required: true, message: '请选择处理方案' }
      }
    };
  },
  computed: {
    ...commonMapState(['projectVersion']),
    localProjectVersion() {
      return this.projectVersion.map(item => {
        return {
          value: item.id,
          label: item.name
        };
      });
    }
  },
  watch: {
    isVisible(val) {
      if (val) {
        if (this.dependenceId || this.$route.query.dependenceId) {
          this.getProjectVersion({
            projectId: this.dependenceId || this.$route.query.dependenceId
          });
        }
      } else { // 关闭弹窗，重置表单
        this.$refs.disposeForm.resetFields();
      }
    }
  },
  created() {},
  methods: {
    ...commonMapActions(['getProjectVersion']),
    handleConfirm() {
      this.$refs.disposeForm.validate(valid => {
        if (valid) {
          const needFileListName = this.form.fileList
              .map(item => item.response.fileName)
              .join();
          this.submitHandler({
            id: this.bugId,
            resolution: this.form.disposeScheme,
            resolvedVersionId: this.form.disposeVersion,
            solveDescription: this.form.content,
            fileNameList: needFileListName || undefined
          })
            .then(() => {
              this.$message({
                type: 'success',
                message: `处理成功`
              });
              this.closeDialog();
            })
            .catch(err => {
              this.$showErrorMessage(err);
            });
        }
      });
    },
    fileChangeHandler(file, fileList) {
      this.form.fileList = fileList;
    }
  }
};
</script>

<style lang="less" scoped>
.role-container .pm-dialog .el-form {
  width: 300px;
  margin: auto;
  .employee_name {
    border-bottom: 1px solid #eaeaea;
  }
}
</style>
