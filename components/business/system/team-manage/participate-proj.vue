/*
 * @Description: 团队项目列表组件
 * @Author: yaochen
 * @Date: 2019-06-18 18:20:19
 * @Last Modified by: yaochen
 * @Last Modified time: 2019-06-18 18:20:19
 */
<template>
  <div>
    <p class="partic-title">参与项目{{pagination.totalNum}}</p>
    <pm-table
      :data="projTableData"
      :column="column"
      :is-operation="false"
      :pagination="pagination"
      @currentChange="handleCurrentChange"
    >
      <template v-slot:projName="slotProps">
        <nuxt-link to>{{slotProps.rowData.projName}}</nuxt-link>
      </template>
    </pm-table>
  </div>
</template>

<script>
import PmTable from '@/components/common/pm-table';
export default {
  components: {
    PmTable
  },
  props: {
    teamId: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    return {
      projTableData: [
        {
          id: '1',
          projName: '项目一期',
          state: '已结束'
        }
      ],
      column: [
        {
          label: '项目名',
          prop: 'projName',
          show: true
        },
        {
          label: '状态',
          prop: 'state'
        }
      ],
      pagination: {
        pageNo: 1,
        pageSize: 10,
        totalNum: 1
      }
    };
  },
  created() {
    // 按ID查项目s
  },
  methods: {
    handleCurrentChange() {}
  }
};
</script>

<style lang="less" scoped>
.partic-title {
  padding-bottom: 10px;
}
</style>
