import services from '@/services/product/requirement-detail';
import { PRIORITY } from '@/constants/common/config';
import { filterEnumsLabel, dateRangeShow } from '@/utils/common';

export default {
  // 基本信息以及附件
  async getDemandDetail({ commit, dispatch, state }, payload) {
    try {
      commit({ type: 'setLoading', payload: true });
      const data = await services.getDemandDetailApi(payload);
      const {
        attachmentList = [],
        demand = {},
        moduleName = '-',
        productName = '-',
        demandDescription
      } = data;
      const {
        title,
        status,
        source,
        priority,
        estimateHour,
        assignedPerson,
        gmtEstimateStart,
        gmtEstimateEnd
      } = demand;

      const { description = '无' } = demandDescription;

      // 详情左边 附件列表 标题以及描述信息
      const demandDescripts = {
        title,
        description,
        attachmentList
      };

      // 基本信息
      const baseInfos = {
        productName,
        moduleName,
        source: source && source.message ? source.message : '-',
        gmtEstimate: dateRangeShow(gmtEstimateStart, gmtEstimateEnd),
        assignedPersonName: assignedPerson || '-',
        statusName: status.message,
        priority: filterEnumsLabel(PRIORITY)(priority),
        estimateHour:
          estimateHour || estimateHour === 0 ? `${estimateHour}小时` : '-'
      };

      commit({
        type: 'setDemandDetail',
        payload: {
          demandDescripts,
          baseInfos
        }
      });
      commit({ type: 'setLoading', payload: false });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 关联用例
  async getDemandRelateCase({ commit, dispatch, state }, payload) {
    try {
      commit({ type: 'setRelateLoading', payload: true });
      const data = await services.getDemandRelateCaseApi(payload);
      const { testCaseList } = data;
      const transList = testCaseList.map(res => {
        return {
          ...res,
          enabledName: res.enabled ? '有效' : '无效'
        };
      });
      commit({ type: 'setDemandRelateCase', payload: transList });
      commit({ type: 'setRelateLoading', payload: false });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 关联bug
  async getDemandRelateBug({ commit, dispatch, state }, payload) {
    try {
      commit({ type: 'setRelateLoading', payload: true });
      const data = await services.getDemandRelateBugApi(payload);
      const { bugList } = data;
      commit({ type: 'setDemandRelateBug', payload: bugList });
      commit({ type: 'setRelateLoading', payload: false });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 关联任务
  async getDemandRelateTask({ commit, dispatch, state }, payload) {
    try {
      commit({ type: 'setRelateLoading', payload: true });
      const data = await services.getDemandRelateTaskApi(payload);
      const { taskList } = data;
      commit({ type: 'setDemandRelateTask', payload: taskList });
      commit({ type: 'setRelateLoading', payload: false });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  }
};
