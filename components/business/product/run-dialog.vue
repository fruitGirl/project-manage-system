/*
 * @Description: 产品-设置-重新运营弹框&&停止运营弹框
 * @Author: xiaojian
 * @Date: 2019-06-17 17:37:44
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 14:56:41
 */
<template>
  <div>
    <pm-dialog
      :visible.sync="isVisible"
      :title="title"
      :is-loading="loading"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <el-form ref="form" label-width="80px" :model="formData" :rules="rules">
        <el-form-item label="产品名称">{{ productName }}</el-form-item>
        <el-form-item :label="reasonLabel" prop="reason">
          <el-input
            v-model="formData.reason"
            type="textarea"
            maxlength="300"
            placeholder="请输入最多300字"
          ></el-input>
        </el-form-item>
      </el-form>
    </pm-dialog>
  </div>
</template>

<script>
import PmDialog from '@/components/common/pm-dialog';
import { RERUN_RULES, STOP_RULES } from '@/constants/product/run-product';
import services from '@/services/product/run-product';

export default {
  components: {
    PmDialog
  },
  props: {
    show: {
      type: Boolean,
      default: false,
      require: true
    },
    type: {
      type: String,
      default: 'isStop',
      require: true
    },
    productName: {
      type: String,
      default: '',
      require: true
    },
    productId: {
      type: String,
      default: '',
      require: true
    }
  },
  data() {
    return {
      isVisible: false,
      formData: {
        reason: ''
      },
      loading: false
    };
  },
  computed: {
    title() {
      return this.type === 'isStop' ? '停止运营' : '重新运营';
    },
    reasonLabel() {
      return this.type === 'isStop' ? '停止原因' : '重启原因';
    },
    rules() {
      return this.type === 'isStop' ? STOP_RULES : RERUN_RULES;
    }
  },
  watch: {
    show(val) {
      this.isVisible = val;
    },
    isVisible(val) {
      this.$emit('update:show', val);
    }
  },
  methods: {
    handleConfirm() {
      this.$refs.form.validate(vaild => {
        if (!vaild) {
          return false;
        } else {
          this.handleSubmit({ ...this.formData, id: this.productId });
        }
      });
    },
    handleSubmit(values) {
      this.loading = true;
      if (this.type === 'isStop') {
        services.productStopApi(values)
          .then(() => {
            this.loading = false;
            this.$emit('update:show', false);
            this.$emit('success-callback');
            this.$message({
              type: 'success',
              message: `停止成功`
            });
          })
          .catch(err => {
            this.loading = false;
            this.$showErrorMessage(err);
          });
      } else {
        services.productRunApi(values)
          .then(() => {
            this.loading = false;
            this.$emit('update:show', false);
            this.$emit('success-callback');
            this.$message({
              type: 'success',
              message: `运营成功`
            });
          })
          .catch(err => {
            this.loading = false;
            this.$showErrorMessage(err);
          });
      }
    },
    handleCancel() {
      this.$refs.form.resetFields();
    }
  }
};
</script>
