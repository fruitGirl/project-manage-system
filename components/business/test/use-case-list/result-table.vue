/*
 * @Description: 测试用例列表-表格
 * @Author: danding
 * @Date: 2019-06-20 17:03:09
 * @Last Modified by: danding
 * @Last Modified time: 2019-11-05 18:17:17
 */

<template>
  <pm-table
    ref="tableRef"
    :data="list"
    :column="COLUMNS"
    :default-sort="sorts"
    :is-operation="true"
    :is-select="true"
    :pagination="paginator"
    row-key="id"
    :operation-width="200"
    @pageChange="pageChange"
    @selectChange="handleCheck"
    @sort="handleSort"
  >
    <template v-slot:priority="slotProps">
      {{ filterPriority(slotProps.rowData.priority) }}
    </template>
    <template v-slot:title="slotProps">
      <a
        href="javascript:;"
        @click="getDetailInfo(slotProps.rowData.id)"
        >{{ slotProps.rowData.title }}</a
      >
    </template>
    <template v-slot:bugNum="slotProps">
      <a
        href="javascript:;"
        @click="getBugsList({ testCaseId: slotProps.rowData.id })"
        >{{ slotProps.rowData.bugNum }}</a
      >
    </template>
    <template v-slot:bugNum_header>
      BUG
      <el-tooltip effect="dark" content="剩余未关闭的BUG" placement="top">
        <i class="el-icon-info"></i>
      </el-tooltip>
    </template>
    <template v-slot:operation="slotProps">
      <a
        href="javascript:;"
        @click="executeUseCase({ testCaseId: slotProps.rowData.id })"
        >执行</a
      >
      <a
        href="javascript:;"
        @click="
          getExecuteResultAndShowDialog({ testCaseId: slotProps.rowData.id })
        "
        >结果</a
      >
      <a
        href="javascript:;"
        @click="transferBug({ testCaseId: slotProps.rowData.id })"
        >转BUG</a
      >
      <a
        href="javascript:;"
        @click="getUseCaseMsg({ testCaseId: slotProps.rowData.id })"
        >编辑</a
      >
      <a
        href="javascript:;"
        @click="handleCopyUseCaseMsg({ testCaseId: slotProps.rowData.id })"
        >复制</a
      >
    </template>
  </pm-table>
</template>

<script>
import PmTable from '@/components/common/pm-table.vue';
import { SORT_CONFIG, COLUMNS } from '@/constants/test/use-case-list';
import { createNamespacedHelpers } from 'vuex';
import { filterEnumsLabel } from '@/utils/common';
import { PRIORITY } from '@/constants/common/config';

const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  'test/use-case-list'
);

export default {
  components: {
    PmTable,
  },
  props: {
    pagination: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      sorts: {}, // 排序
      COLUMNS,
      filterPriority: filterEnumsLabel(PRIORITY)
    };
  },
  computed: {
    ...mapState(['list', 'paginator', 'selectedRows'])
  },
  watch: {
    selectedRows(newVal) {
      if (!newVal.length) {
        this.$refs.tableRef.clearSelection();
      }
    }
  },
  methods: {
    ...mapActions([
      'handleSubmit',
      'getUseCaseMsg',
      'handleCopyUseCaseMsg',
      'executeUseCase',
      'getExecuteResultAndShowDialog',
      'transferBug',
      'getBugsList',
      'getUseCaseDetailInfo',
      'getOperateHistory'
    ]),
    ...mapMutations(['changeSelections', 'displayUseCaseDetailDrawer']),
    handleSort(sortObj) {
      const { prop, order } = sortObj;
      const orderBys = [SORT_CONFIG[`${prop}_${order}`]];
      this.handleSubmit({ orderBys });
      this.sorts = { prop, order };
    },
    handleCheck(rows) {
      this.changeSelections({ payload: rows });
    },
    pageChange(params) {
      this.handleSubmit(params);
    },
    getDetailInfo(testCaseId) {
      this.displayUseCaseDetailDrawer({ payload: true });
      this.getUseCaseDetailInfo({ testCaseId });
      this.getOperateHistory({ testCaseId });
    }
  }
};
</script>

<style lang="less" scoped></style>
