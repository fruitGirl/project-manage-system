/*
 * @Description: 系统-员工设置-批量组设置(弹出框)
 * @Author: yaochen
 * @Date: 2019-06-17 11:58:58
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 14:59:05
 */
<template>
  <div>
    <pm-dialog
      :visible.sync="isVisible"
      width="550px"
      :title="`批量${text[0]}-设置权限`"
      @confirm="handleConfirm"
    >
      <el-form
        ref="batchForm"
        :model="form"
        :rules="rules"
        inline
        label-width="6rem"
      >
        <el-form-item :label="`选择${text[0]}`" prop="selectValue">
          <pm-remote-search
            v-model="form.selectValue"
            placeholder="请选择"
            :default-option="localSelectOptions"
          />
        </el-form-item>
        <el-form-item :label="`选择${text[1]}`">
          <el-transfer
            v-model="selectItems"
            class="system-transfer"
            filterable
            :props="{
              key: 'value',
              label: 'label'
            }"
            :titles="[`全部${text[1]}`, '已选']"
            :filter-placeholder="
              `请输入${text[1] === '人员' ? '花' : text[1]}名搜索`
            "
            :data="localTransAllList"
          ></el-transfer>
        </el-form-item>
      </el-form>
    </pm-dialog>
  </div>
</template>

<script>
import PmDialog from '@/components/common/pm-dialog';
import dialogMixin from '@/mixins/dialog-mixin';
import PmRemoteSearch from '@/components/common/pm-remote-search';

export default {
  components: {
    PmDialog,
    PmRemoteSearch
  },
  mixins: [dialogMixin],
  props: {
    // text数据，批量框上面的文案与下面的文案，如[组,人员]
    text: {
      type: Array,
      default: () => []
    },
    // 默认上面select框的值
    selectValue: {
      type: String,
      default: '',
      required: true
    },
    // 上面select下拉框的数据
    selectOptions: {
      type: Array,
      default: () => [],
      required: true
    },
    // 穿梭框全部数据，左边的数据
    transAllList: {
      type: Array,
      default: () => [],
      required: true
    },
    // 穿梭框右边的初始数据
    transItems: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data() {
    return {
      dataList: [],
      selectItems: [],
      form: {
        selectValue: ''
      },
      rules: {
        selectValue: [{ required: true, message: '请选择', trigger: 'blur' }]
      }
    };
  },
  computed: {
    localSelectOptions() {
      return [...this.selectOptions];
    },
    localTransAllList() {
      return [...this.transAllList];
    }
  },
  watch: {
    transItems(val) {
      this.selectItems = [...val];
    },
    isVisible(val) {
      if (val) {
        this.form.selectValue = this.selectValue;
      }
    }
  },
  methods: {
    handleConfirm() {
      this.$emit('confirm', this.form.selectValue, this.selectItems);
    }
  }
};
</script>

<style lang="less">
.system-transfer {
  .el-transfer-panel__item {
    width: 100%;
    margin: 0;
  }
}
</style>
