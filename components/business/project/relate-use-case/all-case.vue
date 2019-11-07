/*
 * @Description: 项目-关联用例-全部用例
 * @Author: moran
 * @Date: 2019-06-21 17:07:41
 * @Last Modified by: moran
 * @Last Modified time: 2019-08-29 18:59:53
 */
<template>
  <div v-loading="useCaseLoading">
    <div class="pm-more-filter">
      <pm-more-filter :settings="settings" @onSubmit="handleSearch" />
    </div>
    <horizontal-search
      :action="TEST_CASE_STATUS_URL"
      @change="handleSubmit"
    ></horizontal-search>
    <pm-table
      ref="multiData"
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
        <div>
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
        </div>
      </template>
    </pm-table>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import PmTable from '@/components/common/pm-table.vue';
import PmMoreFilter from '@/components/common/pm-more-filter.vue';
import HorizontalSearch from '@/components/business/project/relate-use-case/horizontal-search.vue';
import {
  COLUMN,
  SORT_CONFIG,
  ALLRELATESETTINGS
} from '@/constants/project/relate-use-case';
import { PRIORITY } from '@/constants/common/config';
import { filterEnumsLabel } from '@/utils/common';
import { TEST_CASE_STATUS_URL } from '@/services/common-config';
const { mapState, mapActions } = createNamespacedHelpers(
  'project/relate-use-case'
);

export default {
  components: {
    PmTable,
    PmMoreFilter,
    HorizontalSearch
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
      filterPriority: filterEnumsLabel(PRIORITY),
      allCaseData: {
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
      this.handleSubmit({ orderBys });
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
      this.allCaseData = {
        ...this.pagination,
        ...this.allCaseData,
        ...item,
        minGmtCreate: gmtCreate ? gmtCreate[0] : '',
        maxGmtCreate: gmtCreate ? gmtCreate[0] : ''
      };
      delete this.allCaseData.gmtCreate;
      this.handleSubmit(this.allCaseData);
    },

    // 实时查询
    handleSubmit(item) {
      this.allCaseData = { ...this.pagination, ...this.allCaseData, ...item };
      this.getTestCasePage(this.allCaseData);
      // this.params.testCaseIds = [];
      // if (this.$refs.multiData) this.$refs.multiData.clearSelection();
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
