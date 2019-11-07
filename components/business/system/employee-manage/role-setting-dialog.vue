/*
 * @Description: 系统-员工设置-组设置(弹出框)
 * @Author: yaochen
 * @Date: 2019-06-17 11:58:58
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 14:59:10
 */
<template>
  <div class="role-container">
    <pm-dialog
      :visible.sync="isVisible"
      title="组设置"
      @confirm="handleConfirm"
      @cancle="handleCancle"
    >
      <el-form width="300px" label-width="6rem">
        <el-form-item label="花名:">
          <div class="employee_name">{{employee ? employee.name: ''}}</div>
        </el-form-item>
        <el-form-item label="关联组:">
          <el-select v-model="selectedRoles" multiple placeholder="请选择">
            <el-option
              v-for="item in roles"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
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
    employee: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data() {
    return {
      roles: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      selectedRoles: []
    };
  },
  watch: {},
  methods: {
    handleConfirm() {
      this.isVisible = false;
      this.closeDialog();
    },
    handleCancle() {}
  }
};
</script>

<style lang="less" scoped>
.role-container .pm-dialog .el-form {
  width: 300px;
  margin: auto;
  .employee_name {
    border-bottom: 1px solid #eaeaea;
  }
}
</style>
