import { post } from '@/utils/request';

export default {
  projectAppLinkQueryApi: payload => {
    return post('/project/projectAppLinkQuery', payload);
  },
  appCodeParamInitApi: payload => {
    return post('/home/appCodeParamInit', payload);
  },
  projectAppLinkModifyApi: payload => {
    return post('/project/projectAppLinkModify', payload);
  },
  projectAppLinkCreateApi: payload => {
    return post('/project/projectAppLinkCreate', payload);
  },
  projectAppLinkDeleteApi: payload => {
    return post('/project/projectAppLinkDelete', payload);
  },
  markCreateBranchApi: payload => {
    return post('/project/appLinkCutBranchStatus', payload);
  },
  markMergeBranchApi: payload => {
    return post('/project/appLinkMergeTrunkStatus', payload);
  },
  // 获取冲突文件
  getAttachmentApi: payload => {
    return post('/home/attachmentQuery', payload);
  },
};
