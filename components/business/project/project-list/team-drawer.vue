<template>
  <pm-drawer
    :visible="showTeamDrawer"
    :title="`${teamMsg.project ? teamMsg.project.name : ''} - 团队资源`"
    :show-cancel="false"
    @onCancel="displayTeamDrawer({ payload: false })"
    @onSubmit="displayTeamDrawer({ payload: false })"
  >
    <pm-separate size="20" />
    <pm-attention>
      <div class="attention">
        <span
          >总人数：{{
            teamMsg.projectMemberInfoList
              ? teamMsg.projectMemberInfoList.length
              : 0
          }}</span
        >
        <pm-separate :is-vertical="false" />
        <span>总预计工时：{{ teamMsg.predictHours || 0 }}</span>
        <pm-separate :is-vertical="false" />
        <span>已消耗工时：{{ teamMsg.consumedHours || 0 }}</span>
        <pm-separate :is-vertical="false" />
        <span>剩余：{{ teamMsg.surplusHours || 0 }}</span>
      </div>
    </pm-attention>
    <pm-separate size="30" />
    <pm-table
      :data="teamMsg.projectMemberInfoList || []"
      :column="columns"
      :is-pagination="false"
      :is-operation="false"
    />
  </pm-drawer>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import PmDrawer from '@/components/common/pm-drawer.vue';
import PmAttention from '@/components/common/pm-attention';
import PmSeparate from '@/components/common/pm-separate';
import PmTable from '@/components/common/pm-table.vue';
import { TEAM_TABLE_COLUMNS } from '@/constants/project/project-list';

const { mapState, mapMutations } = createNamespacedHelpers(
  'project/project-list'
);

export default {
  components: {
    PmDrawer,
    PmAttention,
    PmSeparate,
    PmTable
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      columns: TEAM_TABLE_COLUMNS
    };
  },
  computed: {
    ...mapState(['showTeamDrawer', 'teamMsg'])
  },
  methods: {
    ...mapMutations(['displayTeamDrawer'])
  }
};
</script>

<style lang="less" scoped>
.attention {
  font-weight: bold;
}
</style>
