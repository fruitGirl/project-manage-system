/*
 * @Description: 项目-测试报告数据
 * @Author: moran
 * @Date: 2019-06-18 12:22:31
 * @Last Modified by: moran
 * @Last Modified time: 2019-07-25 14:53:26
 */

const state = () => {
  return {
    testReportPage: [],
    paginator: {
      page: 1,
      items: 0,
      itemsPerPage: 10
    },
    loading: false,
    showBugDialog: false, // 显示剩余未关闭bug弹窗
    bugList: []
  };
};

export default state;
