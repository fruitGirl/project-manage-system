<template>
  <pm-table
    v-loading="testLoading"
    :data="testFormTestDemand"
    :column="column"
    :is-pagination="false"
    :is-operation="false"
  >
    <template v-slot:priority="slotProps">
      {{ filterPriority(slotProps.rowData.priority) }}
    </template>
  </pm-table>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import PmTable from '@/components/common/pm-table.vue';
import { RANGECOLUMN } from '@/constants/project/test-report-detail';
import { PRIORITY } from '@/constants/common/config';
import { filterEnumsLabel } from '@/utils/common';
const { mapState, mapActions } = createNamespacedHelpers(
  'project/test-report-detail'
);

export default {
  components: {
    PmTable
  },
  props: {
    testId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      column: RANGECOLUMN,
      id: this.testId || this.$route.query.id,
      filterPriority: filterEnumsLabel(PRIORITY)
    };
  },
  computed: {
    ...mapState(['testFormTestDemand', 'testLoading'])
  },
  created() {
    this.getTestFormTestDemand({ testFormId: this.id });
  },
  methods: {
    ...mapActions(['getTestFormTestDemand'])
  }
};
</script>
