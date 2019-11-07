import services from '@/services/project/task-list-query';
import { PRIORITY_MAP } from '@/constants/common/config';
import { FINISH_STATUS } from '@/constants/project/task-list-query';

export default {
  // 获取任务列表
  async getTaskList({ commit }, payload) {
    try {
      const result = await services.taskListQueryApi(payload);
      const { pageQueryResult } = result;
      const { list = [], paginator = {} } = pageQueryResult;
      commit('setTaskListData', {
        dataSource: list,
        pagination: paginator
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 终止任务
  async terminalTask({ commit }, payload) {
    await services.terminationTaskApi(payload);
  },

  // 删除任务
  async deleteTask({ commit }, payload) {
    try {
      await services.deleteTaskApi(payload);
      this.$showSuccessMessage('删除任务成功');
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 获取任务详情
  async getTaskDetail({ commit }, payload) {
    try {
      const data = await services.taskDetailApi(payload);
      const { task, project } = data;
      commit('setTaskData', {
        ...data,
        task: {
          ...task,
          priorityMessage: PRIORITY_MAP[task.priority],
          assignedPersonName: task.assignedPerson,
          statusMessage: task.status.message,
          typeMessage: task.type.message,
          projectName: project.name,
          date: (task.status.name === FINISH_STATUS)
            ? `实际 ${task.gmtActualEnd}`
            : `预计 ${task.gmtEstimateEnd}`
        }
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 继续任务
  async continueTask({ commit }, payload) {
    await services.continueTaskApi(payload);
  },

  // 中断任务
  async pauseTask({ commit }, payload) {
    await services.pauseTaskApi(payload);
  }
};
