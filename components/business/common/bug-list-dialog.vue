<template>
  <el-dialog
    custom-class="execute-dialog-wrapper"
    title="处理中的bug"
    width="800px"
    :visible="isVisible"
    @close="$emit('close')"
  >
    <pm-table
      :data="data"
      :column="columns"
      :is-pagination="false"
      :is-operation="false"
    />
  </el-dialog>
</template>

<script>
import PmTable from '@/components/common/pm-table';
import { BUG_COLUMNS } from '@/constants/test/use-case-list';

export default {
  components: {
    PmTable
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      columns: BUG_COLUMNS
    };
  }
};
</script>
