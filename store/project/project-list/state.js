/*
 * @Description: 项目列表
 * @Author: danding
 * @Date: 2019-06-18 12:22:31
 * @Last Modified by: danding
 * @Last Modified time: 2019-06-24 18:31:28
 */
import { PRIORITY } from '@/constants/common/config';

const state = () => {
  return {
    showRelateProduct: false, // 显示关联产品抽屉
    relateProductData: [], // 关联产品数据
    allProducts: [], // 所有产品数据
    curSelectedProject: {}, // 当前处理的项目信息
    curEditProject: {}, // 当前编辑的项目信息
    savedSearchVals: {
      priorities: PRIORITY.map(i => i.value)
    }, // 存储查询条件
    paginator: {
      page: 1,
      items: 0,
      itemsPerPage: 10
    },
    list: [],
    loadingTable: true, // 加载表格
    showProjectMsgDrawer: false, // 显示编辑项目抽屉
    teamMsg: {}, // 团队信息
    showTeamDrawer: false // 显示团队抽屉
  };
};

export default state;
