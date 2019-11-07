import services from '@/services/test/use-case-list';
import cloneDeep from 'lodash.clonedeep';
import {
  changeSortNumber,
  STEP_DESCRIBE,
  TEXT_DESCRIBE
} from '@/constants/test/use-case-list';
import { USE_CASE_RESULT_PASS_TYPE } from '@/constants/common/use-case';
import bugListServices from '@/services/project/bug-list';
import testSheetServices from '@/services/project/test-sheet-detail';
import { PRIORITY } from '@/constants/common/config';
import { filterEnumsLabel } from '@/utils/common';
import { getOperationLogApi } from '@/services/common-config';

export default {
  // 查询用例列表
  async handleSubmit({ commit, state }, payload) {
    try {
      await commit({ type: 'setTableLoading', payload: true });
      const { savedSearchVals } = state;
      const searchParams = {
        ...savedSearchVals,
        currentPage: 1,
        ...payload
      };
      const data = await services.getListApi(searchParams);
      const { queryResult = {} } = data;
      const { list = [], paginator = {} } = queryResult;
      const combineList = list.map(i => {
        const { automation, userId, automationStatus } = i;
        const automationName = automation ? automationStatus.message : '手动';
        return {
          ...i,
          automationName,
          handleManage: userId // 执行人
        };
      });

      commit({
        type: 'updateSearchListResult',
        payload: {
          list: combineList,
          paginator,
          savedSearchVals: cloneDeep(searchParams)
        }
      });
      commit({
        type: 'changeSelections',
        payload: []
      });
    } catch (err) {
      this.$showErrorMessage(err);
    } finally {
      await commit({ type: 'setTableLoading', payload: false });
    }
  },

  // 保存用例
  async saveUseCase({ dispatch, commit, state }, payload) {
    try {
      const { storeEditUseCaseMsg } = state;
      const { id } = storeEditUseCaseMsg || {};
      const { isAgainAdd } = payload;
      delete payload.isAgainAdd;
      if (id) {
        await services.editUseCaseApi({ id, ...payload });
      } else {
        await services.createUseCaseApi(payload);
      }
      this.$showSuccessMessage('保存成功');

      // 非保存并新增下一个模式
      if (!isAgainAdd) {
        await commit({ type: 'displayUseCaseDrawer', payload: false });
      }
      await commit({ type: 'setEditUseCaseMsg', payload: {} });
      await dispatch('handleSubmit');
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 获取用例详情
  async getUseCaseMsg({ dispatch, commit, state }, payload) {
    try {
      await commit({ type: 'displayUseCaseDrawer', payload: true });
      const data = await services.getUseCaseMsgApi(payload);
      const { testCase = {} } = data;
      let { attachmentList } = data;
      let { describeType, type, testCaseSteps = [] } = testCase;
      testCaseSteps = testCaseSteps || [];
      describeType = describeType.name;
      type = type.name;

      attachmentList = attachmentList.map(i => {
        return {
          ...i,
          name: i.fileName
        };
      });

      // 重组用例描述
      if (describeType === STEP_DESCRIBE) {
        testCaseSteps = testCaseSteps.map((i, index) => {
          const parentKey = Date.now() + '_parent_' + index;
          let testCaseStepList = i.testCaseStepList || [];

          // 重组子用例
          testCaseStepList = testCaseStepList.map((j, jIndex) => {
            return {
              ...j,
              parentKey,
              key: parentKey + '_child' + jIndex,
              isChild: true
            };
          });

          // 重组父用例
          return {
            ...i,
            key: parentKey,
            hasChild: false,
            testCaseStepList: testCaseStepList || null
          };
        });

        testCaseSteps = changeSortNumber(testCaseSteps);
      }

      // 是否存在文本描述
      const isTextDescribe = describeType === TEXT_DESCRIBE && testCaseSteps[0];

      await commit({
        type: 'setEditUseCaseMsg',
        payload: {
          ...testCase,
          describeType,
          type,
          fileNameList: attachmentList, // 文件集合
          testCaseSteps: describeType === STEP_DESCRIBE ? testCaseSteps : [], // 测试用例集合
          textDescribe: isTextDescribe ? testCaseSteps[0].textDescribe : '', // 文本描述
          textDescribeId: isTextDescribe ? testCaseSteps[0].id : undefined, // 测试用例id
          textDescribeStepId: isTextDescribe
            ? testCaseSteps[0].testCaseId
            : undefined // 测试用例步骤id
        }
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 复制测试用例
  async handleCopyUseCaseMsg({ dispatch, commit, state }, payload) {
    try {
      await commit({ type: 'displayUseCaseDrawer', payload: true });
      const data = await services.getUseCaseMsgApi(payload);
      const { testCase = {} } = data;
      let { attachmentList } = data;
      let { describeType, type, testCaseSteps = [] } = testCase;
      testCaseSteps = testCaseSteps || [];
      describeType = describeType.name;
      type = type.name;

      attachmentList = attachmentList.map(i => {
        const { fileName } = i;
        return {
          fileName,
          name: fileName
        };
      });

      // 重组用例描述
      if (describeType === STEP_DESCRIBE) {
        testCaseSteps = testCaseSteps.map((i, index) => {
          const parentKey = Date.now() + '_parent_' + index;
          let testCaseStepList = i.testCaseStepList || [];

          // 重组子用例
          testCaseStepList = testCaseStepList.map((j, jIndex) => {
            return {
              stepDescribe: j.stepDescribe,
              textDescribe: j.stepDescribe,
              expectedResult: j.expectedResult,
              parentKey,
              key: parentKey + '_child' + jIndex,
              isChild: true
            };
          });

          // 重组父用例
          return {
            stepDescribe: i.stepDescribe,
            textDescribe: i.stepDescribe,
            expectedResult: i.expectedResult,
            key: parentKey,
            hasChild: false,
            testCaseStepList: testCaseStepList || null
          };
        });

        testCaseSteps = changeSortNumber(testCaseSteps);
      }

      // 是否存在文本描述
      const isTextDescribe = describeType === TEXT_DESCRIBE && testCaseSteps[0];

      delete testCase.id;
      await commit({
        type: 'setEditUseCaseMsg',
        payload: {
          ...testCase,
          describeType,
          type,
          fileNameList: attachmentList, // 文件集合
          testCaseSteps: describeType === STEP_DESCRIBE ? testCaseSteps : [], // 测试用例集合
          textDescribe: isTextDescribe ? testCaseSteps[0].textDescribe : '' // 文本描述
        }
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 执行测试用例
  async executeUseCase({ dispatch, commit, state }, payload) {
    try {
      await commit({ type: 'displayExecuteDialog', payload: true });
      await dispatch('getExecuteResult', payload);
      const data = await services.getUseCaseMsgApi(payload);
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
      const { executeSourceId } = payload;
      const params = {
        ...payload,
        testCaseId: executeSourceId,
        executeSourceType: 'TEST_CASE' // 执行来源
      };
      await services.createExecuteResultApi(params);
      this.$showSuccessMessage('保存成功');
      await dispatch('getExecuteResult', { testCaseId: executeSourceId });

      // 用例列表页面
      if (window.location.href.indexOf('use-case-list') !== -1) {
        await dispatch('handleSubmit');
      } else if (window.location.href.indexOf('use-case-detail') !== -1) {
        // 用例详情页
        await dispatch('test/use-case-detail/getOperateHistory', null, {
          root: true
        });
      }
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 获取执行结果
  async getExecuteResult({ dispatch, commit, state }, payload) {
    try {
      const data = await services.getExecuteResultApi({
        ...payload,
        sourceTypeEnum: 'TEST_CASE'
      });
      await commit({ type: 'setExecuteResultMsg', payload: data });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 获取结果，并且显示结果弹窗
  async getExecuteResultAndShowDialog({ dispatch, commit, state }, payload) {
    try {
      await dispatch('getExecuteResult', payload);
      await commit({ type: 'displayResultDialog', payload: true });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 获取执行结果的详情
  async getExecuteDetailResult({ dispatch, commit, state }, payload) {
    try {
      const data = await services.getExecuteDetailResultApi(payload);
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

  // 转bug
  async transferBug({ dispatch, commit, state }, payload) {
    try {
      const data = await testSheetServices.initTestCaseBugApi(payload);
      const { demand = {}, module = {}, product = {}, testCase = {} } = data;
      const bugForms = {
        productId: product.id,
        moduleId: module.id,
        demandId: demand.id,
        testCaseId: testCase.id
      };
      await commit({ type: 'storeTestCaseBugs', payload: bugForms });
      await commit({ type: 'displayBugDrawer', payload: true });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 创建bug
  async createBug({ dispatch, commit, state }, payload) {
    await bugListServices.bugCreateApi(payload);
    await commit({ type: 'displayBugDrawer', payload: false });
    await dispatch('handleSubmit');
  },

  // 获取bug列表
  async getBugsList({ dispatch, commit, state }, payload) {
    const { bugs = [] } = await services.getBugListApi(
      payload
    );
    const combineList = bugs.map(i => {
      return {
        ...i,
        assignedPerson: i.assignedPerson || '-'
      };
    });

    await commit({ type: 'storeBugList', payload: combineList });
    await commit({ type: 'displayBugDialog', payload: true });
  },

  // 获取用例的详情页信息
  async getUseCaseDetailInfo({ commit }, payload) {
    try {
      const data = await services.getUseCaseMsgApi(payload);
      const {
        testCase = {},
        module = {},
        user = {},
        product = {},
        bugs = [],
        demand
      } = data;
      const { attachmentList = [] } = data;
      let { describeType = {}, type, priority, testCaseSteps = [] } = testCase;
      const { gmtCreate, title, precondition, id, result = {}, automation, automationStatus = {}, developer } = testCase;
      priority = filterEnumsLabel(PRIORITY)(priority);
      describeType = describeType.message;
      type = type.name;
      const moduleName = module.name;
      const productName = product.name;
      const { nickName } = user;
      testCaseSteps = changeSortNumber(testCaseSteps);
      testCase.testCaseSteps = testCaseSteps;
      testCase.result = result.message;
      commit({
        type: 'setUseCaseDetailMsg',
        payload: {
          id,
          attachmentList,
          type,
          describeType,
          testCase,
          title,
          precondition,
          moduleName,
          productName,
          nickName,
          priority,
          gmtCreate,
          bugs,
          bugNum: bugs.length,
          automation,
          automationStatus: automationStatus.message,
          developer,
          requirement: demand ? [demand] : []
        }
      });
    } catch (err) {
      console.log('err=', err);
      this.$showErrorMessage(err);
    }
  },

  // 获取操作历史
  async getOperateHistory({ commit }, payload) {
    try {
      const params = {
        operateObjectType: 'TEST_CASE',
        operateObjectId: payload.testCaseId
      };
      const data = await getOperationLogApi(params);
      const { operationLogList = [] } = data;
      const operateHistory = operationLogList.map(item => {
        return {
          content: `${item.operator}  ${item.actionType.message}`,
          time: item.gmtCreate,
          memos: [item.memo]
        };
      });
      commit({ type: 'storeOperateHistory', payload: operateHistory });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },
};
