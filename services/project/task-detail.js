import { post } from '@/utils/request';

export default {
  taskDetailApi: payload => {
    return post('/project/taskDetailQuery', payload);
  },

  // 暂停任务
  pauseTaskApi: payload => {
    return post('/project/pauseTask', payload);
  },

  // 终止任务
  terminationTaskApi: payload => {
    return post('/project/terminationTask', payload);
  },

  // 继续任务
  continueTaskApi: payload => {
    return post('/project/continueTask', payload);
  },
};
