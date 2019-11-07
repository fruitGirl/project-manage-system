import { post } from '@/utils/request';

export default {
  getProjectDetailApi: payload => {
    return post('/project/projectDetailQuery', payload);
  },

  startProjectApi: payload => {
    return post('/project/projectStart', payload);
  },

  terminateProjectApi: payload => {
    return post('/project/projectTerminate', payload);
  },

  finishProjectApi: payload => {
    return post('/project/projectFinish', payload);
  },

  delayProjectApi: payload => {
    return post('/project/projectDelay', payload);
  },

  continueProjectApi: payload => {
    return post('/project/projectContinue', payload);
  },

  pauseProjectApi: payload => {
    return post('/project/projectPause', payload);
  },
};
