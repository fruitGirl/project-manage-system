/*
 * @Description: 项目-测试单-完成测试模态框
 * @Author: moran
 * @Date: 2019-06-20 11:57:25
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 14:57:30
 */
<template>
  <div class="project-finish-dialog">
    <pm-dialog
      :title="title"
      :visible.sync="isVisible"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <el-form
        ref="form"
        size="small"
        label-width="80px"
        :model="formData"
        :rules="rules"
      >
        <el-form-item :label="timeLabel" prop="date">
          <el-date-picker
            v-model="formData.date"
            type="datetime"
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="label">{{ gmtEstimateEnd }}</el-form-item>
      </el-form>
      <div v-if="type === 1" class="tip">
        提示：完成后，测试单不可再继续进行测试
      </div>
    </pm-dialog>
  </div>
</template>

<script>
import PmDialog from '@/components/common/pm-dialog.vue';
import { START_RULES, FINISH_RULES } from '@/constants/project/finish-dialog';

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
      // 弹框类型 1-> 完成 其他->开始
      type: Number,
      default: 1
    },
    gmtEstimateEnd: {
      // 回显开始/完成时间
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formData: {
        date: ''
      },
      isVisible: false
    };
  },
  computed: {
    label() {
      return this.type === 1 ? '预估截止' : '预估开始';
    },
    title() {
      return this.type === 1 ? '完成测试' : '开始测试';
    },
    timeLabel() {
      return this.type === 1 ? '实际完成' : '实际开始';
    },
    rules() {
      return this.type === 1 ? FINISH_RULES : START_RULES;
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
          this.$emit('confirm', this.formData.date);
        }
      });
    },
    handleCancel() {
      this.$refs.form.resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.project-finish-dialog {
  .tip {
    font-size: 12;
    color: #999;
  }
}
</style>
