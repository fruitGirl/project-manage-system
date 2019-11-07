import { post } from '@/utils/request';

export default {
  getOperationLogApi: payload => post('/system/operationLogQuery', payload),
  getSelectionOptionsApi: payload => post('/home/pageOptionsParamInit', payload)
};
