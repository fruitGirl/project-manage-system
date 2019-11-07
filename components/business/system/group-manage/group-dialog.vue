/*
 * @Description: 系统-组管理-组弹出框(新增、修改)
 * @Author: yaochen
 * @Date: 2019-06-17 16:50:50
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 14:59:16
 */

<template>
  <div class="role-container">
    <pm-dialog
      :visible.sync="isVisible"
      :title="!isEdit ? '新增组' : '编辑组'"
      @confirm="handleConfirm"
    >
      <el-form ref="groupForm" :model="form" :rules="rules" label-width="6rem">
        <el-form-item label="组名称:" prop="name">
          <el-input
            v-model="form.name"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="请输入,最多50字"
          />
        </el-form-item>
        <el-form-item label="组编码:" prop="code">
          <el-input v-model="form.code" placeholder="请输入组编码"></el-input>
        </el-form-item>
        <el-form-item v-if="isEdit" label="有效性:">
          <el-radio-group v-model="form.enabled">
            <el-radio :label="true">有效</el-radio>
            <el-radio :label="false">无效</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </pm-dialog>
  </div>
</template>

<script>
import PmDialog from '@/components/common/pm-dialog';
import dialogMixin from '@/mixins/dialog-mixin';

export default {
  components: {
    PmDialog
  },
  mixins: [dialogMixin],
  props: {
    // 组数据
    data: {
      type: [Boolean, Object],
      default: Boolean
    },
    // 增加调用的函数
    addFunc: {
      type: Function,
      default: () => {}
    },
    // 修改调用的函数
    editFunc: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      isEdit: false,
      form: {
        name: '',
        code: '',
        enabled: true
      },
      rules: {
        name: [{ required: true, message: '请输入组名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入组编码', trigger: 'blur' }]
      }
    };
  },
  watch: {
    isVisible(val) {
      if (val && this.$refs.groupForm) {
        this.$refs.groupForm.clearValidate();
      }
      if (val && this.data) {
        this.form = { ...this.data };
      }
      if (!val) {
        this.resetForm();
      }
    },
    data(val) {
      this.isEdit = !!val;
    }
  },
  methods: {
    handleConfirm() {
      this.$refs.groupForm.validate(valid => {
        if (valid) {
          if (!this.isEdit) {
            // 增加
            this.addFunc({
              name: this.form.name,
              code: this.form.code
            })
              .then(() => {
                this.$emit('success');
              })
              .catch(err => {
                this.$showErrorMessage(err);
              });
          } else {
            // 修改
            this.editFunc(this.form)
              .then(() => {
                this.$emit('success');
              })
              .catch(err => {
                this.$showErrorMessage(err);
              });
          }
          this.closeDialog();
        }
      });
    },
    resetForm() {
      this.form = {
        name: '',
        code: '',
        enabled: true
      };
    }
  }
};
</script>

<style lang="less" scoped>
.role-container .pm-dialog .el-form {
  width: 300px;
  margin: auto;
}
</style>
