<template>
  <pm-table
    :data="list"
    :column="columns"
    :default-sort="sorts"
    :pagination="paginator"
    :loading="loadingTable"
    @pageChange="pageChange"
    @sort="handleSort"
  >
    <template v-slot:priority="slotProps">
      {{ filterPriority(slotProps.rowData.priority) }}
    </template>
    <template v-slot:name="slotProps">
      <pm-link :to="`/project/home?dependenceId=${slotProps.rowData.id}`">
        {{ slotProps.rowData.name }}
      </pm-link>
    </template>
    <template v-slot:gmtEstimate="slotProps">
      <p>起 {{ slotProps.rowData.shortGmtEstimateStart || '-' }}</p>
      <p>止 {{ slotProps.rowData.shortGmtEstimateEnd || '-' }}</p>
    </template>
    <template v-slot:gmtActual="slotProps">
      <p>起 {{ slotProps.rowData.shortGmtActualStart || '-' }}</p>
      <p>止 {{ slotProps.rowData.shortGmtActualStart || '-' }}</p>
    </template>
    <template v-slot:productNum="slotProps">
      <a href="javascript:;" @click="getRelateProduct(slotProps.rowData)">
        {{ slotProps.rowData.productNum }}
      </a>
    </template>
    <template v-slot:memberNum="slotProps">
      <a
        href="javascript:;"
        @click="getProjectTeam({ projectId: slotProps.rowData.id })"
      >
        {{ slotProps.rowData.memberNum }}
      </a>
    </template>
    <template v-slot:operation="slotProps">
      <a
        v-if="slotProps.rowData.status.name === 'UNSTART'"
        href="javascript:;"
        @click="getProjectMsg({ projectId: slotProps.rowData.id })"
        >编辑</a
      >
    </template>
  </pm-table>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { TABLE_COLUMNS, SORT_CONFIG } from '@/constants/project/project-list';
import PmTable from '@/components/common/pm-table.vue';
import PmLink from '@/components/common/pm-link';
import { PRIORITY } from '@/constants/common/config';
import { filterEnumsLabel } from '@/utils/common';

const { mapState, mapActions } = createNamespacedHelpers(
  'project/project-list'
);

export default {
  components: {
    PmTable,
    PmLink
  },
  data() {
    return {
      columns: TABLE_COLUMNS,
      filterPriority: filterEnumsLabel(PRIORITY),
      sorts: {}
    };
  },
  computed: {
    ...mapState([
      'defaultSort',
      'paginator',
      'savedSearchVals',
      'list',
      'loadingTable'
    ])
  },
  methods: {
    ...mapActions([
      'handleSubmit',
      'getRelateProduct',
      'getProjectMsg',
      'getProjectTeam'
    ]),
    handleSort(sortObj) {
      const { prop, order } = sortObj;
      const orderBys = [SORT_CONFIG[`${prop}_${order}`]];
      this.handleSubmit({ orderBys });
      this.sorts = { prop, order };
    },
    pageChange(params) {
      this.handleSubmit(params);
    }
  }
};
</script>

<style lang="less" scoped></style>
