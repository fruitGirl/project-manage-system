/*
 * @Description: 产品-state数据
 * @Author: moran
 * @Date: 2019-06-18 12:22:31
 * @Last Modified by: moran
 * @Last Modified time: 2019-06-28 14:05:12
 */

const state = () => {
  return {
    testModifyDetail: {},
    // 表格
    data: [
      {
        id: 1,
        priority: '高',
        name: '奶茶小程序一期',
        attribute: '电商-奶茶',
        status: '1',
        progress: '10%',
        residual: '1',
        gmtEstimateEnd: '888888'
      },
      {
        id: 2,
        priority: '高',
        name: '奶茶小程序一期',
        attribute: '电商-奶茶',
        status: '1',
        progress: '10%',
        residual: '1',
        gmtEstimateEnd: '999999999999'
      }
    ]
  };
};

export default state;
