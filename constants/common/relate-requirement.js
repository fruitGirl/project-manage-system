/*
 * @Description: 关联需求配置
 * @Author: danding
 * @Date: 2019-06-20 17:00:51
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-04 15:39:49
 */

// 表格列配置
export const COLUMNS = [
  {
    label: '优先级',
    width: 120,
    prop: 'priority',
    sortable: 'custom',
    show: true
  },
  {
    label: '需求',
    show: true,
    prop: 'title',
    align: 'left'
  },
  {
    label: '状态',
    prop: 'statusName',
    width: 160,
    sortable: 'custom'
  },
  {
    label: '创建者',
    prop: 'creator',
    width: 160,
    sortable: 'custom'
  },
  {
    label: '指派',
    prop: 'assignedPerson',
    width: 160,
    show: true,
    sortable: 'custom'
  }
];

export const PATHS = [
  {
    path: '/project/requirement-list',
    name: '需求列表'
  },
  {
    path: '',
    name: '关联需求'
  }
];
