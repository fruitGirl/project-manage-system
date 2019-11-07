/*
 * @Description: 测试-执行弹框
 * @Author: moran
 * @Date: 2019-06-25 16:09:59
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 18:09:50
 */
<template>
  <el-dialog
    custom-class="execute-dialog-wrapper"
    :title="title"
    :width="width"
    :visible="visible"
    :close-on-click-modal="false"
    @close="handleCloseDialog"
  >
    <div class="modal-body">
      <el-form label-width="80px">
        <el-form-item label="标题">{{ useCaseMsg.title }}</el-form-item>
        <el-form-item label="前置条件">
          <pm-textarea-detail>{{useCaseMsg.precondition || '-'}}</pm-textarea-detail>
        </el-form-item>
        <el-form-item
          v-if="useCaseMsg.describeType === STEP_DESCRIBE"
          label="用例描述"
        >
          <pm-step-table
            ref="stepTableRef"
            :initial-data-provider="useCaseMsg.testCaseSteps"
          />
        </el-form-item>
        <div v-if="useCaseMsg.describeType === TEXT_DESCRIBE">
          <el-form-item label="用例描述">
            <pm-editor-detail
              :content="useCaseMsg.testCaseSteps[0].textDescribe || '无'"
            />
          </el-form-item>
          <el-form-item label="测试结果">
            <pm-remote-radio
              v-model="useCaseMsg.testCaseSteps[0].executeResult"
              :action="TEST_CASE_EXECUTE_RESULT_TYPE_URL"
            />
          </el-form-item>
          <el-form-item label="实际情况">
            <pm-editor v-model="useCaseMsg.testCaseSteps[0].actualSituation" />
          </el-form-item>
          <el-form-item label="附件">
            <pm-upload-file ref="uploadFileRef" />
          </el-form-item>
        </div>
      </el-form>
      <div class="btn-box">
        <el-button
          class="btn-white"
          :disabled="isDisablePreVious"
          @click="handlePrevious"
          >上一个</el-button
        >
        <el-button class="btn-blue" type="primary" @click="saveExecuteResult"
          >保存</el-button
        >
        <el-button
          class="btn-white"
          :disabled="isDisableNext"
          @click="handleNext"
          >下一个</el-button
        >
      </div>
      <execute-result
        :data-provider="storeExecuteResultMsg"
        :expand-row-keys="expandRowKeys"
        @getResultDetail="getResultDetail"
        @transferBug="transferBug"
      />
    </div>
  </el-dialog>
</template>

<script>
import PmStepTable from '@/components/common/pm-step-table.vue';
import PmEditor from '@/components/common/pm-editor';
import PmUploadFile from '@/components/common/pm-upload-file/index.vue';
import { STEP_DESCRIBE, TEXT_DESCRIBE } from '@/constants/test/use-case-list';
import PmRemoteRadio from '@/components/common/pm-remote-radio.vue';
import { TEST_CASE_EXECUTE_RESULT_TYPE_URL } from '@/services/common-config';
import cloneDeep from 'lodash.clonedeep';
import ExecuteResult from '@/components/business/common/execute-result.vue';
import PmEditorDetail from '@/components/common/pm-editor-detail.vue';
import PmTextareaDetail from '@/components/common/pm-textarea-detail.vue';

