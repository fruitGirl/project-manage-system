/*
 * @Description: 用例编辑
 * @Author: danding
 * @Date: 2019-06-25 14:52:14
 * @Last Modified by: danding
 * @Last Modified time: 2019-11-05 19:11:29
 */

<template>
  <pm-drawer
    :title="title"
    :visible="visible"
    @onCancel="handleCancel"
  >
    <template v-slot:headerRight>
      <el-button type="primary" @click="handleSubmit(false)">保存</el-button>
      <el-button
        v-show="showAgainAddBtn"
        type="primary"
        @click="handleSubmit(true)"
      >保存并新增下一个</el-button>
    </template>
    <use-case-edit-left ref="leftModuleRef" :initial-val="initialVal">
      <use-case-edit-right ref="rightModuleRef" :form-data="formData" />
    </use-case-edit-left>
  </pm-drawer>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import UseCaseEditLeft from '@/components/business/common/use-case/use-case-edit-left.vue';
import UseCaseEditRight from '@/components/business/common/use-case/use-case-edit-right.vue';
import PmDrawer from '@/components/common/pm-drawer.vue';
import { FORM_CONFIG } from '@/constants/common/use-case-edit';
import cloneDeep from 'lodash.clonedeep';

const { mapState, mapActions } = createNamespacedHelpers('test/use-case-list');

export default {
  components: {
    UseCaseEditLeft,
    PmDrawer,
    UseCaseEditRight
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    initialVal: {
      type: Object,
      default: () => ({})
    },
    formData: {
      type: Object,
      default: () => {}
    },
    isIntegrateVuex: { // 是否集成vuex业务数据层（保存功能）
      type: Boolean,
      default: false
    },
    detailId: { // 用例详情的id
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      rightSettings: FORM_CONFIG
    };
  },
  computed: {
    ...mapState(['storeEditUseCaseMsg']),
    showAgainAddBtn() {
      return !(this.initialVal && this.initialVal.id);
    }
  },
  watch: {
    initialVal(newVal) {
      newVal && this.setData(newVal);
    },
    visible(newVal, oldVal) {
      if (!newVal && oldVal) {
        this.resetData();
      }
    },
    formData(newVal) {
      newVal && this.setData(newVal);
      this.resetData();
    },

    // 编辑时，表单赋值
    storeEditUseCaseMsg: {
      handler(newVal) {
        // 存储编辑信息的对象存在新值
        if (newVal && Object.keys(newVal).length) {
          this.setData(newVal);
        } else {
          this.resetData();
        }
      },
      deep: true
    },

    // 获取详情信息
    detailId(newVal) {
      this.getUseCaseMsg({ testCaseId: newVal });
    }
  },
  methods: {
    ...mapActions(['getUseCaseMsg']),
    async handleSubmit(isAgainAdd) {
      try {
        const rightData = await this.$refs.rightModuleRef.getData();
        const leftData = await this.$refs.leftModuleRef.getData();
        const submitData = { ...leftData, ...rightData, isAgainAdd };

        // 内置集成保存功能
        if (this.isIntegrateVuex) {
          this.saveUseCase(submitData);
        } else {
          await this.$emit('onSubmit', submitData);
        }
      } catch (err) {
        console.log('err', err);
      }
    },
    handleCancel() {
      this.$emit('onHide');
    },
    setData(data) {
      const cloneData = cloneDeep(data);
      this.$refs.rightModuleRef.setData(cloneData);
      this.$refs.leftModuleRef.setData(cloneData);
    },
    resetData() {
      this.$refs.rightModuleRef.resetData();
      this.$refs.leftModuleRef.resetData();
    }
  }
};
</script>

<style lang="less" scoped>
.edit-use-case {
  height: 100%;
  .right-module {
    height: 100%;
    padding-top: 15px;
    background: #f9fafc;
  }
}
</style>
