/*
 * @Description: 项目主页-任务列表
 * @Author: danding
 * @Date: 2019-06-24 15:45:53
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-21 17:26:04
 */

<template>
  <div class="project-table-wrapper">
    <div class="pm-flex pm-flex-between">
      <el-button class="btn-blue" type="primary" @click="taskDrawerVisible = true">+ 建任务</el-button>
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
      ref="table"
      :fit="false"
      :data="localTableData"
      class="task-table"
      row-key="id"
      border
      max-height="400px"
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      @expand-change="expandChangeHandler"
    >
      <el-table-column
        v-for="column in columns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        fixed="left"
      ></el-table-column>
      <el-table-column
        :render-header="customFieldColumn"
        class-name="time-columns"
        prop="times"
        :width="90 * allTimeColumns.length"
      >
        <template slot-scope="{ row }">
          <div v-for="(column, i) in row.times" :key="i" class="time-item">
            <div v-if="column.estimate" class="is-estimate"></div>
            <div v-if="column.actual" class="is-actual"></div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <task-drawer
      type="add"
      title="建任务"
      :project-id="projectId"
      :project-name="projectName"
      :visible.sync="taskDrawerVisible"
      @submit-success="taskDrawerSuccessHandler"
    ></task-drawer>
  </div>
</template>

<script>
import PmSeparate from '@/components/common/pm-separate';
import taskDrawer from '@/components/business/project/task-list-query/task-drawer';
import { TABLE_COLUMNS } from '@/constants/project/home';

function formatEveryDay(start, end) {
  const dateList = [];
  const startTime = start;
  const endTime = end;

  while (endTime.getTime() - startTime.getTime() >= 0) {
    const year = startTime.getFullYear();
    const month =
      startTime.getMonth() + 1 < 10
        ? '0' + (startTime.getMonth() + 1)
        : startTime.getMonth() + 1;
    const day =
      startTime.getDate().toString().length === 1
        ? '0' + startTime.getDate()
        : startTime.getDate();
    dateList.push(`${year}/${month}/${day}`);
    startTime.setDate(startTime.getDate() + 1);
  }
  return dateList;
}

// 当前时间进度是否在于其时间内
function isDateBetween(dateStr, startDateStr, endDateStr) {
  const start = new Date(startDateStr).getTime();
  const end = new Date(endDateStr).getTime();
  const date = new Date(dateStr).getTime();
  const ONE_DAY = 24 * 60 * 60 * 1000;
  return (date > (start - ONE_DAY)) && (date < end);
}

export default {
  components: {
    PmSeparate,
    taskDrawer
  },
  props: {
    projectId: {
      type: String,
      default: ''
    },
    projectName: {
      type: String,
      default: ''
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      columns: TABLE_COLUMNS,
      taskDrawerVisible: false,
      itemPerScroll: 20,
      showedItemIndex: 0,
      index: 0
    };
  },
  computed: {
    allTimeColumns() {
      return formatEveryDay(this.beginTime, this.endTime).map(item => {
        return {
          prop: item,
          date: new Date(item + ' 00:00:00'),
          label: item,
          width: 60
        };
      });
    },
    beginTime() {
      const compareList = [...this.compareList];
      const minTime = Math.min(
        ...compareList
          .reduce((arr, currentItem) => {
            arr.push(
              currentItem.gmtEstimateStart,
              currentItem.gmtActualStart,
              currentItem.gmtEstimateEnd,
              currentItem.gmtActualEnd
            );
            return arr;
          }, [])
          .map(item => {
            try {
              const date = new Date(item);
              return new Date(
                `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
              ).getTime();
            } catch (error) {
              item = null;
              return item;
            }
          })
          .filter(item => !!item)
      );
      return new Date(minTime);
    },
    endTime() {
      const compareList = [...this.compareList];
      const maxTime = Math.max(
        ...compareList
          .reduce((arr, currentItem) => {
            arr.push(
              currentItem.gmtEstimateStart,
              currentItem.gmtActualStart,
              currentItem.gmtEstimateEnd,
              currentItem.gmtActualEnd
            );
            return arr;
          }, [])
          .map(item => {
            try {
              const date = new Date(item);
              return new Date(
                `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
              ).getTime();
            } catch (error) {
              item = null;
              return item;
            }
          })
          .filter(item => !!item)
      );

      return new Date(maxTime);
    },
    compareList() {
      const compareList = [...this.tasks];
      if (this.tableData.length) {
        compareList.push(this.tableData[0]);
      }
      return compareList;
    },
    tasks() {
      const tasks = [];
      this.tableData.map(item => {
        if (item.children) {
          tasks.push(...item.children);
        }
      });
      return tasks;
    },
    localTableData() {
      return this.hasBlock([...this.tableData]);
    }
  },
  methods: {
    expandChangeHandler() {},
    customFieldColumn(h) {
      return h('span', [
        this.allTimeColumns.map(item => {
          return h('div', { class: 'time-column' }, item.prop + ' ');
        })
      ]);
    },
    taskDrawerSuccessHandler() {
      this.taskDrawerVisible = false;
      this.$emit('refresh');
    },
    hasBlock(arr) {
      return arr.map(item => {
        const {
          disabledDeepBuleBlock,
          gmtActualStart,
          gmtActualEnd,
          gmtEstimateStart,
          gmtEstimateEnd
        } = item;
        const times = this.allTimeColumns.map(col => {
          const colTime = {
            disabledDeepBuleBlock,
            gmtActualStart,
            gmtActualEnd,
            gmtEstimateStart,
            gmtEstimateEnd
          };
          colTime[col.prop] = {
            actual: false,
            estimate: false
          };
          if (colTime.gmtEstimateStart && colTime.gmtEstimateEnd) {
            if (
              isDateBetween(
                col.date,
                colTime.gmtEstimateStart,
                colTime.gmtEstimateEnd
              )
            ) {
              colTime[col.prop].estimate = true;
            }
          }
          if (
            colTime.gmtActualStart &&
            colTime.gmtActualEnd &&
            !colTime.disabledDeepBuleBlock
          ) {
            if (
              isDateBetween(
                col.date,
                colTime.gmtActualStart,
                colTime.gmtActualEnd
              )
            ) {
              colTime[col.prop].actual = true;
            }
          }
          return colTime[col.prop];
        });
        item.times = times;
        if (item.children && item.children.length) {
          item.children = this.hasBlock(item.children).map(child => {
            return {
              ...child,
              status: child.status && child.status.message
            };
          });
        }
        return item;
      });
    }
  }
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
      background: rgba(233, 241, 255, 1);
    }
    .current-time-tip {
      background: rgba(22, 135, 217, 1);
    }
  }
}
</style>

<style lang="less">
.project-table-wrapper .el-table__body-wrapper .time-item {
  position: relative;
  width: 90px;
  height: 100%;
  float: left;
  .is-estimate {
    background-color: #e9f1ff;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
    z-index: 1;
  }
  .is-actual {
    background-color: #6699ff;
    top: 8px;
    bottom: 8px;
    left: 0;
    right: 0;
    position: absolute;
    z-index: 1;
  }
  &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 1px;
    height: 100%;
    background-color: #ebeef5;
  }
}
.project-table-wrapper .el-table .time-columns {
  padding: 0;
  border-right: none;
  position: relative;
  .cell {
    position: absolute;
    top: 0;
    bottom: 0;
    padding: 0;
    > span {
      display: flex;
      height: 47px;
    }
  }
  .time-column {
    width: 90px;
    text-align: center;
    border-right: 1px solid #ebeef5;
  }
}
</style>
