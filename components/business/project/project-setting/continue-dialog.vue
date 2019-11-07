/*
 * @Description: 继续弹出框
 * @Author: yaochen
 * @Date: 2019-07-15 14:49:20
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 14:56:51
 */

<template>
  <pm-dialog :visible.sync="isVisible" :title="title" @confirm="handleConfirm">
    <el-form
      ref="form"
      :rules="rules"
      label-width="100px"
      :model="formData"
      label-suffix=":"
    >
      <el-form-item label="预估截止">
        <span>{{ gmtEstimateEnd }}</span>
      </el-form-item>
      <el-form-item label="继续时间" prop="continueTime">
        <el-date-picker
          v-model="formData.continueTime"
          type="datetime"
          format="yyyy-MM-dd HH:mm"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="继续原因" prop="reason">
        <el-input
          v-model="formData.reason"
          type="textarea"
          :autosize="{ minRows: 4 }"
          :maxlength="300"
          :placeholder="`请输入最多300字`"
        ></el-input>
      </el-form-item>
    </el-form>
  </pm-dialog>
</template>

<script>
import pmDialog from '@/components/common/pm-dialog';
import services from '@/services/project/project-setting';

export default {
  components: {
    pmDialog
  },
  props: {
    title: {
      type: String,
      default: '继续项目'
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
    }
  },
  data() {
    return {
      isVisible: false,
      formData: {
        continueTime: '',
        reason: ''
      },
      gmtEstimateEnd: '-',
      rules: {
        continueTime: [{ required: true, message: '请选择继续时间' }],
        reason: [{ required: true, message: '请填写继续原因' }]
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
    data(val) {
      const { gmtEstimateEnd = '-' } = val;
      this.gmtEstimateEnd = gmtEstimateEnd;
    }
  },
  methods: {
    handleConfirm() {
      const form = this.$refs.form;
      form.validate(valid => {
        if (valid) {
          this.continue();
        }
      });
    },
    async continue() {
      try {
        await services.continueProjectApi({
          id: this.data.id,
          reason: this.formData.reason,
          date: this.formData.continueTime
        });
        this.isVisible = false;
        this.$emit('submit-success');
      } catch (error) {
        this.$showErrorMessage(error);
      }
    }
  }
};
</script>
