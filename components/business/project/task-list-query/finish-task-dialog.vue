/*
 * @Description: 完成任务弹框
 * @Author: xiaojian
 * @Date: 2019-06-24 11:04:54
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-05 14:14:50
 */
<template>
  <pm-dialog
    :visible.sync="isVisible"
    :title="title"
    :is-loading="submitLoading"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <el-form ref="form" :rules="rules" :model="formData" label-width="120px">
      <el-form-item label="预估起止">{{ gmtEstimate }}</el-form-item>
      <el-form-item label="实际起止时间" prop="actualDate">
        <el-date-picker
          v-model="formData.actualDate"
          style="width: 320px"
          type="datetimerange"
          range-separator="-"
          format="yyyy-MM-dd HH:mm"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
      </el-form-item>
     
      <template v-if="!isProject">
        <el-form-item label="实际工时" prop="hours">
          <el-input-number
            v-model="formData.hours"
            :min="0"
            :precision="2"
          ></el-input-number>
        </el-form-item>
        <el-form-item>预估工时: {{ data.estimateHours }}</el-form-item>
      </template>
    </el-form>
  </pm-dialog>
</template>

<script>
import pmDialog from '@/components/common/pm-dialog';
import taskListServices from '@/services/project/task-list-query';
import proSetServices from '@/services/project/project-setting';
import dateFormat from 'dateformat';

export default {
  components: {
    pmDialog
  },
  props: {
    title: {
      type: String,
      default: '完成任务'
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
        actualDate: [],
        hours: 0
      },
      gmtEstimate: '-',
      submitLoading: false,
      rules: {
        actualDate: [{ required: true, message: '请选择实际起止时间' }]
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
      this.$emit('update:visible', val);
    },
    data: {
      handler(val) {
        const { gmtEstimateEnd, estimateHours = 0, gmtEstimateStart } = val;
        const isGmtEstimate =  (gmtEstimateStart && gmtEstimateEnd);
        const today = dateFormat(Date.now(), 'yyyy-MM-dd HH:mm:ss');;
        this.gmtEstimate = isGmtEstimate ? `${gmtEstimateStart} 至 ${gmtEstimateEnd}` : '-';
        this.formData.actualDate = isGmtEstimate ? [gmtEstimateStart, gmtEstimateEnd] : [today, today];
        this.formData.hours = estimateHours;
      },
      immediate: true,
      deep: true
      
    }
  },
  methods: {
    handleCancel() {},
    handleConfirm() {
      const form = this.$refs.form;

      form.validate(valid => {
        if (valid) {
          this.submitLoading = true;
          this.formData.startDate = this.formData.actualDate[0];
          this.formData.finishDate = this.formData.actualDate[1];
          const needData = { ...this.formData, id: this.data.id };
          delete needData.actualDate;
          this.handleSubmit(needData).then(() => {
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
          await proSetServices.finishProjectApi(params);
        } else {
          await taskListServices.finishTaskApi(params);
        }
        this.$emit('submit-success');
      } catch (err) {
        this.$showErrorMessage(err);
      }
    }
  }
};
</script>
