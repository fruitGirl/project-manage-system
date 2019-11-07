/*
 * @Description: 项目-项目设置-延期弹框
 * @Author: yaochen
 * @Date: 2019-06-25 15:33:35
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 14:57:05
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
      <el-form-item label="延期至" prop="delayTime">
        <el-date-picker
          v-model="formData.delayTime"
          type="datetime"
          format="yyyy-MM-dd HH:mm"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="延期原因" prop="reason">
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
      default: '延期项目'
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
        delayTime: '',
        reason: ''
      },
      gmtEstimateEnd: '-',
      rules: {
        delayTime: [{ required: true, message: '请选择延期时间' }],
        reason: [{ required: true, message: '请填写延期原因' }]
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
          this.delay();
        }
      });
    },
    async delay() {
      try {
        await services.delayProjectApi({
          id: this.data.id,
          reason: this.formData.reason,
          date: this.formData.delayTime
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
