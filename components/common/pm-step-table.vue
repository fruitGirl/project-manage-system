<template>
  <pm-table
    :data="dataProvider"
    row-key="id"
    :border="true"
    :column="stepColumn"
    :is-pagination="false"
    children-field="testCaseStepList"
    :is-operation="false"
  >
    <template v-slot:executeResult="slotProps">
      <pm-remote-select
        v-model="slotProps.rowData.executeResult"
        :need-all-opt="false"
        :action="TEST_CASE_EXECUTE_RESULT_TYPE_URL"
      />
    </template>
    <template v-slot:actualSituation="slotProps">
      <el-input
        v-model="slotProps.rowData.actualSituation"
        type="textarea"
        :autosize="true"
        :rows="1"
      />
    </template>
    <template v-slot:operate="slotProps">
      <pm-upload-file
        v-if="showUplod"
        ref="uploadFileRef"
        @change="changeFile(arguments, slotProps.rowData)"
      />
    </template>
  </pm-table>
</template>

<script>
import PmTable from '@/components/common/pm-table.vue';
import { STEPCOLUMN } from '@/constants/common/execute-dialog';
import PmRemoteSelect from '@/components/common/pm-remote-select.vue';
import { TEST_CASE_EXECUTE_RESULT_TYPE_URL } from '@/services/common-config';
import PmUploadFile from '@/components/common/pm-upload-file/index.vue';
import cloneDeep from 'lodash.clonedeep';

export default {
  components: {
    PmTable,
    PmRemoteSelect,
    PmUploadFile
  },
  props: {
    initialDataProvider: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      TEST_CASE_EXECUTE_RESULT_TYPE_URL,
      stepColumn: STEPCOLUMN,
      dataProvider: [],
      showUplod: true
    };
  },
  watch: {
    initialDataProvider: {
      handler(newVal) {
        this.dataProvider = cloneDeep(newVal);
        this.showUplod = false;
        this.$nextTick(() => {
          this.showUplod = true;
        });
      },
      immediate: true
    }
  },
  methods: {
    getData() {
      return cloneDeep(this.dataProvider);
    },
    changeFile(args, row) {
      const fileList = args[1];
      const { id } = row;
      const dataProvider = cloneDeep(this.dataProvider).map(i => {
        let { testCaseStepList = [], fileNames } = i;
        if (id === i.id) {
          fileNames = fileList.map(
            f => f.fileName || (f.response && f.response.fileName)
          );
        }

        testCaseStepList = testCaseStepList.map(j => {
          let stepFileNames = j.fileNames;
          if (id === j.id) {
            stepFileNames = fileList.map(
              f => f.fileName || (f.response && f.response.fileName)
            );
          }
          return {
            ...j,
            fileNames: stepFileNames
          };
        });

        return {
          ...i,
          fileNames,
          testCaseStepList
        };
      });

      this.dataProvider = dataProvider;
    }
  }
};
</script>
