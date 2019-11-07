/*
 * @Description: 产品-项目列表查询页
 * @Author: moran
 * @Date: 2019-06-18 12:23:26
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 15:44:44
 */

<template>
  <div v-loading="loading" class="page-container product-project-list">
    <div class="more-filter">
      <pm-more-filter
        :settings="settings"
        :label-width="100"
        @onSubmit="handleSearch"
      />
    </div>
    <real-time-search
      :action="PROJECT_STATUS_URL"
      @change="handleSumbit"
    ></real-time-search>
    <pm-table
      :data="projectPageLists"
      :column="column"
      :default-sort="sorts"
      :pagination="paginator"
      :is-operation="false"
      @pageChange="handlePageChange"
      @sort="handleSort"
    >
      <template v-slot:priority="{ rowData }">
        {{ filterPriority(rowData.priority) }}
      </template>
      <template v-slot:name="{ rowData }">
        <pm-link :to="`/project/home?dependenceId=${rowData.id}`">{{rowData.name}}</pm-link>
      </template>
    </pm-table>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import PmTable from '@/components/common/pm-table.vue';
import PmMoreFilter from '@/components/common/pm-more-filter.vue';
import RealTimeSearch from '@/components/business/project/test-sheet-list/real-time-search.vue';
import {
  SETTINGS,
  COLUMN,
  SORT_CONFIG
} from '@/constants/product/product-project-list';
import { PROJECT_STATUS_URL } from '@/services/common-config';
import { PRIORITY } from '@/constants/common/config';
import { filterEnumsLabel } from '@/utils/common';

const { mapState, mapActions } = createNamespacedHelpers(
  'product/project-list'
);

export default {
  head: {
    title: '项目'
  },
  components: {
    PmTable,
    PmMoreFilter,
    RealTimeSearch
  },
  isKeepAlive: true,
  data() {
    return {
      column: COLUMN,
      settings: SETTINGS,
      sorts: {},
      PROJECT_STATUS_URL,
      filterPriority: filterEnumsLabel(PRIORITY),
      projectFormData: {
        // 默认查询数据
        productId: this.$route.query.dependenceId,
        status: null,
        myRelated: false,
        myCreated: false,
        priorities: [1, 2, 3, 4]
      },
      pagination: {
        currentPage: 1,
        pageSize: 10
      }
    };
  },
  computed: {
    ...mapState(['projectPageLists', 'paginator', 'loading'])
  },
  activated() {
    this.handleSumbit({ currentPage: this.paginator.page });
  },
  methods: {
    ...mapActions(['getProductProjectPageQuery']),

    // 更多筛选
    handleSearch(val) {
      const {
        name,
        creator,
        manager,
        gmtCreate,
        gmtEstimateStart,
        gmtActualStart,
        gmtEstimateEnd,
        gmtActualEnd,
        priorities
      } = val;
      Object.assign(this.projectFormData, this.pagination, {
        name,
        creator,
        manager,
        minGmtCreate: (gmtCreate && gmtCreate[0]) || undefined,
        maxGmtCreate: (gmtCreate && gmtCreate[1]) || undefined,
        minGmtEstimateStart:
          (gmtEstimateStart && gmtEstimateStart[0]) || undefined,
        maxGmtEstimateStart:
          (gmtEstimateStart && gmtEstimateStart[1]) || undefined,
        minGmtActualStart: (gmtActualStart && gmtActualStart[0]) || undefined,
        maxGmtActualStart: (gmtActualStart && gmtActualStart[1]) || undefined,
        minGmtEstimateEnd: (gmtEstimateEnd && gmtEstimateEnd[0]) || undefined, // 截至于
        maxGmtEstimateEnd: (gmtEstimateEnd && gmtEstimateEnd[1]) || undefined,
        minGmtActualEnd: (gmtActualEnd && gmtActualEnd[0]) || undefined, // 完成于
        maxGmtActualEnd: (gmtActualEnd && gmtActualEnd[1]) || undefined,
        priorities
      });
      this.getProductProjectPageQuery(this.projectFormData);
    },

    // 页面查询
    handleSumbit(val) {
      Object.assign(this.projectFormData, this.pagination, val);
      this.getProductProjectPageQuery(this.projectFormData);
    },

    // 翻页
    handlePageChange(val) {
      this.getProductProjectPageQuery({
        ...this.projectFormData,
        ...this.pagination,
        ...val
      });
    },

    // 排序
    handleSort(sortObj) {
      const { prop, order } = sortObj;
      const orderBys = SORT_CONFIG[`${prop}_${order}`];
      this.handleSumbit({ orderBys });
    }
  }
};
</script>

<style lang="less" scoped>
.product-project-list {
  padding: 15px;
  background-color: #fff;
  .search-form {
    float: right;
  }
  .more-filter {
    float: right;
    margin: 5px 0 0 10px;
    font-size: 14px;
  }
}
</style>
