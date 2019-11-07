/*
 * @Description: 项目-团队列表
 * @Author: yaochen
 * @Date: 2019-07-02 19:35:49
 * @Last Modified by: moran
 * @Last Modified time: 2019-10-29 17:16:15
 */
<template>
  <div class="team-manage-container page-container">
    <nuxt-link :to="`./edit-team?dependenceId=${selectedDependenceId}`">
      <el-button class="team-manage-btn" type="primary">团队管理</el-button>
    </nuxt-link>
    <charger-info :team-info="teamInfo"></charger-info>
    <h1 class="team-name">
      <i class="el-icon-info"></i>
      {{ teamInfo.name }}
    </h1>
    <pm-table
      :data="localMemberList"
      :column="column"
      :is-operation="false"
      :is-pagination="false"
      @sort="sortHandler"
    ></pm-table>
  </div>
</template>

<script>
import PmTable from '@/components/common/pm-table';
import ChargerInfo from '@/components/business/common/charger-info';

import pageData from '@/constants/project/team-manage';
import { createNamespacedHelpers } from 'vuex';
import { formatSortProp } from '@/utils/common';

const { mapActions, mapState } = createNamespacedHelpers('project/team-manage');

export default {
  head: {
    title: '设置-团队'
  },
  components: {
    PmTable,
    ChargerInfo
  },
  data() {
    return {
      orderBys: undefined,
      selectedDependenceId: '',
      column: pageData.column
    };
  },
  computed: {
    ...mapState(['teamInfo', 'memberList']),
    // 转数据
    localMemberList() {
      return this.memberList.map(item => {
        return {
          id: item.id,
          name: item.name || '-',
          role: item.role || '-',
          userId: item.userId || '-',
          roleId: item.roleId || '-',
          days: item.days || '-',
          hours: item.hours || '-',
          totalEstimatedHours: item.totalEstimatedHours || '-',
          estimateLeftHours: item.estimateLeftHours || '-',
          actualHoursConsumed: item.actualHoursConsumed || '-'
        };
      });
    }
  },
  created() {
    this.selectedDependenceId = this.$route.query.dependenceId;
    this.query();
  },
  methods: {
    ...mapActions(['getProjectMemberApi']),
    sortHandler({ prop, order }) {
      if (prop === 'role') {
        this.orderBys = formatSortProp('roleId', order);
      } else {
        this.orderBys = formatSortProp(prop, order);
      }
      this.query();
    },
    // 获取团队
    query() {
      if (this.selectedDependenceId) {
        this.getProjectMemberApi({
          projectId: this.selectedDependenceId,
          orderBys: this.orderBys
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.team-manage-container {
  padding: 24px 50px;
}
.team-manage-btn {
  margin-bottom: 10px;
}
.team-name {
  background: rgba(230, 247, 255, 1);
  border: 1px solid rgba(145, 213, 255, 1);
  border-radius: 4px;
  padding: 6px;
  padding-left: 10px;
  font-size: 14px;
  .el-icon-info {
    color: #409eff;
    margin-right: 10px;
  }
}
</style>
