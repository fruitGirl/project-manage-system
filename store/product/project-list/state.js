/*
 * @Description: 产品-state数据
 * @Author: moran
 * @Date: 2019-06-18 12:22:31
 * @Last Modified by: moran
 * @Last Modified time: 2019-07-11 17:10:28
 */

const state = () => {
  return {
    projectPageLists: [],
    paginator: {
      page: 1,
      items: 0,
      itemsPerPage: 10
    },
    loading: false
  };
};

export default state;
