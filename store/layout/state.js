import { HOME_MENU_ID } from '@/constants/layout';

const state = () => {
  return {
    topMenus: [], // 顶部的菜单栏
    siderMenus: [], // 侧边的菜单栏
    isCollapse: false, // 是否折叠菜单栏
    selectedTopId: HOME_MENU_ID, // 定位选中的顶部菜单栏
    selectedSiderIdx: '', // 定位选中的侧边栏
    isShowSiderMenus: false, // 是否显示侧边菜单栏
    selectedDependenceId: '', // 侧边栏的依赖值（项目或产品）
    dependenceData: [], // 侧边栏的下拉数据（产品/项目）
  };
};

export default state;
