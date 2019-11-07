import services from '@/services/product/project-list';
import { dateRangeShow } from '@/utils/common';

export default {
  // 项目列表
  async getProductProjectPageQuery({ commit, dispatch, state }, payload) {
    try {
      commit({ type: 'setLoading', payload: true });
      const data = await services.productProjectPageQueryApi(payload);
      commit({ type: 'setLoading', payload: false });
      const { pageQueryResult = {} } = data;
      const { list = [], paginator = {} } = pageQueryResult;

      // 项目列表字段转换
      const combinLists = list.map(res => {
        const actEndTime = res.shortGmtActualEnd
          ? `实： ${res.shortGmtActualEnd || '-'} 结束`
          : '-';
        const estEndTime = res.shortGmtEstimateEnd
          ? `预：${res.shortGmtEstimateEnd || '-'} 结束`
          : '-';

        return {
          ...res,
          advanceTime: dateRangeShow(res.shortGmtEstimateStart, res.shortGmtEstimateEnd),
          realityTime: dateRangeShow(res.shortGmtActualStart, res.shortGmtActualEnd),
          statusName: res.status.message,
          projectManagerName: res.projectManager,
          endTime: res.status.name === 'FINISHED'
            ? actEndTime
            : estEndTime
        };
      });

      commit({
        type: 'getPageLists',
        payload: {
          projectPageLists: combinLists,
          paginator
        }
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  }
};
