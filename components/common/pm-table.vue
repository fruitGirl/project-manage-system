/*
 * @Description: 表格查询组件
 * @Author: moran
 * @Date: 2019-06-18 12:17:20
 * @Last Modified by: moran
 * @Last Modified time: 2019-08-27 18:30:35
 */
<template>
  <div class="pm-table">
    <el-table
      ref="multipleTable"
      v-loading="loading"
      :data="data"
      :border="border"
      :default-expand-all="expand"
      size="medium"
      :row-key="rowKey"
      :default-sort="defaultSort"
      :tree-props="{ children: childrenField }"
      :show-header="showHeader"
      :stripe="stripe"
      :expand-row-keys="expandRowKeys"
      @sort-change="handleSort"
      @selection-change="handleSelectionChange"
      @expand-change="expandChange"
    >
      <el-table-column
        v-if="isSelect"
        reserve-selection
        type="selection"
        width="55"
      ></el-table-column>

      <el-table-column v-if="showExpand" type="expand" :align="align">
        <template slot-scope="itemScope">
          <slot name="expand" :rowData="itemScope.row"></slot>
        </template>
      </el-table-column>

      <template v-for="(item, index) in column">
        <!-- 自定义模板列 -->
        <el-table-column
          v-if="item.show"
          :key="index"
          :label="item.label"
          :width="item.width || ''"
          :min-width="item.minWidth || ''"
          :sortable="item.sortable"
          :type="item.type"
          :prop="item.prop"
          :align="item.align || align"
        >
          <template slot-scope="itemScope">
            <slot
              :name="item.prop"
              :rowData="itemScope.row"
              :index="itemScope.$index"
            />
          </template>
          <template v-if="item.isCustomHeader" slot="header">
            <slot :name="`${item.prop}_header`"></slot>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width || ''"
          :min-width="item.minWidth || ''"
          :sortable="item.sortable"
          :align="align"
        >
          <template v-if="item.isCustomHeader" slot="header">
            <slot :name="`${item.prop}_header`"></slot>
          </template>
        </el-table-column>
      </template>

      <el-table-column
        v-if="isOperation"
        fixed="right"
        label="操作"
        :min-width="operationWidth"
        :width="fixOperationWidth"
        :align="align"
      >
        <template slot-scope="operationScope">
          <!-- 自定义操作模板列 -->
          <slot name="operation" :rowData="operationScope.row">
            <template v-for="(item, index) in operation">
              <el-button
                :key="index"
                :type="item.type"
                :size="item.size || 'medium'"
                @click.stop="
                  handleOperation(
                    operationScope.$index,
                    operationScope.row,
                    item.id
                  )
                "
                >{{ item.label }}</el-button
              >
            </template>
          </slot>
        </template>
      </el-table-column>
      <div slot="empty" class="no-data">
        <img src="@/static/images/common/no-data.png" alt="暂无数据" />
        <div class="no-data-txt">暂无数据</div>
      </div>
    </el-table>

    <div v-if="isPagination && data.length > 0" class="pagination">
      <el-pagination
        background
        :current-page="pagination.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagination.itemsPerPage"
        layout="total, prev, pager, next, sizes, jumper"
        :total="pagination.items"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      // 表格数据源
      type: Array,
      default: () => []
    },
    column: {
      // 表格列
      type: Array,
      default: () => []
    },
    operation: {
      // 操作按钮
      type: Array,
      default: () => []
    },
    fixOperationWidth: {
      // 操作列的宽度
      type: [Number, String],
      default: ''
    },
    operationWidth: {
      // 操作列的宽度
      type: Number,
      default: 100
    },
    defaultSort: {
      // 默认排序
      type: Object,
      default: () => {}
    },
    border: {
      // 表格是否有边框
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    expand: {
      type: Boolean,
      default: true
    },
    isOperation: {
      // 是否需要操作列
      type: Boolean,
      default: true
    },
    isPagination: {
      // 是否需要分页
      type: Boolean,
      default: true
    },
    isSelect: {
      // 是否需要多选框
      type: Boolean,
      default: false
    },
    rowKey: {
      type: [Function, String],
      default: 'id'
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    pagination: {
      type: Object,
      default: () => {
        return {
          page: 1,
          itemsPerPage: 10,
          pages: 10
        };
      }
    },
    childrenField: {
      type: String,
      default: 'children'
    },
    showExpand: {
      type: Boolean,
      default: false
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    stripe: {
      type: Boolean,
      default: false
    },
    expandRowKeys: {
      type: Array,
      default: () => []
    },
    align: {
      type: String,
      default: 'center'
    }
  },
  methods: {
    handleOperation(index, row, id) {
      this.operation.forEach((item, i) => {
        if (item.id === id) {
          this.$emit(item.func, index, row);
        }
      });
    },
    handleSort(column) {
      this.$emit('sort', column);
    },
    handleCurrentChange(val) {
      this.$emit('currentChange', val);
      this.$emit('pageChange', {
        pageSize: this.pagination.itemsPerPage,
        currentPage: val
      });
    },
    handleSizeChange(val) {
      this.$emit('pageChange', {
        currentPage: this.pagination.page,
        pageSize: val
      });
      this.$emit('sizeChange', val);
    },
    handleSelectionChange(val) {
      this.$emit('selectChange', val);
      this.$emit('clearRow', this.$refs.multipleTable);
    },
    clearSelection() {
      this.$refs.multipleTable.clearSelection();
    },
    expandChange(row, param) {
      this.$emit('expandChange', row, param);
    }
  }
};
</script>

<style lang="less" scoped>
.pm-table {
  width: 99.9%;
  background: #fff;
  .no-data {
    padding: 60px;
    .no-data-txt {
      margin-top: -20px;
    }
  }
  .pagination {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
