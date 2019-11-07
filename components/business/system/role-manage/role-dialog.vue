/*
 * @Description: 系统-角色管理-角色弹出框(新增、修改)
 * @Author: yaochen
 * @Date: 2019-06-17 16:50:50
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 14:59:20
 */

<template>
  <div class="role-container">
    <pm-dialog
      :visible.sync="isVisible"
      :title="operation === 'add' ? '新增角色' : '编辑角色'"
      @confirm="handleConfirm"
    >
      <el-form ref="roleForm" :model="form" :rules="rules" label-width="6rem">
        <el-form-item label="角色名称:" prop="name">
          <el-input
            v-model="form.name"
            maxlength="15"
            placeholder="请输入,最多15字"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="operation === 'edit'" label="有效性:">
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
    // 操作，增加或修改
    operation: {
      type: String,
      default: 'add',
      required: true
    },
    // 角色数据
    role: {
      type: Object,
      default: () => {}
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
      form: {
        name: '',
        enabled: true
      },
      rules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
      }
    };
  },
  watch: {
    isVisible(val) {
      if (val && this.$refs.roleForm) {
        this.$refs.roleForm.clearValidate();
      }
    },
    role(val) {
      if (val && this.operation === 'edit') {
        this.form = { ...val };
      }
    },
    operation(val) {
      if (val === 'add') {
        this.form = {
          name: '',
          enabled: true
        };
      } else if (val === 'edit') {
        this.form = { ...this.role };
      }
    }
  },
  methods: {
    handleConfirm() {
      this.$refs.roleForm.validate(valid => {
        if (valid) {
          this.switchOperationHandler();
          this.closeDialog();
        }
      });
    },
    switchOperationHandler() {
      if (this.operation === 'add') {
        // 增加
        this.addFunc({
          name: this.form.name
        })
          .then(() => {
            this.$emit('success');
          })
          .catch(err => {
            this.$showErrorMessage(err);
          });
      } else if (this.operation === 'edit') {
        // 修改
        this.editFunc({
          id: this.form.id,
          name: this.form.name,
          enabled: this.form.enabled
        })
          .then(() => {
            this.$emit('success');
          })
          .catch(err => {
            this.$showErrorMessage(err);
          });
      }
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
