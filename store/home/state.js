/*
 * @Description: 产品-state数据
 * @Author: moran
 * @Date: 2019-06-18 12:22:31
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-01 18:17:40
 */

const state = () => {
  return {
    products: [], // 所有参与的产品(有效)
    projects: [], // 所有参与的项目(有效)
    taskLists: [],
    itemTabLists: [
      {
        label: '我的任务',
        name: 'first',
        showLists: []
      },
      {
        label: 'BUG',
        name: 'second',
        showLists: []
      },
      {
        label: '测试单',
        name: 'third',
        showLists: []
      }
    ],
    // 产品tab数据
    productTabLists: [
      {
        label: '待处理需求',
        name: 'unDemand',
        showLists: []
      },
      {
        label: '未指派需求',
        name: 'unAssign',
        showLists: []
      }
    ],
    productStatus: [],
    projectStatus: [],
    countParams: {},
    userName: '',
    userHomeLists: [],
    simpleInfos: [],
    showUnfinishDrawer: false // 显示未完成事项弹窗
  };
};

export default state;
