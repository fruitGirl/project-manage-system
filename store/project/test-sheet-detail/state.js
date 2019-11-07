/*
 * @Description: 产品-state数据
 * @Author: moran
 * @Date: 2019-06-18 12:22:31
 * @Last Modified by: moran
 * @Last Modified time: 2019-07-25 10:58:25
 */

const state = () => {
  return {
    testFormCasePages: [],
    paginator: {
      page: 1,
      items: 0,
      itemsPerPage: 10
    },
    testLoading: false,
    caseLoading: false,
    testFormDetail: {},
    testInfo: {},
    initBugDatas: {},
    storeExecuteUseCaseMsg: {}, // 存储执行的用例详情
    storeExecuteResultMsg: {}, // 存储执行的用例结果详情
    showExecuteDialog: false, // 显示执行弹窗
    expandRowKeys: [], // 执行用例结果的列表展开项
    showExecuteResultDialog: false, // 显示执行结果弹窗
    showBugDialog: false, // 显示剩余未关闭bug弹窗
    bugList: []
  };
};

export default state;
