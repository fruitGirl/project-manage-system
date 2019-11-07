/*
 * @Description: bug列表-表格
 * @Author: danding
 * @Date: 2019-06-20 17:03:09
 * @Last Modified by: yaochen
 * @Last Modified time: 2019-07-10 10:29:39
 */

<template>
  <pm-table
    :data="list"
    :column="columns"
    :operation="operation"
    :default-sort="defaultSort"
    :pagination="pagination"
    :operation-width="operationWidth"
    :is-operation= "true"
    @currentChange="handleCurrentChange"
    @handleCheck="handleCheck"
    @sort="handleSort"
  >
    <template v-slot:name="slotProps">
      <div>
        <nuxt-link to="/product">{{slotProps.rowData.name}}</nuxt-link>
      </div>
    </template>
  </pm-table>
</template>

<script>
import PmTable from '@/components/common/pm-table';

export default {
  components: {
    PmTable,
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    operation: {
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
    },
    operationWidth: {
      // 操作列的宽度
      type: Number,
      default: 100
    },
  },
  data() {
    return {
    };
  },
  methods: {
    handleCheck(index, row) {
      console.log('row=', row);
    },
    handleSort(column) {
      console.log('sort content = ', column);
    },
    handleCurrentChange(val) {
      console.log('currentChange = ', val);
    }
  }
};
</script>

<style lang="less" scoped>

</style>
