/*
 * @Description: 产品-state数据
 * @Author: moran
 * @Date: 2019-06-18 12:22:31
 * @Last Modified by: moran
 * @Last Modified time: 2019-07-19 17:45:52
 */

const state = () => {
  return {
    testFormTestDemand: [],
    testFormTestCaseLists: [],
    testReports: {},
    testFormCaseInfos: {},
    testEditorReports: {},
    testEditorFormCaseInfos: {},
    baseLoading: false,
    caseLoading: false,
    testLoading: false
  };
};

export default state;
