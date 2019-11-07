/*
 * @Description: 产品-state数据
 * @Author: moran
 * @Date: 2019-06-18 12:22:31
 * @Last Modified by: moran
 * @Last Modified time: 2019-07-19 14:21:55
 */

const state = () => {
  return {
    testCasePage: [],
    paginator: {
      page: 1,
      items: 0,
      itemsPerPage: 10
    },
    useCaseLoading: false
  };
};

export default state;
