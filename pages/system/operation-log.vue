/* 
 * @Description: 系统-操作日志 
 * @Author: yaochen 
 * @Date: 2019-06-26 16:22:04
 * @Last Modified by: moran
 * @Last Modified time: 2019-10-31 11:07:56
 */
<template>
  <div class="page-container">
    <pm-search-bar
      ref="log-search-bar"
      :settings="searchBarSetting"
      :label-width="100"
      @onSubmit="searchBarQueryHandler"
    />
    <pm-table
      ref="log_table"
      :loading="isTableLoading"
      :data="logTableData"
      :column="column"
      :expand="false"
      :operation="operation"
      :pagination="pagination"
      @showDetailHandle="showDetailHandle"
      @pageChange="pageChangeHandle"
    >
      <template v-slot:content="{ rowData }">
        <p>{{ rowData.content }}</p>
      </template>
    </pm-table>
  </div>
</template>

<script>
import PmTable from '@/components/common/pm-table';
import PmSearchBar from '@/components/common/pm-search-bar.vue';
import pageData from '@/constants/system/operation-log';
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapState } = createNamespacedHelpers(
  'system/operation-log'
);
const { mapGetters: layoutMapGetters } = createNamespacedHelpers('layout');

// 页面权限
const AUTHORITY_CODE = 'PM_OPERATE_LOG_MANAGE';

export default {
  head: {
    title: '操作日志'
  },
  components: {
    PmTable,
    PmSearchBar
  },
  data() {
    return {
      formData: [],
      searchBarSetting: pageData.searchBarSetting,
      column: pageData.column,
      operation: pageData.operation,
      isTableLoading: false
    };
  },
  computed: {
    ...mapState([
      'operationList',
      'pagination',
      'actionTypesOptions',
      'operateObjTypesOptions'
    ]),
    ...layoutMapGetters(['siderMenuAuthorityCodes']),
    // 转化接口数据
    logTableData() {
      return this.operationList.map(item => {
        return {
          id: item.id,
          operatorId: item.operatorId,
          operator: item.operator,
          actionType: item.actionType.message,
          operatObjType: item.operateObjectType.message,
          operatObjId: item.operateObjectId,
          createTime: item.gmtCreate,
          content: item.content
        };
      });
    }
  },
  watch: {
    // 根据权限判断第一次是否加载数据（泡面要求）
    siderMenuAuthorityCodes: {
      handler(val) {
        if (val && val.length >= 0 && val.includes(AUTHORITY_CODE)) {
          this.getTableDataHandler();
          Promise.all([
            this.getActionTypesOptionsApi(),
            this.getOperateObjTypesOptionsApi()
          ]).then(() => {
            this.initSelectOptions();
          });
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions([
      'getOperationLogApi',
      'getActionTypesOptionsApi',
      'getOperateObjTypesOptionsApi'
    ]),
    // 获取数据
    getTableDataHandler(data) {
      this.isTableLoading = true;
      this.getOperationLogApi(data).then(() => {
        this.isTableLoading = false;
      });
    },
    // 下拉框的数据
    initSelectOptions() {
      this.searchBarSetting[3].props.dataProvider = this.actionTypesOptions;
      this.searchBarSetting[5].props.dataProvider = this.operateObjTypesOptions;
    },
    // searchbar搜索
    searchBarQueryHandler(formData) {
      formData = this.ArrayTimeFormater(formData);
      this.formData = formData;
      this.getTableDataHandler({
        ...formData,
        currentPage: 1,
        pageSize: this.pagination.pageSize
      });
    },
    // 换字段名
    ArrayTimeFormater(formData) {
      if (formData.createTime && formData.createTime.length) {
        formData.minGmtCreate = formData.createTime[0];
        formData.maxGmtCreate = formData.createTime[1];
      } else {
        formData.minGmtCreate = null;
        formData.maxGmtCreate = null;
      }
      return formData;
    },
    // 表格列下拉
    showDetailHandle(index, row) {
      this.$refs.log_table.$refs.multipleTable.toggleRowExpansion(row);
    },
    // 翻页
    pageChangeHandle(pagination) {
      const formData = this.formData;
      this.getTableDataHandler({
        ...formData,
        ...pagination
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
>
