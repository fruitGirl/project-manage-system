import { PROJECT_SELECT_TYPE, PRODUCT_SELECT_TYPE } from '@/constants/layout';

// 存储最近一次访问的侧边栏选择的项目/产品
export const storeRecentDependenceId = (type, value) => {
  if (!value || !type) return;
  if (type === PROJECT_SELECT_TYPE) {
    localStorage.setItem('projectId', value);
  } else if (type === PRODUCT_SELECT_TYPE) {
    localStorage.setItem('productId', value);
  }
};

// 清空最近一次操作记录
export const resetRecentDependenceId = () => {
  localStorage.setItem('projectId', '');
  localStorage.setItem('productId', '');
};

// 获取最近一次访问的侧边栏选择的项目/产品
export const getRecentDependenceId = (type) => {
  if (type === PROJECT_SELECT_TYPE) {
    return localStorage.getItem('projectId');
  } else if (type === PRODUCT_SELECT_TYPE) {
    return localStorage.getItem('productId');
  }
  return null;
};
