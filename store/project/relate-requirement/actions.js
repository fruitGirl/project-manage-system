import { dateRangeShow } from '@/utils/common';
import services from '@/services/project/relate-requirement';

export default {
  // 需求列表
  async getDemandPage({ commit }, payload) {
    try {
      commit({ type: 'setLoading', payload: true });
      const data = await services.projectDemandPageQueryApi(payload);
      const { queryResult = [] } = data;
      const { list = [], paginator = {} } = queryResult;
      const comLine = list.map(res => {
        return {
          ...res,
          statusName: res.status.message,
          gmtEstimateStart: dateRangeShow(
            res.shortGmtEstimateStart,
            res.shortGmtEstimateEnd
          )
        };
      });
      commit({
        type: 'setDemandPage',
        payload: {
          list: comLine,
          paginator
        }
      });
    } catch (err) {
      this.$showErrorMessage(err);
    } finally {
      commit({ type: 'setLoading', payload: false });
    }
  },

  // 关联需求
  async projectDemandLinkBatch({ commit }, payload) {
    try {
      commit({ type: 'setLoading', payload: true });
      await services.projectDemandLinkBatchApi(payload);
      this.$showSuccessMessage('关联需求成功');
      this.$PMRouter.push('/project/requirement-list');
    } catch (err) {
      this.$showErrorMessage(err);
    } finally {
      commit({ type: 'setLoading', payload: false });
    }
  }
};
