<template>
  <el-dialog
    custom-class="execute-dialog-wrapper"
    title="处理中的bug"
    width="800px"
    :visible="showBugDialog"
    @close="displayBugDialog({ payload: false })"
  >
    <pm-table
      :data="bugList"
      :column="columns"
      :is-pagination="false"
      :is-operation="false"
    />
  </el-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import PmTable from '@/components/common/pm-table';
import { BUG_COLUMNS } from '@/constants/test/use-case-list';

const { mapState, mapMutations } = createNamespacedHelpers(
  'project/test-sheet-detail'
);

export default {
  components: {
    PmTable
  },
  data() {
    return {
      columns: BUG_COLUMNS
    };
  },
  computed: {
    ...mapState(['showBugDialog', 'bugList'])
  },
  methods: {
    ...mapMutations(['displayBugDialog'])
  }
};
</script>
