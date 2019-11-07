export default {
  setTestFormTestDemand(state, { payload }) {
    state.testFormTestDemand = payload;
  },
  setTestFormTestCaseQuery(state, { payload }) {
    state.testFormTestCaseLists = payload;
  },
  setTestReportDetail(state, { payload }) {
    const { testReports, testFormCaseInfos } = payload;
    state.testReports = testReports;
    state.testFormCaseInfos = testFormCaseInfos;
  },
  setTestEditorReportDetail(state, { payload }) {
    const { testReports, testFormCaseInfos } = payload;
    state.testEditorReports = testReports;
    state.testEditorFormCaseInfos = testFormCaseInfos;
  },
  setBaseLoading(state, { payload }) {
    state.baseLoading = payload;
  },
  setCaseLoading(state, { payload }) {
    state.caseLoading = payload;
  },
  setTestLoading(state, { payload }) {
    state.testLoading = payload;
  }
};
