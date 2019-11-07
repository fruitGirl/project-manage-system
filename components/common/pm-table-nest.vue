/*
 * @Description: 可展开表格
 * @Author: moran
 * @Date: 2019-06-25 16:05:29
 * @Last Modified by: danding
 * @Last Modified time: 2019-07-18 20:04:09
 */
<template>
  <div class="pm-table-nest">
    <el-table
    :data="tableList"
    default-expand-all
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table :data="props.row.expandData">
            <template v-for="(item, index) in cellColumn">
              <el-table-column
              :key="index"
              :label="item.label"
              :prop="item.prop"
              :width="item.width">
              </el-table-column>
            </template>
            <el-table-column v-if="isColumnOperation" label="附件">
              <template slot-scope="operationScope">
                <!-- 自定义操作模板列 -->
                <slot name="expandOperantion" :rowData="operationScope.row">
                </slot>
              </template>
            </el-table-column>
          </el-table>
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
          :type="item.type"
        >
          <template slot-scope="itemScope">
            <slot :name="item.prop" :rowData="itemScope.row"/>
          </template>
        </el-table-column>
        <el-table-column
        v-else
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :width="item.width">
        </el-table-column>
      </template>
      <el-table-column v-if="isOperation" fixed="right" label="操作" :min-width="operationWidth">
        <template slot-scope="operationScope">
          <!-- 自定义操作模板列 -->
          <slot name="operation" :rowData="operationScope.row">
          </slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    column: { // 正常列header
      type: Array,
      default: () => []
    },
    cellColumn:  { // 伸缩列header
      type: Array,
      default: () => []
    },
    list: { // 源数据
      type: String,
      default: '[]'
    },
    isOperation: {
      // 是否需要操作列
      type: Boolean,
      default: true
    },
     operationWidth: {
      // 操作列的宽度
      type: Number,
      default: 100
    },
    isColumnOperation: {
      // 是否需要操作列
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
    };
  },
  computed: {
    tableList() {
      return JSON.parse(this.list);
    }
  }
};
</script>

<style scoped lang="less">
@deep: ~'>>>';
.pm-table-nest {
  @{deep} .el-table thead th {
    background: #F9F9F9
  }
}

</style>


