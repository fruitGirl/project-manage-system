/*
 * @Description: 项目主页-任务列表
 * @Author: danding
 * @Date: 2019-06-24 15:45:53
 * @Last Modified by: moran
 * @Last Modified time: 2019-08-01 15:14:12
 */

<template>
  <div class="project-table-wrapper">
    <div class="pm-flex pm-flex-between">
      <el-button class="btn-blue" type="primary">+ 建任务</el-button>
      <div>
        <span class="tip">
          <span class="time-tip count-time-tip"></span>
          <span>预计起止时间</span>
        </span>
        <pm-separate :is-vertical="false" size="30" />
        <span class="tip">
          <span class="time-tip current-time-tip"></span>
          <span>当前时间进度</span>
        </span>
      </div>
    </div>
    <pm-separate size="15" />
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column
        v-for="column in columns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import PmSeparate from '@/components/common/pm-separate';
import { TABLE_COLUMNS } from '@/constants/project';

export default {
  components: {
    PmSeparate,
  },
  data() {
      return {
        columns: TABLE_COLUMNS,
        tableData: []
      };
    },
};
</script>

<style lang="less" scoped>
  .project-table-wrapper {
    padding: 15px 15px 20px;
    margin-bottom: 15px;
    background: #fff;
    border-radius: 3px;
    .tip {
      color: #909399;
      font-size: 12px;
      font-weight: bold;
      .time-tip {
        display: inline-block;
        width: 21px;
        height: 8px;
        margin-right: 5px;
      }
      .count-time-tip {
        background: rgba(233,241,255,1);
      }
      .current-time-tip {
        background: rgba(22,135,217,1);
      }
    }
  }
</style>
