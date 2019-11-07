export const HOME_MENU_ID = 'home_menu_id'; // 首页菜单的id

// 顶部菜单-首页
export const FIX_TOP_MENU = {
  value: HOME_MENU_ID,
  label: '首页',
  path: '/',
  redirect: '/',
  id: HOME_MENU_ID
};

// 侧边栏需要展示的数据源(产品/项目)
export const PROJECT_SELECT_TYPE = 'project';
export const PRODUCT_SELECT_TYPE = 'product';

// 顶部菜单对应的路径信息
export const TOP_MENU_CONFIG = [
  {
    path: '/product/', // 匹配路径
    id: '1', // 顶栏菜单的主键
    dependence: PRODUCT_SELECT_TYPE, // 依赖的选择项
    redirect: '/product/home' // 重定向地址
  },
  {
    path: '/project/',
    id: '2',
    dependence: PROJECT_SELECT_TYPE,
    redirect: '/project/home'
  },
  {
    path: '/test/',
    id: '3',
    dependence: PRODUCT_SELECT_TYPE,
    redirect: '/test/use-case-list'
  },
  {
    path: '/document/',
    id: '4',
    redirect: '/document/document-list'
  },
  {
    path: '/system/',
    id: '5',
    redirect: '/system/user-manage'
  }
];

// 获取当前依赖的类型（侧边栏的下拉框）
export const getCurDependenceType = () => {
  const matchItem = TOP_MENU_CONFIG.find(
    i => location.pathname.indexOf(i.path) !== -1
  );
  return matchItem ? matchItem.dependence : '';
};

// 侧边栏的下拉框数据-项目
export const ADD_PROJECT_VALUE = 'add_project';
export const ALL_PROJECT_VALUE = 'all_project';
export const FIX_PROJECT_OPTS = {
  id: 'project-opt-fixed',
  isScroll: false,
  options: [
    {
      value: ADD_PROJECT_VALUE,
      label: '新增项目',
      className: 'active',
      isFixed: true
    },
    {
      value: ALL_PROJECT_VALUE,
      label: '所有项目',
      isFixed: true,
      className: 'active'
    }
  ]
};

// 侧边栏的下拉框数据-产品
export const ADD_PRODUCT_VALUE = 'add_product';
export const ALL_PRODUCT_VALUE = 'all_product';
export const FIX_PRODUCT_OPTS = {
  id: 'product-opt-fixed',
  isScroll: false,
  options: [
    {
      value: ADD_PRODUCT_VALUE,
      label: '新增产品',
      className: 'active',
      isFixed: true
    },
    {
      value: ALL_PRODUCT_VALUE,
      label: '所有产品',
      isFixed: true,
      className: 'active'
    }
  ]
};

// 侧边栏下拉框的新增/全部链接
export const DEPENDENCE_REDIRECT = {
  [ADD_PROJECT_VALUE]: '/project/edit-project',
  [ALL_PROJECT_VALUE]: '/project/project-list',
  [ADD_PRODUCT_VALUE]: '/product/product-create',
  [ALL_PRODUCT_VALUE]: '/product/product-list-query'
};
