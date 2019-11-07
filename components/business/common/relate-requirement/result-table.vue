/*
 * @Description: 关联需求-表格
 * @Author: moran
 * @Date: 2019-06-20 17:03:09
 * @Last Modified by: moran
 * @Last Modified time: 2019-10-29 16:31:03
 */

<template>
  <pm-table
    :data="list"
    :column="columns"
    :pagination="pagination"
    :is-operation="false"
    :is-select="true"
    @pageChange="handlePageChange"
    @selectChange="handleSelectChange"
    @sort="handleSort"
  >
    <template v-slot:priority="{ rowData }">
      {{ filterPriority(rowData.priority) }}
    </template>
    <template v-slot:assignedPerson="{ rowData }">
      <span>{{ rowData.assignedPerson || '未指派' }}</span>
    </template>
    <template v-slot:title="{ rowData }">
      <a href="javascript:;" @click="$emit('openDrawer', rowData.id)">{{
          rowData.title
        }}</a>
    </template>
  </pm-table>
</template>

<script>
import PmTable from '@/components/common/pm-table.vue';
import { PRIORITY } from '@/constants/common/config';
import { filterEnumsLabel } from '@/utils/common';
import { SORT_CONFIG } from '@/constants/common/requirement-list';

export default {
  components: {
    PmTable
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    defaultSort: {
      type: Object,
      default: () => ({})
    },
    pagination: {
      type: Object,
      default: () => ({})
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      filterPriority: filterEnumsLabel(PRIORITY)
    };
  },
  methods: {
    handleSort(sortObj) {
      const { prop, order } = sortObj;
      const orderRuleList = [SORT_CONFIG[`${prop}_${order}`]];
      this.$emit('change', { orderRuleList });
    },
    handlePageChange(val) {
      this.$emit('change', val);
    },
    handleSelectChange(val) {
      this.$emit('select', val);
    }
  }
};
</script>

<style lang="less" scoped></style>
