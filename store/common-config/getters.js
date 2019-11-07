import { transArrs } from '@/utils/common';
export default {
  projectEnums(state) {
    return transArrs(state.projects, 'name', 'id');
  },
  productEnums(state) {
    return transArrs(state.products, 'name', 'id');
  },
  visibleProductEnums(state) {
    return transArrs(state.visibleProducts, 'name', 'id');
  },
  modulesByProductEnums(state) {
    return transArrs(state.modulesByproduct, 'name', 'id');
  },
  projectVersionEnums(state) {
    return transArrs(state.projectVersion, 'name', 'id');
  },
  operationLogsGetter(state) {
    return state.operationLogs.map(i => {
      const { operator, actionType, gmtCreate, memo } = i;
      const { message } = actionType;
      return {
        time: gmtCreate,
        content: `${operator} ${memo || ''}`,
        type: 'primary',
        name: message
      };
    });
  },
  ProductAndModuleTreeEnums(state) {
    return state.productAndModuleTree.map(i => {
      return `product${i.id}`;
    });
  },
  productsByProjectEnums(state) {
    return transArrs(state.productsByProject, 'name', 'id');
  },
};
