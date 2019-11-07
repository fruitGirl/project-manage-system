/*
 * @Description: 单个应用项
 * @Author: xiaojian
 * @Date: 2019-07-05 16:31:23
 * @Last Modified by: moran
 * @Last Modified time: 2019-08-28 14:14:27
 */
<template>
  <div class="app-config pm-flex">
    <slot name="pre-checkbox"></slot>
    <div :class="`pm-flex-1 config-box ${isSaved ? 'gray-bac' : ''}`">
      <el-form
        ref="form"
        size="small"
        :model="formData"
        label-width="80px"
        class="form"
        :rules="rules"
      >
        <el-form-item label="CODE:" prop="appCode">
          <el-select v-model.trim="formData.appCode" allow-create filterable :disabled="isSaved && isEdit" style="width: 260px">
            <el-option
              v-for="(item, index) in appCodeList"
              :key="index"
              :value="item"
              >{{ item }}</el-option
            >
          </el-select>
          <slot name="extra-operate"></slot>
          <div style="float: right; font-size: 14px;">
            <div v-if="isSaved && isEdit" class="edit el-icon-edit"  @click="handleEdit"></div>
            <div v-if="!isEdit" class="edit">
              <span class="el-icon-close" @click="handleCancel"></span>
              <span class="check el-icon-check" @click="handleSubmit"></span>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="SVN:" prop="branchUrl">
          <el-input
            v-model="formData.branchUrl"
            :style="{ width: '700px' }"
            :disabled="isSaved && isEdit"
            placeholder="选择好CODE后,SVN会自动生成"
          ></el-input>
        </el-form-item>

        <el-form-item label="工作内容">
          <el-input
            v-model="formData.workContent"
            :disabled="isSaved && isEdit"
            type="textarea"
            :rows="4"
            style="width: 700px"
            maxlength="1000"
            placeholder="请输入工作内容，最多1000字"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item v-if="!isSaved">
          <div  class="btn-group">
            <el-button
              type="primary"
              :loading="submitLoading"
              @click="handleSubmit"
              >确定</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div style="width:30px; margin-left: 20px">
      <span v-if="isSaved" class="delete-box el-icon-circle-close" @click="handleDelete"></span>
    </div>
  </div>
</template>

<script>
import { formatDateToString } from '@/utils/date-helper';

export default {
  props: {
    appCodeList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    backData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    projectData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    itemModify: {
      type: Function,
      default: data => {}
    },
    itemCreate: {
      type: Function,
      default: data => {}
    },
    itemDelete: {
      type: Function,
      default: data => {}
    }
  },
  data() {
    return {
      isSaved: false,
      isEdit: true,
      formData: {
        appCode: '',
        branchUrl: '',
        workContent: ''
      },
      rules: {
        appCode: [{ required: true, message: '请选择code' }],
        branchUrl: [{ required: true, message: '请输入svn地址' }]
      },
      submitLoading: false
    };
  },
  computed: {
    appCode() {
      return this.formData.appCode;
    }
  },
  watch: {
    backData: {
      handler(val) {
        this.formData = { ...val };
        if (val.appCode) {
          this.isSaved = true;
          this.isEdit = true;
        }
      },
      immediate: true
    },
    appCode(val) {
      this.formData = { ...this.formData, branchUrl: val ? this.formatBranchUrl() : '' };
    }
  },
  methods: {
    formatBranchUrl() {
      const { gmtCreate, id, type = {} } = this.projectData;
      return `https://huored.gicp.net:8088/svn/${
        this.appCode
      }/branches/${formatDateToString(
        new Date(gmtCreate),
        'yyyyMMdd'
      )}_${type.name.toLowerCase()}_${id}`;
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.submitLoading = true;
          if (this.backData.appCode) {
            // 有回填数据的情况下 确定按钮要调编辑接口
            this.itemModify(this.formData)
              .then(() => {
                this.submitLoading = false;
                this.isSaved = true;
                this.isEdit = true;
              })
              .catch(() => {
                this.submitLoading = false;
              });
          } else {
            // 没有回填数据的情况下 确定按钮要调创建接口
            this.itemCreate(this.formData)
              .then(() => {
                this.submitLoading = false;
                this.formData = { appCode: '', branchUrl: '', workContent: '' };
                this.$refs.form.resetFields();
                this.isSaved = false;
                this.isEdit = true;
              })
              .catch(() => {
                this.submitLoading = false;
              });
          }
        }
      });
    },
    handleEdit() {
      this.isSaved = true;
      this.isEdit = false;
    },
    handleDelete() {
      this.$confirm('确定删除关联的应用?', '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.itemDelete(this.formData);
      });
    },
    handleCancel() {
      if (this.backData.appCode) {
        // 回填状态下的返回 需要回到原来状态
        this.isSaved = true;
        this.isEdit = true;
        this.formData = { ...this.backData };
      } else {
        this.isEdit = true;
        this.itemDelete(this.formData);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.form {
  width: 780px;
  margin-top: 10px;
}
.textarea {
  margin-bottom: 10px;
}
.btn-group {
  margin-bottom: 10px;
  text-align: right;
}
.delete-box {
  display: flex;
  height: 100%;
  align-items: center;
  font-size: 17px;
  color: #BFBFBF
}
.edit {
  float: right;
  margin-top: 15px;
  color: #BFBFBF
}
.config-box {
  padding: 15px;
  margin-top: 5px;
  margin-bottom: 10px;
}
.gray-bac {
  background-color: #F6F6F6;
}
.check {
  color: #1687D9;
  margin-left: 10px;
}
</style>
