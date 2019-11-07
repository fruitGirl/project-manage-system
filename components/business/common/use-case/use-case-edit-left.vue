/*
 * @Description: 用例编辑-左侧组件
 * @Author: danding
 * @Date: 2019-06-25 14:51:49
 * @Last Modified by: danding
 * @Last Modified time: 2019-11-05 17:48:06
 */

<template>
  <el-form ref="formRef" :model="formModel" label-width="100px" :rules="rules">
    <el-form-item label="标题" prop="title">
      <el-input
        v-model="formModel.title"
        autosize
        type="textarea"
        :maxlength="50"
        placeholder="请输入标题，最多50字"
      />
    </el-form-item>
    <el-form-item label="前置条件" prop="precondition">
      <el-input
        v-model="formModel.precondition"
        type="textarea"
        :maxlength="300"
        placeholder="请输入内容，最多300字"
      />
    </el-form-item>
    <slot></slot>
    <el-form-item label="用例描述" prop="describeType">
      <el-radio-group v-model="formModel.describeType">
        <el-radio label="STEP_DESCRIBE"
          >步骤描述
          <el-tooltip
            class="item"
            effect="dark"
            content="适用于有明确的测试步骤及测试结果"
            placement="top"
          >
            <span class="el-icon-info icon-color"></span>
          </el-tooltip>
        </el-radio>
        <el-radio label="TEXT_DESCRIBE"
          >文本描述
          <el-tooltip
            class="item"
            effect="dark"
            content="适用于简单测试场景，没有明确测试步骤"
            placement="top"
          >
            <span class="el-icon-info icon-color"></span>
          </el-tooltip>
        </el-radio>
      </el-radio-group>
      <pm-separate size="15" />
      <pm-editor
        v-show="formModel.describeType === 'TEXT_DESCRIBE'"
        ref="editorRef"
        v-model="textDescribe"
      />
      <drag-table
        v-show="formModel.describeType === 'STEP_DESCRIBE'"
        ref="tableRef"
        :initial-table-list="list"
      />
      <pm-separate size="15" />
      <pm-upload-file ref="uploadRef" :file-list="fileList" />
    </el-form-item>
  </el-form>
</template>

<script>
import PmUploadFile from '@/components/common/pm-upload-file';
import PmEditor from '@/components/common/pm-editor';
import PmSeparate from '@/components/common/pm-separate';
import DragTable from '@/components/business/common/use-case/drag-table.vue';
import { STEP_DESCRIBE } from '@/constants/test/use-case-list';

export default {
  components: {
    PmUploadFile,
    PmEditor,
    PmSeparate,
    DragTable
  },
  props: {
    initialVal: {
      // 文本描述保存，需要传自身查询过来的信息
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      formModel: {
        // 表单输入框值
        title: '',
        precondition: '',
        describeType: STEP_DESCRIBE
      },
      textDescribe:
        '<p><strong style="color: rgb(102, 163, 224);">用例步骤</strong></p><p><br></p><p><strong style="color: rgb(102, 163, 224);">预期结果</strong></p>', // 文本描述
      fileList: [], // 文件集合
      list: [], // 列表
      rules: {
        // 表单规则
        title: [{ required: true, message: '请输入' }]
      }
    };
  },
  methods: {
    // 获取数据
    async getData() {
      const validateResult = await this.$refs.formRef.validate();
      if (validateResult) {
        const textDescribe = this.$refs.editorRef.getContent();
        const fileNameList = this.$refs.uploadRef.getData();
        const tableList = this.$refs.tableRef.getData();

        let testCaseStepListStr;

        // 描述测试步骤类型
        if (this.formModel.describeType === STEP_DESCRIBE) {
          testCaseStepListStr = JSON.stringify(tableList);
        } else {
          // 描述文本类型，封装数据格式
          const { textDescribeId, textDescribeStepId } = this.initialVal || {};
          testCaseStepListStr = JSON.stringify([
            {
              textDescribe,
              id: textDescribeId,
              testCaseId: textDescribeStepId,
              orderNumber: 0,
              parentId: '-1'
            }
          ]);
        }

        return {
          ...this.formModel,
          testCaseStepListStr,
          fileNameList
        };
      }
    },

    // 赋值
    setData(data) {
      const {
        title,
        precondition,
        describeType = 'STEP_DESCRIBE',
        textDescribe = '<p><strong style="color: rgb(102, 163, 224);">用例步骤</strong></p><p><br></p><p><strong style="color: rgb(102, 163, 224);">预期结果</strong></p>',
        testCaseSteps,
        fileNameList
      } = data;
      this.formModel = {
        title,
        precondition,
        describeType
      };
      this.fileList = fileNameList;
      this.textDescribe = textDescribe;
      this.list = testCaseSteps;
    },

    // 重置数据
    resetData() {
      this.$refs.formRef.resetFields();
      this.textDescribe =
        '<p><strong style="color: rgb(102, 163, 224);">用例步骤</strong></p><p><br></p><p><strong style="color: rgb(102, 163, 224);">预期结果</strong></p>';
      this.list = [];
      this.fileList = [];
    }
  }
};
</script>

<style scoped>
.icon-color {
  color: gray;
}
</style>
