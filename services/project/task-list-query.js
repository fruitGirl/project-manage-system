import { post } from '@/utils/request';

export default {
  // 任务列表
  taskListQueryApi: payload => {
    return post('/project/taskPageQuery', payload);
  },

  // 任务创建
  taskCreateApi: payload => {
    return post('/project/taskCreate', payload);
  },

  // 任务编辑
  taskModifyApi: payload => {
    return post('/project/taskModify', payload);
  },

  // 开始任务
  startTaskApi: payload => {
    return post('/project/taskStart', payload);
  },

  // 暂停任务
  pauseTaskApi: payload => {
    return post('/project/taskPause', payload);
  },

  // 完成任务
  finishTaskApi: payload => {
    return post('/project/taskFinish', payload);
  },

  taskDetailApi: payload => {
    return post('/project/taskDetailQuery', payload);
  },

  // 终止任务
  terminationTaskApi: payload => {
    return post('/project/taskTermination', payload);
  },

  // 继续任务
  continueTaskApi: payload => {
    return post('/project/taskContinue', payload);
  },

  // 删除任务
  deleteTaskApi: payload => {
    return post('/project/taskDelete', payload);
  }
};
