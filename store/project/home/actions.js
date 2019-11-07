import services from '@/services/project/home';
import projectSettingServices from '@/services/project/project-setting';
import { PRIORITY } from '@/constants/common/config';
import { filterEnumsLabel, arrTransString, dateRangeShow } from '@/utils/common';

export default {
  async getProjectHomeData({ commit }, payload) {
    try {
      const data = await services.getProjectHomeDataApi(payload);
      const {
        bugStatusNumMap,
        taskStatusNumMap,
        testReportList,
        project,
        statusList,
        taskList,
        systemTime,
      } = data;

      commit('getProjectHomeData', {
        bugStatusNumMap,
        taskStatusNumMap,
        testReportList,
        statusList,
        taskList,
        project: {
          ...project,
          statusCode: project.status.name,
          systemTime
        }
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 项目基本信息
  async getProjectDetail({ commit }, payload) {
    try {
      commit({ type: 'setBaseInfoLoading', payload: true });
      const data = await projectSettingServices.getProjectDetailApi(payload);
      const {
        project,
        member,
        actualHours = 0,
        estimateHours = 0,
        linkedProduct
      } = data;

      const {
        type, priority, description,
        visitType, projectManager,
        productManager, developManager,
        testManager, gmtEstimateStart,
        gmtEstimateEnd, gmtActualStart,
        gmtActualEnd, gmtExpectEnd
      } = project;

      // 关联产品数组
      const linkedProductArr = linkedProduct.map(i => {
        return i.name;
      });

      // 项目成员数组
      const memberArrs = member.map(i => {
        const { roleId, userId } = i;
        return `${roleId}-${userId}`;
      });

      // 优先级
      const priorityStr = filterEnumsLabel(PRIORITY)(priority);

      // 项目信息
      const projectInfo = {
        visitType: visitType.message || '-',
        priority: priorityStr,
        type: type.message || '-',
        description,
        linkedProducts: arrTransString(linkedProductArr)
      };

      // 起止信息
      const remainHours = estimateHours - actualHours; // 剩余工时
      const timeInfo = {
        gmtEstimate: dateRangeShow(gmtEstimateStart, gmtEstimateEnd),
        gmtActual: dateRangeShow(gmtActualStart, gmtActualEnd),
        gmtExpectEnd,
        estimateHours: `${estimateHours}小时`,
        actualHours: `${actualHours}小时`,
        remainHours: `${remainHours}小时`
      };

      // 成员字符串
      const members = arrTransString(memberArrs) || '无';

      // 负责人信息
      const managerInfo = {
        projectManager,
        productManager,
        developManager,
        testManager,
      };

      commit({
        type: 'setProjectBaseInfo',
        payload: {
          projectInfo,
          timeInfo,
          members,
          managerInfo,
          name: 'exist'
        }
      });
    } catch (err) {
      console.log('err=', err);
      this.$showErrorMessage(err);
    } finally {
      commit({ type: 'setBaseInfoLoading', payload: false });
    }
  }

};
