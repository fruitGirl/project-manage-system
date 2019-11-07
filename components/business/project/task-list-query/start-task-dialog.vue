/*
 * @Description: 开始任务弹框
 * @Author: xiaojian
 * @Date: 2019-06-24 11:04:54
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 14:57:20
 */
<template>
  <pm-dialog
    :visible.sync="isVisible"
    :title="title"
    :is-loading="submitLoading"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <el-form ref="form" :rules="rules" :model="formData" label-width="100px">
      <el-form-item label="实际开始" prop="date">
        <el-date-picker
          v-model="formData.date"
          type="datetime"
          format="yyyy-MM-dd HH:mm"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>预估开始: {{ gmtEstimateStart }}</el-form-item>
    </el-form>
  </pm-dialog>
</template>

<script>
import pmDialog from '@/components/common/pm-dialog';
import taskListServices from '@/services/project/task-list-query';
import proSetServices from '@/services/project/project-setting';
import { formatDateToString } from '@/utils/date-helper';

export default {
  components: {
    pmDialog
  },
  props: {
    title: {
      type: String,
      default: '开始任务'
    },
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {
        return {};
      }
    },
    isProject: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isVisible: false,
      formData: {
        date: ''
      },
      submitLoading: false,
      gmtEstimateStart: '-',
      rules: {
        date: [{ required: true, message: '请选择开始时间' }]
      }
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
      if (val) {
        this.$set(this.formData, 'date', formatDateToString(new Date()));
      }
      this.$emit('update:visible', val);
    },
    data(val) {
      const { gmtEstimateStart = '-' } = val;
      this.gmtEstimateStart = gmtEstimateStart;
    }
  },
  methods: {
    handleCancel() {},
    handleConfirm() {
      const form = this.$refs.form;
      form.validate(valid => {
        if (valid) {
          this.submitLoading = true;
          this.handleSubmit({ ...this.formData, id: this.data.id }).then(() => {
            this.submitLoading = false;
          });
        } else {
          return false;
        }
      });
    },
    async handleSubmit(params) {
      try {
        if (this.isProject) {
          await proSetServices.startProjectApi(params);
        } else {
          await taskListServices.startTaskApi(params);
        }
        this.$emit('submit-success');
      } catch (error) {
        this.$showErrorMessage(error);
      }
    }
  }
};
</script>
