/*
 * @Description: 项目主页
 * @Author: danding
 * @Date: 2019-06-24 14:24:02
 * @Last Modified by: moran
 * @Last Modified time: 2019-10-30 19:07:10
 */

<template>
  <div class="page-transparent-container">
    <project-header
      :project-id="projectId"
      :project-data="projectData"
      @operate-success="handleBtnOperateSuccess"
    />
    <el-row :gutter="16">
      <el-col :span="8">
        <task-info :data="taskStatusNumMap" />
      </el-col>
      <el-col :span="8">
        <bug-info :data="bugStatusNumMap" />
      </el-col>
      <el-col :span="8">
        <test-report :data="testReportList" />
      </el-col>
    </el-row>
    <task-table
      :project-id="projectId"
      :project-name="dependenceProjectName"
      :table-data="taskTableData"
      @refresh="handleBtnOperateSuccess"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import Header from '@/components/business/project/home/header.vue';
import TaskInfo from '@/components/business/project/home/task-info.vue';
import BugInfo from '@/components/business/project/home/bug-info.vue';
import TestReport from '@/components/business/project/home/test-report.vue';
import TaskTable from '@/components/business/project/home/task-table.vue';

const { mapActions, mapState } = createNamespacedHelpers('project/home');
const { mapGetters } = createNamespacedHelpers('layout');

function subDays(start, end) {
  const actualStart = new Date(start);
  const actualEnd = new Date(end);
  const startTime = new Date(
    `${actualStart.getFullYear()}/${actualStart.getMonth() +
      1}/${actualStart.getDate()}`
  ).getTime();
  const endTime = new Date(
    `${actualEnd.getFullYear()}/${actualEnd.getMonth() +
      1}/${actualEnd.getDate()}`
  ).getTime();
  if (startTime > endTime) {
    return 0;
  }
  if (startTime === endTime) {
    return 1;
  }
  const sub = endTime - startTime;
  let days = sub / (60 * 60 * 24 * 1000);
  if (endTime < actualEnd.getTime()) {
    days++;
  }
  return days;
}
export default {
  head() {
    return {
      title: `项目主页`
    };
  },
  components: {
    ProjectHeader: Header,
    TaskInfo,
    BugInfo,
    TestReport,
    TaskTable
  },
  data() {
    return {
      projectId: ''
    };
  },
  computed: {
    ...mapState([
      'bugStatusNumMap',
      'taskTypeAndDetailList',
      'taskStatusNumMap',
      'testReportList',
      'statusList',
      'taskList',
      'projectData',
    ]),
    ...mapGetters(['dependenceProjectName']),
    taskTableData() {
      const table = [];
      const {
        gmtEstimateStart,
        gmtEstimateEnd,
        gmtActualStart,
        name,
        status,
        id,
        // projectManager,
        systemTime,
        shortGmtActualStart = '-',
        gmtActualEnd
      } = this.projectData;
      const totalDays = subDays(gmtEstimateStart, gmtEstimateEnd) || '-';
      let remainDays = '-';
      if(gmtActualStart && systemTime) {
        remainDays =
          totalDays - subDays(gmtEstimateStart, new Date(systemTime).toString()) ||
          '-';
      }

      // 已结束
      if (status && (status.name === 'FINISHED')) {
        remainDays = 0;
      }

      table.push({
        name,
        status: status && status.message,
        days: totalDays,
        gmtEstimateStart,
        gmtEstimateEnd,
        shortGmtActualStart,
        remainDays,
        gmtActualStart: gmtActualStart || '-',
        id: 'project' + id,
        hasChildren: false,
        gmtActualEnd,
        // assignedPersonName: this.userIdAndNickNameMap[projectManager],
        disabledDeepBuleBlock: (status && status.name) === 'TERMINATED'
      });

      if (table[0].gmtActualStart && !table[0].gmtActualEnd) {
        table[0].gmtActualEnd = new Date(systemTime).toString();
      }

      this.taskList.forEach(i => {
        const { taskList = [], taskTypeMessage } = i;
        const children = taskList.map(i => {
            if (i.gmtActualStart && !i.gmtActualEnd) {
              i.gmtActualEnd = new Date(systemTime).toString();
            }
            i.assignedPersonName = i.assignedPerson;
            return i;
        });
        const item = {
          id: taskTypeMessage,
          name: taskTypeMessage,
          children
        };
        table.push(item);
      });

      // this.taskTypeAndDetailList.forEach(item => {
      //   const key = item.key;
      //   const cn = this.transStatus[key];
      //   const value = item.value;
      //   const data = {
      //     name: cn,
      //     id: key
      //   };
      //   if (value.length) {
      //     data.children = value.map(item => {
      //       if (item.gmtActualStart && !item.gmtActualEnd) {
      //         item.gmtActualEnd = new Date(systemTime).toString();
      //       }
      //       item.assignedPersonName = this.userIdAndNickNameMap[item.assignedPerson];
      //       return item;
      //     });
      //   }
      //   table.push(data);
      // });
      return table;
    },
    transStatus() {
      const result = {};
      for (const key in this.statusList) {
        result[this.statusList[key]] = key;
      }
      return result;
    }
  },
  created() {
    if (process.client) {
      const {
        query: { dependenceId }
      } = this.$route;
      this.projectId = dependenceId;
      this.getProjectHomeData({ projectId: dependenceId });
    }
  },
  methods: {
    ...mapActions(['getProjectHomeData']),
    handleBtnOperateSuccess() {
      this.getProjectHomeData({ projectId: this.projectId });
    }
  }
};
</script>

<style lang="less" scoped></style>
