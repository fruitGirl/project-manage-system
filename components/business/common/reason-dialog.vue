/*
 * @Description: 进行某操作时需要输入一个原因的弹框
 * @Author: xiaojian
 * @Date: 2019-06-17 17:37:44
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 14:55:47
 */
<template>
  <pm-dialog
    :visible.sync="isVisible"
    :title="title"
    :is-loading="confirmLoading"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <el-form
      ref="form"
      label-width="100px"
      :model="formData"
      :rules="rules"
      label-suffix=":"
    >
      <el-form-item :label="reasonLabel" prop="reason">
        <el-input
          v-model="formData.reason"
          type="textarea"
          :autosize="{ minRows: 4 }"
          :maxlength="textMaxLength"
          :placeholder="`请输入最多${textMaxLength}字`"
        ></el-input>
      </el-form-item>
    </el-form>
  </pm-dialog>
</template>

<script>
import PmDialog from '@/components/common/pm-dialog';

export default {
  components: {
    PmDialog
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
      require: true
    },
    title: {
      type: String,
      default: '',
      require: true
    },
    reasonLabel: {
      type: String,
      default: '',
      require: true
    },
    rules: {
      type: Object,
      default: () => {
        return {
          reason: [{ required: true, message: '请输入原因' }]
        };
      }
    },
    textMaxLength: {
      type: [String, Number],
      default: 300
    },
    submit: {
      type: Function,
      default: data => {}
    }
  },
  data() {
    return {
      isVisible: false,
      formData: {
        reason: ''
      },
      confirmLoading: false
    };
  },
  watch: {
    visible: {
      handler(val) {
        this.isVisible = val;
      },
      immediate: true
    },
    isVisible(val) {
      this.$emit('update:visible', val);
    }
  },
  methods: {
    handleConfirm() {
      this.$refs.form.validate(vaild => {
        if (!vaild) {
          return false;
        } else {
          const res = this.submit(this.formData);
          if (res && res.then) {
            this.confirmLoading = true;
            res
              .then(() => {
                this.$emit('submit-success');
                this.confirmLoading = false;
              })
              .catch(() => {
                this.confirmLoading = false;
              });
          }
        }
      });
    },
    handleCancel() {
      this.$refs.form.resetFields();
    }
  }
};
</script>
