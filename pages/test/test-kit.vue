/*
 * @Description:
 * @Author: moran
 * @Date: 2019-07-31 11:21:30
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-07 11:11:49
 */
<template>
  <div v-loading="kitLoading" class="page-container">
    <el-button
      size="small"
      icon="el-icon-plus"
      class="btn-blue btn-add"
      type="primary"
      @click="$PMRouter.push('/test/editor-kit')"
      >新增套件</el-button
    >
    <pm-separate :size="30" :is-vertical="false" />
    <search-filter @search="handleSearch"></search-filter>
    <pm-table
      :data="testSuitePage"
      :column="column"
      :pagination="paginator"
      :fix-operation-width="200"
      @pageChange="handlePageChange"
      @sort="handleSort"
    >
      <template v-slot:title="{ rowData }">
        <pm-link
          :to="{
            path: '/test/kit-detail',
            query: { id: rowData.id }
          }"
          >{{ rowData.title }}</pm-link
        >
      </template>
      <template v-slot:operation="{ rowData }">
        <el-button
          type="text"
          @click="
            $PMRouter.push({
              name: 'test-relate-use-case',
              query: { id: rowData.id, name: '套件列表' },
              params: { url: '/test/test-kit' }
            })
          "
          >关联用例</el-button
        >
        <el-button
          type="text"
          @click="
            $PMRouter.push({
              path: '/test/editor-kit',
              query: { id: rowData.id }
            })
          "
          >编辑</el-button
        >
        <el-button
          v-if="rowData.enabled"
          type="text"
          @click="handleDelete(rowData.id)"
          >删除</el-button
        >
        <el-button
          v-if="!rowData.enabled"
          type="text"
          @click="handleRecover(rowData.id)"
          >恢复</el-button
        >
      </template>
    </pm-table>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import SearchFilter from '@/components/business/test/test-kit/search-filter.vue';
import PmTable from '@/components/common/pm-table.vue';
import { COLUMN, SORT_CONFIG } from '@/constants/test/test-kit';
import PmSeparate from '@/components/common/pm-separate';

const { mapActions, mapState } = createNamespacedHelpers('test/test-kit');

export default {
  head: {
    title: '套件'
  },
  isKeepAlive: true,
  components: {
    SearchFilter,
    PmTable,
    PmSeparate
  },
  data() {
    return {
      column: COLUMN,
      pagination: {
        currentPage: 1,
        pageSize: 10
      },
      formData: {}
    };
  },
  computed: {
    ...mapState(['testSuitePage', 'paginator', 'kitLoading'])
  },
  activated() {
    this.handleSearch({ currentPage: this.paginator.page });
  },
  methods: {
    ...mapActions(['getTestSuitePage', 'testSuiteModifyEnabled']),

    // 分页查询
    handlePageChange(val) {
      this.getTestSuitePage({ ...this.formData, ...this.pagination, ...val });
    },

    // 查询
    handleSearch(item) {
      this.formData = { ...this.formData, ...this.pagination, ...item };
      this.getTestSuitePage(this.formData);
    },

    // 恢复
    async handleRecover(id) {
      await this.testSuiteModifyEnabled({ id, enabled: true });
      this.$message.success('恢复成功!');
      this.handleSearch();
    },

    // 删除
    async handleDelete(id) {
      await this.testSuiteModifyEnabled({ id, enabled: false });
      this.$message.success('删除成功!');
      this.handleSearch();
    },

    // 排序
    handleSort(sortObj) {
      const { prop, order } = sortObj;
      const orderBys = [SORT_CONFIG[`${prop}_${order}`]];
      this.handleSearch({ orderBys });
    }
  }
};
</script>
