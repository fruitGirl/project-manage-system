/*
 * @Description: 产品-首页-项目块
 * @Author: xiaojian
 * @Date: 2019-06-17 14:52:38
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-04 12:22:14
 */
<template>
  <section class="card-section">
    <div class="section-header">
      <h2 class="title">项目</h2>
      <pm-link to="/project/edit-project">
        <span class="extra"> <i class="el-icon-plus"></i> 创建项目 </span>
      </pm-link>
    </div>
    <div class="content">
      <pm-table
        :data="dataSource"
        :column="columns"
        :is-pagination="false"
        :is-operation="false"
      >
        <template v-slot:name="{ rowData }">
          <a @click="handleGoto(rowData.id)">{{ rowData.name }}</a>
        </template>
        <template v-slot:status="{ rowData }">{{
          rowData.status.message
        }}</template>
      </pm-table>
    </div>
  </section>
</template>
<script>
import pmTable from '@/components/common/pm-table.vue';
import pmLink from '@/components/common/pm-link';
import { createNamespacedHelpers } from 'vuex';
const { mapMutations: layoutMutations } = createNamespacedHelpers('layout');
export default {
  components: {
    pmTable,
    pmLink
  },
  props: {
    dataSource: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      columns: [
        {
          label: '项目',
          prop: 'name',
          show: true,
          align: 'left'
        },
        {
          label: '状态',
          prop: 'status',
          show: true
        }
      ]
    };
  },
  methods: {
    ...layoutMutations(['changeSelectedDependenceId']),
    handleGoto(id) {
      this.changeSelectedDependenceId({ payload: id });
      this.$PMRouter.push('/project/home');
    }
  }
};
</script>
