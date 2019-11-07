import { transArrs } from '@/utils/common';
export default {
  projectEnums(state) {
    return transArrs(state.projects, 'name', 'id');
  },
  productEnums(state) {
    return transArrs(state.products, 'name', 'id');
  }
};
