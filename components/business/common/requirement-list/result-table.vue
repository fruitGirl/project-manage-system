/*
 * @Description: 需求列表-表格
 * @Author: moran
 * @Date: 2019-06-20 17:03:09
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-04 12:08:32
 */

<template>
  <pm-table
    :data="list"
    :column="columns"
    :default-sort="defaultSort"
    :pagination="pagination"
    fix-operation-width="100"
    :is-operation="true"
    :is-select="isProjectModule ? true : false"
    @pageChange="handlePageChange"
    @selectChange="handleSelectChange"
    @sort="handleSort"
  >
    <template v-slot:priority="{ rowData }">
      {{ filterPriority(rowData.priority) }}
    </template>
    <template v-slot:title="{ rowData }">
       <a href="javascript:;" @click="$emit('openDrawer', rowData.id)">{{
          rowData.title
        }}</a>
    </template>
    <template v-slot:status="{ rowData }">
      <div v-if="isProjectModule">{{ rowData.status.message }}</div>
      <div v-else style="width:90%">
        <pm-remote-select
          :value="rowData.status.name"
          :is-transparent-border="false"
          all-opt-text=""
          :action="DEMAND_STATUS_URL"
          @change="handleStatusChange($event, rowData.id)"
        />
      </div>
    </template>
    <template v-slot:gmtEstimateStart="{ rowData }">
      {{ dateRangeShow(rowData.shortGmtEstimateStart, rowData.shortGmtEstimateEnd) }}
    </template>
    <template v-slot:assignedPerson="{ rowData }">
      <div v-if="isProjectModule">
        {{ rowData.assignedPerson || '未指派' }}
      </div>
      <div v-else>
        <span v-if="rowData.assignedPerson">{{
          rowData.assignedPerson
        }}</span>
        <span v-else>
          <el-popover :value="isPopover" placement="bottom" trigger="click">
            <pm-remote-search
              v-model="assignedPerson"
              :action="ALL_USER_URL"
              :parse-structure="handleParseStructure"
              :default-option="[]"
               @change="handleAssign($event, rowData.id)"
            />
            <span slot="reference" class="ft-blue">未指派</span>
          </el-popover>
        </span>
      </div>
    </template>
    <template v-slot:operation="{ rowData }">
      <el-button type="text" @click="$emit('editor', rowData.id)"
        >编辑</el-button
      >
      <el-button type="text" @click="$emit('addCase', rowData.id)"
        >用例</el-button
      >
    </template>
  </pm-table>
</template>

<script>
import PmTable from '@/components/common/pm-table.vue';
import PmRemoteSelect from '@/components/common/pm-remote-select.vue';
import PmRemoteSearch from '@/components/common/pm-remote-search.vue';
import { PRIORITY } from '@/constants/common/config';
import { dateRangeShow, filterEnumsLabel, transArrs } from '@/utils/common';
import { SORT_CONFIG } from '@/constants/common/requirement-list';
import { DEMAND_STATUS_URL, ALL_USER_URL, DEMAND_ASSIGN_URL } from '@/services/common-config';

export default {
  components: {
    PmTable,
    PmRemoteSelect,
    PmRemoteSearch
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
    },
    isPopover: {
      type: Boolean,
      default: false
    },
    isProjectModule: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      filterPriority: filterEnumsLabel(PRIORITY),
      DEMAND_STATUS_URL,
      ALL_USER_URL,
      DEMAND_ASSIGN_URL,
      assignedPerson: '',
      sorts: {}
    };
  },
  methods: {
    dateRangeShow,
    handleParseStructure(data) {
      return transArrs(data.userList, 'nickName', 'userId');
    },
    handleSort(sortObj) {
      // 排序
      const { prop, order } = sortObj;
      const orderRuleList = [SORT_CONFIG[`${prop}_${order}`]];
      this.$emit('change', { orderRuleList });
    },
    handlePageChange(val) {
      this.$emit('change', val);
    },
    handleStatusChange(val, id) {
      // 修改状态
      this.$emit('statusChange', { status: val, id });
    },
    handleAssign(val, id) {
      // 修改指派人
      this.$emit('assignChange', { assignPerson: val, id });
      this.assignedPerson = '';
    },
    handleSelectChange(val) {
      this.$emit('select', val);
    }
  }
};
</script>

<style lang="less" scoped>
.ft-blue {
  color: #409eff;
}
</style>
