/*
 * @Description: 项目-关联用例-按需求关联
 * @Author: moran
 * @Date: 2019-06-21 18:16:08
 * @Last Modified by: moran
 * @Last Modified time: 2019-08-29 19:00:21
 */

<template>
  <div v-loading="useCaseLoading">
    <div class="pm-more-filter">
      <pm-more-filter :settings="settings" @onSubmit="handleSearch" />
    </div>
    <other-relate-search
      :action="TEST_CASE_STATUS_URL"
      :search-action="DEMAND_NAME_URL"
      field-text="demandList"
      placeholder="请输入需求标题查询"
      @change="handleSubmit"
    ></other-relate-search>
    <pm-table
      :data="testCasePage"
      :column="column"
      :default-sort="sorts"
      :pagination="paginator"
      :is-select="true"
      :is-operation="false"
      @pageChange="handlePageChange"
      @sort="handleSort"
      @selectChange="handleSelectChange"
    >
      <template v-slot:priority="slotProps">
        {{ filterPriority(slotProps.rowData.priority) }}
      </template>
      <template v-slot:title="slotProps">
        <pm-link
          v-if="isTestModule"
          target="_blank"
          :to="`/test/use-case-detail?testCaseId=${slotProps.rowData.id}`"
          >{{ slotProps.rowData.title }}</pm-link
        >
        <pm-link
          v-else
          target="_blank"
          :to="
            `/test/use-case-detail?testCaseId=${slotProps.rowData.id}&dependenceId=${slotProps.rowData.productId}`
          "
          >{{ slotProps.rowData.title }}</pm-link
        >
      </template>
    </pm-table>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import PmTable from '@/components/common/pm-table';
import PmMoreFilter from '@/components/common/pm-more-filter';
import OtherRelateSearch from '@/components/business/project/relate-use-case/other-relate-search.vue';
import {
  COLUMN,
  SORT_CONFIG,
  ALLRELATESETTINGS
} from '@/constants/project/relate-use-case';
import { PRIORITY } from '@/constants/common/config';
import { filterEnumsLabel } from '@/utils/common';
import {
  TEST_CASE_STATUS_URL,
  DEMAND_NAME_URL
} from '@/services/common-config';
const { mapState, mapActions } = createNamespacedHelpers(
  'project/relate-use-case'
);
export default {
  components: {
    PmTable,
    PmMoreFilter,
    OtherRelateSearch
  },
  props: {
    isTestModule: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      column: COLUMN,
      settings: ALLRELATESETTINGS,
      TEST_CASE_STATUS_URL: TEST_CASE_STATUS_URL,
      DEMAND_NAME_URL: DEMAND_NAME_URL,
      filterPriority: filterEnumsLabel(PRIORITY),
      formDatas: {
        testId: this.$route.query.id,
        testType: (this.$route.query.name === '套件详情' || this.$route.query.name === '套件列表') ? 'TEST_SUITE' : 'TEST_FORM',
        status: null,
        myCreated: false,
        myExecuted: false,
        priorities: [1, 2, 3, 4]
      },
      pagination: {
        currentPage: 1,
        pageSize: 10
      },
      sorts: {},
      params: {
        testCaseIds: [],
        testFormId: this.$route.query.id
      }
    };
  },
  computed: {
    ...mapState(['testCasePage', 'paginator', 'useCaseLoading'])
  },
  created() {
    this.handleSubmit();
  },
  methods: {
    ...mapActions(['getTestCasePage']),

    // 排序
    handleSort(sortObj) {
      const { prop, order } = sortObj;
      const orderBys = [SORT_CONFIG[`${prop}_${order}`]];
      this.formDatas = { ...this.pagination, ...this.formDatas, orderBys };
      this.handleSubmit(this.formDatas);
      this.sorts = { prop, order };
    },

    // 分页查询
    handlePageChange(val) {
      this.formDatas = { ...this.formDatas, ...this.pagination, ...val };
      this.handleSubmit(this.formDatas);
    },

    // 更多筛选
    handleSearch(item) {
      const { gmtCreate } = item;
      this.formDatas = {
        ...this.pagination,
        ...this.formDatas,
        ...item,
        minGmtCreate: gmtCreate ? gmtCreate[0] : '',
        maxGmtCreate: gmtCreate ? gmtCreate[0] : '',

      };
      delete this.formDatas.gmtCreate;
      this.handleSubmit(this.formDatas);
    },

    // 实时查询
    handleSubmit(item) {
      this.formDatas = item
        ? {
            ...this.pagination,
            ...this.formDatas,
            ...item.needFileds,
            demandIds: item.demandIds,

          }
        : this.formDatas;
      this.getTestCasePage(this.formDatas);
    },

    // 选中数据
    handleSelectChange(val) {
      this.params.testCaseIds = val.map(res => {
        return res.id;
      });
      this.$emit('selectChange', this.params);
    }
  }
};
</script>
