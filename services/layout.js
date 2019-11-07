import { post } from '@/utils/request';

export default {
  // 获取顶部菜单栏数据
  getTopMenusApi: payload => {
    return post('/system/visibleTopMenuQuery', payload);
  },

  // 获取侧边栏数据
  getSideMenusApi: payload => {
    return post('/system/sideMenuQuery', payload);
  },

  // 获取侧边栏的产品数据
  getProductsApi: payload => {
    return post('/project/productQuery');
  },

  // 获取侧边栏的项目数据
  getProjectsApi: payload => {
    return post('/project/projectQuery');
  }
};
