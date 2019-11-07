/*
 * @Description: 测试-测试套件列表常规配置
 * @Author: moran
 * @Date: 2019-06-20 17:15:15
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-07 11:12:36
 */

// 表格头部
export const COLUMN = [
  {
    label: '套件标题',
    show: true,
    prop: 'title',
    align: 'left'
  },
  {
    label: '创建人',
    prop: 'creatorName',
    sortable: 'custom',
    width: '150'
  },
  {
    label: '更新时间',
    prop: 'gmtModified',
    sortable: 'custom',
    width: '150'
  },
  {
    label: '用例数',
    prop: 'testNum',
    width: '120'
  }
];

// 排序配置
export const SORT_CONFIG = {
  creatorName_ascending: 'CREATOR_ASC',
  creatorName_descending: 'CREATOR_DESC',
  gmtModified_ascending: 'GMT_MODIFIED_ASC',
  gmtModified_descending: 'GMT_MODIFIED_DESC'
};
