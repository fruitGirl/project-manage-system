/*
 * @Description: 执行结果
 * @Author: danding
 * @Date: 2019-07-19 18:01:28
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 15:09:25
 */

<template>
  <div>
    <pm-attention>
      <div class="attention">
        <span>共执行{{ dataProvider.executeCount || 0 }}次</span>
        <pm-separate :is-vertical="false" />
        <span>失败{{ dataProvider.failCount || 0 }}次</span>
      </div>
    </pm-attention>
    <pm-separate :size="18" />
    <pm-table
      :column="COLUMN"
      :data="testCaseExecuteList"
      :show-expand="true"
      :is-pagination="false"
      :expand-row-keys="expandRowKeys"
      :expand="false"
      @expandChange="expandChange"
    >
      <template v-slot:operation="slotProps">
        <el-button
          type="text"
          size="medium"
          @click="getDetail({ testCaseExecuteId: slotProps.rowData.id })"
          >详情</el-button
        >
        <el-button
          v-if="slotProps.rowData.result.name === 'FAIL'"
          type="text"
          size="medium"
          @click="transferBug({ testCaseId: slotProps.rowData.testCaseId })"
          >转BUG</el-button
        >
      </template>
      <template v-slot:expand="slotProps">
        <pm-table
          v-if="dataProvider.describeType.name === STEP_DESCRIBE"
          :column="CELLCOLUMN"
          :data="slotProps.rowData.expandData"
          :is-pagination="false"
          :is-operation="false"
          :border="true"
          children-field="testCaseStepExecuteResultList"
        >
          <template v-slot:fileList="slotProps">
            <el-dropdown
              v-if="
                slotProps.rowData.fileList && slotProps.rowData.fileList.length
              "
              trigger="click"
            >
              <span class="el-dropdown-link">
                查看附件
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="file in slotProps.rowData.fileList"
                  :key="file.id"
                >
                  <pm-download-file
                    :resource-id="file.resourceId"
                    :file-name="file.fileName"
                    >{{ file.fileName }}</pm-download-file
                  >
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </pm-table>
        <div
          v-for="item in slotProps.rowData.expandData"
          v-else-if="dataProvider.describeType.name === TEXT_DESCRIBE"
          :key="item.id"
        >
          <pm-separate />
          <el-row>
            <el-col>
              <h4>用例描述：</h4>
              <pm-editor-detail :content="item.text" />
            </el-col>
            <el-col>
              <h4>实际情况：</h4>
              <pm-editor-detail :content="item.actualSituation" />
            </el-col>
            <el-col>
              <h4>附件：</h4>
              <pm-download-file
                v-for="file in item.fileList"
                :key="file.id"
                :resource-id="file.resourceId"
                :file-name="file.fileName"
                >{{ file.fileName }}</pm-download-file
              >
            </el-col>
          </el-row>
          <pm-separate />
        </div>
      </template>
    </pm-table>
  </div>
</template>

<script>
import PmAttention from '@/components/common/pm-attention';
import PmSeparate from '@/components/common/pm-separate.vue';
import { COLUMN, CELLCOLUMN } from '@/constants/common/execute-dialog';
import PmTable from '@/components/common/pm-table.vue';
import PmDownloadFile from '@/components/common/pm-download-file.vue';
import { TEXT_DESCRIBE, STEP_DESCRIBE } from '@/constants/test/use-case-list';
import PmEditorDetail from '@/components/common/pm-editor-detail';

export default {
  components: {
    PmAttention,
    PmSeparate,
    PmTable,
    PmDownloadFile,
    PmEditorDetail
  },
  props: {
    dataProvider: {
      type: Object,
      default: () => ({})
    },
    expandRowKeys: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      COLUMN,
      CELLCOLUMN,
      STEP_DESCRIBE,
      TEXT_DESCRIBE
    };
  },
  computed: {
    testCaseExecuteList() {
      return this.dataProvider.testCaseExecuteList;
    }
  },
  methods: {
    getDetail(payload) {
      this.$emit('getResultDetail', payload);
    },
    transferBug(payload) {
      this.$emit('transferBug', payload);
    },
    expandChange(row, param = []) {
      const matchItem = param.find(i => i.id === row.id);

      // 展开
      if (matchItem) {
        this.$emit('getResultDetail', { testCaseExecuteId: row.id });
      }
    }
  }
};
</script>