export default {
  components: {
    PmStepTable,
    PmEditor,
    PmUploadFile,
    PmRemoteRadio,
    ExecuteResult,
    PmEditorDetail,
    PmTextareaDetail
  },
  props: {
    visible: {
      type: Boolean,
      require: true
    },
    title: {
      type: String,
      default: '执行'
    },
    width: {
      type: String,
      default: '1000px'
    },
    initialUseCaseMsg: {
      // 初始化的用例数据
      type: Object,
      default: () => ({})
    },
    storeExecuteResultMsg: {
      // 结果列表的数据
      type: Object,
      default: () => ({})
    },
    expandRowKeys: {
      type: Array,
      default: () => []
    },
    switchKeys: {
      // 批量执行的队列值
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      STEP_DESCRIBE, // 测试步骤描述类型
      TEXT_DESCRIBE, // 文本描述类型
      TEST_CASE_EXECUTE_RESULT_TYPE_URL, // 测试用例结果类型url
      dialogLoading: false,
      switchIndex: 0, // 当前执行的队列索引值
      isDisableNext: true,
      isDisablePreVious: true
    };
  },
  computed: {
    useCaseMsg() {
      this.$refs.uploadFileRef && this.$refs.uploadFileRef.resetData();
      return cloneDeep(this.initialUseCaseMsg);
    }
  },
  watch: {
    switchKeys(newVal) {
      if (newVal && newVal.length > 1) {
        this.isDisableNext = false;
      }
    },
    visible(newVal, oldVal) {
      if (!newVal && oldVal) {
        this.switchIndex = 0;
        if (this.switchKeys && this.switchKeys.length > 1) {
          this.isDisableNext = false;
          this.isDisablePreVious = true;
        } else {
          this.isDisableNext = true;
          this.isDisablePreVious = true;
        }
      }
    }
  },
  methods: {
    handleCloseDialog() {
      this.$emit('onHide');
    },
    handleConfirm() {
      this.$emit('confirm');
    },
    saveExecuteResult() {
      let testCaseSteps = [];
      // 描述类型为文本描述
      if (this.useCaseMsg.describeType === TEXT_DESCRIBE) {
        const fileNames = this.$refs.uploadFileRef.getData();
        this.useCaseMsg.testCaseSteps[0].fileNames = fileNames;
        testCaseSteps = this.useCaseMsg.testCaseSteps.map(i => {
          return {
            ...i,
            testCaseExecuteId: i.testCaseId,
            text: i.textDescribe
          };
        });
      } else {
        const data = this.$refs.stepTableRef.getData();
        testCaseSteps = data.map(i => {
          const { testCaseStepList } = i;
          const testCaseStepExecuteResultList = testCaseStepList.map(j => {
            const description = j.stepDescribe;
            delete j.stepDescribe;
            return {
              ...j,
              description
            };
          });
          delete i.testCaseStepList;
          return {
            ...i,
            testCaseExecuteId: i.testCaseId,
            description: i.stepDescribe,
            testCaseStepExecuteResultList
          };
        });
      }

      const { id } = this.useCaseMsg;
      this.$emit('onSave', {
        executeSourceId: id,
        testCaseStepExecuteResultJsonStr: JSON.stringify(testCaseSteps)
      });
    },
    handleNext() {
      this.switchIndex = this.switchIndex + 1;

      // 执行下一个
      if (this.switchIndex <= this.switchKeys.length - 1) {
        this.$emit(
          'switch',
          this.switchKeys[this.switchIndex].id,
          this.switchKeys[this.switchIndex].linkId
        );
        this.isDisableNext = false;
        this.isDisablePreVious = false;
      }

      // 执行到最后一个
      if (this.switchIndex >= this.switchKeys.length - 1) {
        this.isDisableNext = true;
        this.isDisablePreVious = false;
      }
    },
    handlePrevious() {
      if (this.switchIndex <= 0) return;

      this.switchIndex = this.switchIndex - 1;

      // 执行上一个
      if (this.switchIndex < this.switchKeys.length - 1) {
        this.isDisableNext = false;
        this.isDisablePreVious = false;
        this.$emit(
          'switch',
          this.switchKeys[this.switchIndex].id,
          this.switchKeys[this.switchIndex].linkId
        );
      }

      // 执行到最开始的一个
      if (this.switchIndex <= 0) {
        this.isDisablePreVious = true;
        this.isDisableNext = false;
      }
    },
    getResultDetail(id) {
      this.$emit('getResultDetail', id);
    },
    transferBug(payload) {
      this.$emit('transferBug', payload);
    }
  }
};
</script>
<style lang="less" scoped>
@deep: ~'>>>';

@{deep} .execute-dialog-wrapper {
  margin-top: 20px !important;
  .modal-body {
    .el-dropdown-link {
      cursor: pointer;
      color: #409eff;
    }
    .attention {
      font-weight: bold;
    }
    .btn-box {
      text-align: center;
      margin: 20px 0;
      height: 60px;
      border-bottom: solid 1px #e6e6e6;
    }
  }
}
</style>
