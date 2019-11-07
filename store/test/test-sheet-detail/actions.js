import service from '@/services/project/test-sheet-detail';
import bugListServices from '@/services/project/bug-list';
import useCaseListServices from '@/services/test/use-case-list';
import {
  changeSortNumber,
  STEP_DESCRIBE,
  TEXT_DESCRIBE
} from '@/constants/test/use-case-list';
import { USE_CASE_RESULT_PASS_TYPE } from '@/constants/common/use-case';
import { dateRangeShow } from '@/utils/common';

export default {
  // 开始测试
  async startTestForm({ commit, dispatch, state }, payload) {
    try {
      await service.startTestFormApi(payload);
      // this.$showSuccessMessage('');
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 测试用例列表
  async getTestFormCasePage({ commit, dispatch, state }, payload) {
    try {
      commit({ type: 'setCaseLoading', payload: true });
      const data = await service.getTestFormCasePageApi(payload);
      const { queryResult = {} } = data;
      const { list = [], paginator = {} } = queryResult;
      const combineList = list.map(i => {
        const { automation, type, automationStatus } = i;
        const automationName = automation ? automationStatus.message : '手动';
        return {
          ...i,
          automationName,
          typeName: type.message
        };
      });
      commit({
        type: 'setTestFormCasePage',
        payload: {
          list: combineList,
          paginator
        }
      });
      // this.$showSuccessMessage('');
    } catch (err) {
      this.$showErrorMessage(err);
    } finally {
      commit({ type: 'setCaseLoading', payload: false });
    }
  },

  // 测试单详情
  async getTestFormDetail({ commit, dispatch, state }, payload) {
    try {
      await commit({ type: 'setTestLoading', payload: true });
      const data = await service.getTestFormDetailApi(payload);
      const {
        testForm = {},
        allTestCase,
        successCase,
        executedTestCaseIds,
        projectName = '-',
        moduleName = '-',
        creator = '-',
        manager = '-'
      } = data;
      const {
        gmtEstimateEnd,
        gmtEstimateStart,
        gmtActualStart,
        gmtActualEnd,
        status
      } = testForm;
      const needTestForms = {
        ...testForm,
        projectName,
        moduleName,
        creator,
        manager,
        gmtEstimate: dateRangeShow(gmtEstimateStart, gmtEstimateEnd),
        gmtActual: dateRangeShow(gmtActualStart, gmtActualEnd),
        statusCode: status.name
      };
      const testInfo = {
        successCase,
        allTestCase,
        executedTestCaseIds,
        testStatus: status.message,
        percentage: Math.round((executedTestCaseIds / allTestCase) * 100) || 0,
        passRate: Math.round((successCase / allTestCase) * 100) || 0,
      };
      commit({
        type: 'setTestFormDetail',
        payload: { needTestForms, testInfo }
      });
    } catch (err) {
      this.$showErrorMessage(err);
    } finally {
      await commit({ type: 'setTestLoading', payload: false });
    }
  },

  // 提bug
  async bugCreate({ commit, state }, payload) {
    const testCaseSourceId = state.initBugDatas.testCaseSourceId;
    await bugListServices.bugCreateApi({
      ...payload,
      testCaseSourceId,
      testCaseSourceType: 'TEST_FORM_CASE_LINK'
    });
  },

  // 批量取消关联
  async removeTestFormCase({ commit, dispatch, state }, payload) {
    try {
      await service.removeTestFormCaseApi(payload);
      this.$showSuccessMessage('批量取消关联成功');
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 提bug回填
  async initTestCaseBug({ commit, dispatch, state }, payload) {
    try {
      const { id, linkId } = payload;
      const data = await service.initTestCaseBugApi({ testCaseId: id });
      const { demand, module, product, testCase } = data;
      const bugForms = {
        productId: product ? product.id : undefined,
        moduleId: module ? module.id : undefined,
        demandId: demand ? demand.id : undefined,
        testCaseId: testCase ? testCase.id : undefined,
        testCaseSourceId: linkId
      };
      commit({ type: 'initTestCaseBugs', payload: bugForms });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 执行测试用例
  async executeUseCase({ dispatch, commit, state }, payload) {
    try {
      const { testCaseId, linkId, testCaseSourceId } = payload;
      await commit({ type: 'displayExecuteDialog', payload: true });
      await dispatch('getExecuteResult', {
        testCaseId,
        testCaseSourceId,
        sourceTypeEnum: 'TEST_FORM_CASE_LINK'
      });
      const data = await useCaseListServices.getUseCaseMsgApi({ testCaseId });
      const { testCase = {} } = data;
      let { describeType, testCaseSteps = [] } = testCase;
      testCaseSteps = testCaseSteps || [];
      describeType = describeType.name;

      // 重组用例描述
      if (describeType === STEP_DESCRIBE) {
        // 设置默认的执行结果
        testCaseSteps = testCaseSteps.map(i => {
          let { testCaseStepList } = i;
          if (testCaseStepList) {
            testCaseStepList = testCaseStepList.map(j => {
              return {
                ...j,
                executeResult: USE_CASE_RESULT_PASS_TYPE
              };
            });
          }

          return {
            ...i,
            testCaseStepList,
            executeResult: USE_CASE_RESULT_PASS_TYPE,
            actualSituation: ''
          };
        });
        testCaseSteps = changeSortNumber(testCaseSteps);
      } else if (describeType === TEXT_DESCRIBE) {
        // 文本描述
        testCaseSteps =
          testCaseSteps && testCaseSteps.length ? testCaseSteps : [{}];
        testCaseSteps = testCaseSteps.map(i => {
          return {
            ...i,
            executeResult: USE_CASE_RESULT_PASS_TYPE,
            actualSituation: ''
          };
        });
      }

      await commit({
        type: 'setExecuteUseCaseMsg',
        payload: {
          ...testCase,
          linkId,
          testCaseSteps,
          describeType
        }
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 保存执行结果
  async createExecuteResult({ dispatch, commit, state }, payload) {
    try {
      const { executeSourceId, testCaseSourceId, testFormId } = payload;
      const { linkId } = state.storeExecuteUseCaseMsg;
      const params = {
        ...payload,
        executeSourceId: linkId,
        testCaseId: executeSourceId,
        executeSourceType: 'TEST_FORM_CASE_LINK' // 执行来源
      };
      await useCaseListServices.createExecuteResultApi(params);
      this.$showSuccessMessage('保存成功');
      await dispatch('getExecuteResult', {
        testCaseId: executeSourceId,
        testCaseSourceId,
        sourceTypeEnum: 'TEST_FORM_CASE_LINK'
      });
      // 测试单详情更新数据
      await dispatch('getTestFormDetail', {
        testFormId
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 获取执行结果
  async getExecuteResult({ dispatch, commit, state }, payload) {
    try {
      const data = await useCaseListServices.getExecuteResultApi(payload);
      await commit({ type: 'setExecuteResultMsg', payload: data });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 获取结果，并且显示结果弹窗
  async getExecuteResultAndShowDialog({ dispatch, commit, state }, payload) {
    try {
      const { testCaseId, linkId, testCaseSourceId } = payload;
      await dispatch('getExecuteResult', {
        testCaseId,
        testCaseSourceId,
        sourceTypeEnum: 'TEST_FORM_CASE_LINK'
      });
      await commit({ type: 'displayResultDialog', payload: true });
      await commit({
        type: 'setExecuteUseCaseMsg',
        payload: {
          linkId
        }
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 获取执行结果的详情
  async getExecuteDetailResult({ dispatch, commit, state }, payload) {
    try {
      const data = await useCaseListServices.getExecuteDetailResultApi(payload);
      const { storeExecuteResultMsg } = state;
      const { testCaseExecuteList } = storeExecuteResultMsg || {};
      const {
        testCaseStepExeIdAndAttachListMap = {},
        testCaseStepExecuteResultList = []
      } = data;
      const expandData = testCaseStepExecuteResultList.map((i, iIdx) => {
        let childList = i.testCaseStepExecuteResultList || [];
        childList = childList.map((j, jIdx) => {
          return {
            ...j,
            number: `${iIdx + 1}-${jIdx + 1}`,
            fileList: testCaseStepExeIdAndAttachListMap[j.id]
          };
        });
        return {
          ...i,
          number: iIdx + 1,
          testCaseStepExecuteResultList: childList,
          fileList: testCaseStepExeIdAndAttachListMap[i.id]
        };
      });
      const matchIdx = testCaseExecuteList.findIndex(
        i => i.id === payload.testCaseExecuteId
      );
      testCaseExecuteList[matchIdx].expandData = expandData;
      await commit({
        type: 'setExpandRowKeys',
        payload: [testCaseExecuteList[matchIdx].id]
      });
      await commit({
        type: 'setExecuteResultMsg',
        payload: {
          ...storeExecuteResultMsg,
          testCaseExecuteList
        }
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 获取bug列表
  async getBugsList({ dispatch, commit, state }, payload) {
    const {
      bugs = []
    } = await service.getBugQueryBySourceApi(payload);
    const combineList = bugs.map(i => {
      return {
        ...i,
        assignedPerson: i.assignedPerson || '-'
      };
    });

    await commit({ type: 'storeBugList', payload: combineList });
    await commit({ type: 'displayBugDialog', payload: true });
  }
};
