import service from '@/services/project/test-report-detail';
import { arrTransString, dateRangeShow } from '@/utils/common';

export default {
  // // 测试范围列表
  // async getTestFormTestDemand({ commit, dispatch, state }, payload) {
  //   try {
  //     commit({ type: 'setTestLoading', payload: true });
  //     const data = await service.getTestFormTestDemandApi(payload);
  //     const { demandList = [], userIdAndNickNameMap = {} } = data;
  //     const combineList = demandList.map(i => {
  //       return {
  //         ...i,
  //         creatorName: userIdAndNickNameMap[i.creator],
  //         assignedName: userIdAndNickNameMap[i.assignedPerson]
  //       };
  //     });
  //     commit({ type: 'setTestFormTestDemand', payload: combineList });
  //     // this.$showSuccessMessage('');
  //   } catch (err) {
  //     this.$showErrorMessage(err);
  //   } finally {
  //     commit({ type: 'setTestLoading', payload: false });
  //   }
  // },

  // // 测试用例
  // async getTestFormTestCaseQuery({ commit, dispatch, state }, payload) {
  //   try {
  //     const data = await service.getTestFormTestCaseQueryApi(payload);
  //     const { testCaseInfoList = [], userIdAndNickNameMap = {} } = data;
  //     const combineList = testCaseInfoList.map(i => {
  //       return {
  //         ...i,
  //         executorName: userIdAndNickNameMap[i.executor]
  //       };
  //     });
  //     commit({ type: 'setTestFormTestCaseQuery', payload: combineList });
  //   } catch (err) {
  //     this.$showErrorMessage(err);
  //   }
  // },

  // 基本信息
  async getTestReportDetail({ commit, dispatch, state }, payload) {
    try {
      commit({ type: 'setBaseLoading', payload: true });
      const data = await service.getTestReportDetailApi(payload);
      const {
        testReport = {},
        testFormCaseInfo = {},
        projectName,
        projectVersionName,
        publisher = '-',
        manager,
        memberNickNameList
      } = data;
      const memberName = arrTransString(memberNickNameList);
      const {
        gmtEstimateEnd,
        gmtEstimateStart,
        gmtActualStart,
        gmtActualEnd
      } = testReport;
      const testReports = {
        ...testReport,
        projectName,
        projectVersionName,
        publisherName: publisher,
        memberName,
        managerName: manager || '-',
        gmtEstimate: dateRangeShow(gmtEstimateStart, gmtEstimateEnd),
        gmtActual: dateRangeShow(gmtActualStart, gmtActualEnd)
      };
      const {
        successCase,
        failCase,
        unexecutedCase,
        closedBug,
        resolvedBug,
        activatedBug
      } = testFormCaseInfo;
      const allCase = successCase + failCase + unexecutedCase || 0;
      const allBug = closedBug + resolvedBug + activatedBug || 0;
      const testFormCaseInfos = {
        ...testFormCaseInfo,
        allCase,
        passRate: Math.round((successCase / allCase) * 100)
          ? `${Math.round((successCase / allCase) * 100)}%`
          : '0%',
        allBug,
        handleRate: Math.round((closedBug / allBug) * 100)
          ? `${Math.round((closedBug / allBug) * 100)}%`
          : '0%',
        summarize: testReports.summarize,
        testFormId: testReports.testFormId
      };
      commit({
        type: 'setTestReportDetail',
        payload: {
          testReports,
          testFormCaseInfos
        }
      });
      // this.$showSuccessMessage('');
    } catch (err) {
      this.$showErrorMessage(err);
    } finally {
      commit({ type: 'setBaseLoading', payload: false });
    }
  },

  // 可编辑详情页信息获取
  async getTestEditorReportDetail({ commit, dispatch, state }, payload) {
    try {
      commit({ type: 'setBaseLoading', payload: true });
      const data = await service.getTestEditorReportDetailApi(payload);
      const {
        testForm = {},
        testFormCaseInfo = {},
        projectName,
        projectVersionName,
        publisher,
        manager,
        memberNickNameList
      } = data;
      const memberName = arrTransString(memberNickNameList);
      const {
        gmtEstimateEnd,
        gmtEstimateStart,
        gmtActualStart,
        gmtActualEnd
      } = testForm;
      const testReports = {
        ...testForm,
        projectName,
        projectVersionName,
        publisherName: publisher,
        memberName,
        managerName: manager,
        gmtEstimate: dateRangeShow(gmtEstimateStart, gmtEstimateEnd),
        gmtActual: dateRangeShow(gmtActualStart, gmtActualEnd)
      };
      const {
        successCase,
        failCase,
        unexecutedCase,
        closedBug,
        resolvedBug,
        activatedBug
      } = testFormCaseInfo;
      const allCase = successCase + failCase + unexecutedCase || 0;
      const allBug = closedBug + resolvedBug + activatedBug || 0;
      const testFormCaseInfos = {
        ...testFormCaseInfo,
        allCase,
        passRate: Math.round((successCase / allCase) * 100)
          ? `${Math.round((successCase / allCase) * 100)}%`
          : '0%',
        allBug,
        handleRate: Math.round((closedBug / allBug) * 100)
          ? `${Math.round((closedBug / allBug) * 100)}%`
          : '0%',
        summarize: testReports.summarize
      };
      commit({
        type: 'setTestEditorReportDetail',
        payload: {
          testReports,
          testFormCaseInfos
        }
      });
      // this.$showSuccessMessage('');
    } catch (err) {
      this.$showErrorMessage(err);
    } finally {
      commit({ type: 'setBaseLoading', payload: false });
    }
  },

  // 编辑
  async testReportCreate({ commit, dispatch, state }, payload) {
    try {
      await service.testReportCreateApi(payload);
      this.$showSuccessMessage('编辑成功');
      this.$PMRouter.back();
    } catch (err) {
      this.$showErrorMessage(err);
    }
  }
};
